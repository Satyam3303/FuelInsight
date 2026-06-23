import dotenv from "dotenv";

dotenv.config();

import { createProxyMiddleware } from "http-proxy-middleware";

console.log("Fuel Service URL:", process.env.FUEL_SERVICE_URL);

export const fuelProxy = createProxyMiddleware({
  target: process.env.FUEL_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path) => {
    return `/api/fuel${path}`;
  },
});
