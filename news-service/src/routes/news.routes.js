import { Router } from "express";

import {
  healthCheck,
  createNews,
  getAllNews,
  getFeaturedNews
} from "../controllers/news.controller.js";

const router = Router();

router.get("/health", healthCheck);
router.get("/", getAllNews);
router.post("/", createNews);
router.get("/featured", getFeaturedNews);
export default router;
