import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  sessionId: String,
  startTime: { type: Date, default: Date.now },
  endTime: Date,
  interactions: [String],
});

export default mongoose.model("Session", sessionSchema);
