import express from "express";
import { getLLMResponse } from "../controllers/llmController.js";
const router = express.Router();

router.post("/prompt", getLLMResponse);

export default router;
