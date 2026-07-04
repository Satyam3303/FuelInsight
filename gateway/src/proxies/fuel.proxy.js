//Creating Proxy for Fuel Service
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
import { HTTP_STATUS_CODES } from "../constants/status.codes.js";
import { SUCCESS_MESSAGES } from "../constants/messages.js";
import { apiResponse } from "../utils/api.response.js";
import { PROXY_CONSTANTS } from "../constants/proxyConstants.js";
dotenv.config();

export const fuelProxy = createProxyMiddleware({
  target: process.env.FUEL_SERVICE_URL,
  changeOrigin: true,
   pathRewrite: (path) => `${PROXY_CONSTANTS.FUEL_SERVICE}${path}`,
  timeout: 10000,
  proxyTimeout: 10000,
  on: {
    proxyReq: (proxyReq) => {
      proxyReq.setHeader("x-api-key", process.env.SERVICE_API_KEY);
    },
    error: (err, req, res) => {
      return apiResponse(
        res,
        HTTP_STATUS_CODES.GATEWAY_TIMEOUT,
        null,
        SUCCESS_MESSAGES.GATEWAY_FUEL_SERVICE_UNAVAILABLE,
        false,
      );
    },
  },
});
