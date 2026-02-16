import express from "express";
import { getRandomImage } from "../controllers/imageController.js";

const router = express.Router();

router.get("/random", getRandomImage);

export default router;
