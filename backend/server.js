import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./config/db.js";
import imageRoutes from "./routes/imageRoutes.js";
import llmRoutes from "./routes/llmRoutes.js";

connectDB();

const app = express();
const allowedOrigin = process.env.FRONTEND_URL;

app.use(cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "DELETE"]
}));
app.use(express.json());

app.use("/api/image", imageRoutes);
app.use("/api/llm", llmRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
