import { Router } from "express";

import {
  createNews,
  getAllNews,
  getNewsByCategory,
} from "../controllers/news.controller.js";

const router = Router();

router.get("/", getAllNews);

router.post("/", createNews);

router.get("/category/:category", getNewsByCategory);

export default router;
