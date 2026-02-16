import React, { useState, useEffect, useRef } from 'react';
import "./SpeakWithZubi.css";
import { getRandomImage } from '../api/image';
import { sendPrompt } from '../api/llmApi';
import Header from '../components/Header';
import SceneDisplay from '../components/SceneDisplay';
import BottomSheet from '../components/BottomSheet';

const ZubiInterface = () => {
  const [hitStarted, setHitStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [frameImage, setFramePage] = useState("");
  const [pageId, setPageId] = useState("");

  const recognitionRef = useRef(null);
  const sessionId = useRef(`chat_${Date.now()}`);
  
  // 1. THE KILL SWITCH: A synchronous flag to instantly block all async callbacks
  const isActive = useRef(false);

  function clickHandler() {
    const willStart = !hitStarted;
    setHitStarted(willStart);
    isActive.current = willStart; // Update the kill switch immediately

    if (willStart) {
      setTimeLeft(90);
    } else {
      // Immediate manual stop if the user clicks the Stop button
      window.speechSynthesis.cancel();
      if (recognitionRef.current) recognitionRef.current.abort(); // abort() is instant
    }
  }

  const getPrompt = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Could not fetch script");
      return await response.text();
    } catch (err) {
      console.error("Failed to load prompt file:", err);
      return "";
    }
  };

  // --- ENGINE LOGIC ---
  useEffect(() => {
    if (!hitStarted) {
      setFramePage("");
      return;
    }

    const sendToServer = async (textPrompt) => {
      if (!isActive.current) return; // GUARD: Don't fetch if time is up
      try {
        const replyText = await sendPrompt(textPrompt, sessionId.current);
        if (!isActive.current) return; // GUARD: Don't speak if time ran out while fetching
        
        console.log(replyText);
        speakText(replyText);
      } catch (err) {
        console.error("Interaction error:", err);
      }
    };

    const speakText = (text) => {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      const voices = window.speechSynthesis.getVoices();
      const zubiVoice = voices.find(voice => voice.name.includes("Google US English"))
        || voices.find(voice => voice.lang === "en-US" && voice.name.includes("Female"))
        || voices[0];

      if (zubiVoice) {
        utterance.voice = zubiVoice;
      }

      utterance.pitch = 1.1;
      utterance.rate = 1.0;

      utterance.onend = () => {
        // GUARD: cancel() triggers onend. We only listen if the session is still active!
        if (isActive.current) {
          listenToUser();
        }
      };
      
      window.speechSynthesis.speak(utterance);
    };

    const listenToUser = () => {
      if (!isActive.current) return; // GUARD: Don't open mic if time is up

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) return;

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        // GUARD: Don't send data if time ran out while user was speaking
        if (!isActive.current) return; 
        
        console.log(event.results[0][0].transcript);
        sendToServer(event.results[0][0].transcript);
      };
      
      recognition.start();
    };

    const startInteraction = async () => {
      try {
        const rndomNum = await getRandomImage();
        if (!rndomNum) return;
        setFramePage(`/examples/${rndomNum}.jpg`);
        setPageId(rndomNum);
        
        const initialScript = await getPrompt(`/example-description/${rndomNum}.txt`);
        console.log(initialScript);
        
        if (initialScript && isActive.current) {
          await sendToServer(initialScript);
        }
      } catch (error) {
        console.error("Error starting interaction:", error);
      }
    };

    sessionId.current = `chat_${Date.now()}`;
    startInteraction();

    // Standard cleanup when unmounting or stopping
    return () => {
      isActive.current = false;
      window.speechSynthesis.cancel();
      if (recognitionRef.current) recognitionRef.current.abort();
    };
  }, [hitStarted]);

  // --- TIMER LOGIC (WITH INSTANT KILL SWITCH) ---
  useEffect(() => {
    // If the timer hits zero while the app is active
    if (hitStarted && timeLeft <= 0) {
      console.log("Timer hit 0. Executing hard stop.");
      
      isActive.current = false; // 1. Immediately block all pending callbacks
      setHitStarted(false);     // 2. Update UI
      
      window.speechSynthesis.cancel(); // 3. Kill Speaker instantly
      if (recognitionRef.current) {
        recognitionRef.current.abort(); // 4. Kill Mic instantly (abort drops the audio)
      }
      return;
    }

    if (!hitStarted) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [hitStarted, timeLeft]);

  // --- CLEAN RENDER ---
  return (
    <>
      <div className={`page-wrapper ${hitStarted ? "blurred" : ""}`}>
        <div className='main-screen'>
          <Header />
        </div>

        <div className="midway">
          Let's get
          <div className="arrow-right"></div>
          <span id="hey-1" onClick={clickHandler}>
            {hitStarted ? "Stop" : "Started"}
          </span>
        </div>

        {hitStarted && <SceneDisplay frameImage={frameImage} />}
      </div>

      {hitStarted && <BottomSheet timeLeft={timeLeft} />}
    </>
  );
};

export default ZubiInterface;