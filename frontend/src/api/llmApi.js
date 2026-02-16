import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/llm",
});

export const sendPrompt = async (prompt, sessionId) => { 
  try {
    // Send both variables in the payload to match your backend
    const response = await API.post("/prompt", { prompt, sessionId }); 
    return response.data.reply;
  } catch (err) {
    console.error("LLM API error:", err);
    return "Sorry, something went wrong.";
  }
};