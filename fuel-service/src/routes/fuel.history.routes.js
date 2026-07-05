import { Router } from "express";

import {
  createSnapshot,
  getCityHistory,
  getFuelTrend,
} from "../controllers/fuel.history.controller.js";

const router = Router();

router.post("/snapshot", createSnapshot);
router.get("/:city", getCityHistory);
router.get("/:city/trends", getFuelTrend);

export default router;
