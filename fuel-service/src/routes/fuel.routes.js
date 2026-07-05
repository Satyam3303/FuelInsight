import { Router } from "express";

import {
  getFuelPrices,
  getFuelPriceByCity,
  healthCheck,
  compareCities,
} from "../controllers/fuel.controller.js";

const router = Router();

router.get("/health", healthCheck);
router.get("/prices", getFuelPrices);
router.get("/compare", compareCities);
router.get("/prices/:city", getFuelPriceByCity);

export default router;
