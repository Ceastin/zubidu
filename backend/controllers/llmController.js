import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import chatMemory from "../utils/ChatMemory.js";
import dotenv from "dotenv";
dotenv.config();
const cerebras = new OpenAI({
  apiKey: process.env.CEREBRAS_API_KEY,
  baseURL: "https://api.cerebras.ai/v1", // This is the magic redirect!
});

export const getLLMResponse = async (req, res) => {
  try {
    const { prompt, sessionId } = req.body;

    if (!prompt || !sessionId) {
      return res.status(400).json({ message: "Please provide a prompt and a sessionId." });
    }

    // 1. Get the conversation history (automatically handles the 90s timer)
    const history = chatMemory.getSessionHistory(sessionId);

    // 2. Build the exact messages array Cerebras expects
    const messages = [
      ...history,
      { role: "user", content: prompt }
    ];

    // 3. Hit the Cerebras Llama 3.1 8B model (Insanely fast!)
    const completion = await cerebras.chat.completions.create({
      messages: messages,
      model: "llama3.1-8b", // You can also use "llama3.3-70b" for higher reasoning
      max_completion_tokens: 600,
    });

    const replyText = completion.choices[0].message.content;

    // 4. Save the interaction to our RAM memory
    chatMemory.updateHistory(sessionId, prompt, replyText);

    // 5. Send it back to React
    return res.json({ reply: replyText });

  } catch (err) {
    console.error("Cerebras API Error:", err?.message ?? err);
    return res.status(500).json({ message: "LLM error", details: err?.message });
  }
};

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const cerebras=new OpenAI({
//   apiKey:process.env.CEREBRAS_API_KEY,
//   baseURL: "https://api.cerebras.ai"
// });
// export const getLLMResponse = async (req, res) => {
//   try {
//     const { prompt, sessionId } = req.body;

//     if (!prompt || !sessionId) {
//       return res.status(400).json({ message: "Please provide prompt and sessionId." });
//     }

//     const history = chatMemory.getSessionHistory(sessionId);

//     const messages = [
//       ...history,
//       { role: "user", content: prompt }
//     ];

//     const completion = await cerebras.chat.completions.create({
//       model: "llama-3.1-8b-instruct",  // fast + good
//       messages,
//       max_tokens: 1000,
//       temperature: 0.7
//     });

//     const replyText = completion.choices[0].message.content;

//     chatMemory.updateHistory(sessionId, prompt, replyText);

//     return res.json({ reply: replyText });

//   } catch (err) {
//     console.error("FULL ERROR:", err.response?.data || err);
//     return res.status(500).json({ message: "LLM error" });
//   }
// };
// // export const getLLMResponse = async (req, res) => {
// //   try {
// //     const { prompt, messages } = req.body;

// //     if (!prompt && !messages) {
// //       return res.status(400).json({ message: "Please provide a prompt or messages array." });
// //     }

// //     const apiMessages = messages ?? [{ role: "user", content: prompt }];

// //     const completion = await openai.chat.completions.create({
// //       model: "gpt-4o-mini",
// //       messages: apiMessages,
// //       max_tokens: 600,
// //     });

// //     const reply = completion?.choices?.[0]?.message?.content ?? "";

// //     return res.json({ reply });
// //   } catch (err) {
// //     console.error("OpenAI Error:", err?.message ?? err);
// //     return res.status(500).json({ message: "LLM error", details: err?.message });
// //   }
// // };
// // export const getLLMResponse = async (req, res) => {
// //   try {
// //     const { prompt, sessionId } = req.body;

// //     if (!prompt || !sessionId) {
// //       return res.status(400).json({ message: "Please provide a prompt and a sessionId." });
// //     }
// //   console.log(prompt);
// //     // 1. Get the history (This automatically resets the 90-second timer)
// //   const history=chatMemory.getSessionHistory(sessionId);

// //     // 2. Initialize the Gemini Model
// //   const model = genAI.getGenerativeModel({
// //       model: "aqa",
// //   });

// //     // 3. Pass the in-memory array directly into Gemini
// //   const chat = model.startChat({
// //       history: history,
// //       generationConfig: { maxOutputTokens: 1000 },
// //   });

// //     // 4. Send the user's prompt
// //   const response = await chat.sendMessage(prompt);
// //   const replyText = response.response.text();

// //     // 5. Update our in-memory RAM map with the new messages
// //   chatMemory.updateHistory(sessionId, prompt, replyText);

// //     // 6. Return the reply
// //     console.log(replyText);
// //   return res.json({ reply: replyText });

// //   } catch (err) {
// //     console.error("In-Memory Chat Error:", err?.message ?? err);
// //     return res.status(500).json({ message: "LLM error", details: err?.message });
// //   }
// // };