import { Router } from "express";
import {
  getMarketReport,
  getCityAnalytics,
  getStateAnalytics,
  getTopCities,
  getCheapestCities,
  healthCheck,
} from "../controllers/analytics.controller.js";

const router = Router();

router.get("/health", healthCheck);
router.get("/report", getMarketReport);
router.get("/city/:city", getCityAnalytics);
router.get("/states", getStateAnalytics);
router.get("/top", getTopCities);
router.get("/cheapest", getCheapestCities);

export default router;
