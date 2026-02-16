class ChatMemoryManager {
  constructor() {
    this.sessions = new Map();
    this.TTL = 90 * 1000;
  }

  getSessionHistory(sessionId) {
    // 1. Is new session?
    if (!this.sessions.has(sessionId)) {
      
      // 2. Start clock 
      const absoluteTimer = setTimeout(() => {
        this.sessions.delete(sessionId);
        console.log(`[Memory] Session ${sessionId} absolute 90s limit reached. Deleted.`);
      }, this.TTL);

      // 3. Save the session with its history and the ticking timer
      this.sessions.set(sessionId, { 
        history: [],
        timer: absoluteTimer, 
      });
      console.log(`[Memory] Started new session: ${sessionId}`);
    }

    // 4. Return the history.
    return this.sessions.get(sessionId).history;
  }

  // updateHistory(sessionId, userMessage, modelMessage) {
  //   const session = this.sessions.get(sessionId);
  //   if (session) {
  //     session.history.push(
  //       { role: "user", parts: [{ text: userMessage }] },
  //       { role: "model", parts: [{ text: modelMessage }] }
  //     );
  //   }
  // }
  // Replace your existing updateHistory method with this one:
  updateHistory(sessionId, userMessage, modelMessage) {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.history.push(
        { role: "user", content: userMessage },
        { role: "assistant", content: modelMessage }
      );
    }
  }
}

const chatMemory = new ChatMemoryManager();
export default chatMemory;