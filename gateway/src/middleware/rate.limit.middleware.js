import { rateLimit } from "express-rate-limit";
import { MESSAGES } from "../constants/messages.js";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: MESSAGES.ERROR.RATE_LIMIT_ERROR,
  },
});
