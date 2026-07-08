import { MESSAGES } from "../constants/messages.js";

export const validateApiKey = (req, res, next) => {
  if (req.header("x-api-key") !== process.env.SERVICE_API_KEY) {
    return res.status(401).json({
      success: false,
      message: MESSAGES.ERROR.INVALID_API_KEY,
    });
  }

  next();
};
