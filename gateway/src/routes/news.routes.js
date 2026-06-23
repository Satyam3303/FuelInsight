import dotenv from "dotenv";

dotenv.config();

import { createProxyMiddleware } from "http-proxy-middleware";

export const newsProxy = createProxyMiddleware({
  target: process.env.NEWS_SERVICE_URL,
  changeOrigin: true,

  pathRewrite: (path) => {
    return `/api/news${path}`;
  },
});