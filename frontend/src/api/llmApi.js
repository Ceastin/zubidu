import axios from "axios";

const API = axios.create({ 
  // Vite exposes env variables automatically through this object
  baseURL: import.meta.env.VITE_API_URL 
});
export const sendPrompt = async (prompt, sessionId) => { 
  try {
    // Send both variables in the payload to match your backend
    const response = await API.post("/llm/prompt", { prompt, sessionId }); 
    return response.data.reply;
  } catch (err) {
    console.error("LLM API error:", err);
    return "Sorry, something went wrong.";
  }
};