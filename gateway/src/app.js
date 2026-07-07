import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { fuelProxy } from "./proxies/fuel.proxy.js";
import { newsProxy } from "./proxies/news.proxy.js";
import { analyticsProxy } from "./proxies/analytics.proxy.js";
import { apiLimiter } from "./middleware/rate.limit.middleware.js";
import healthCheck from "./routes/health.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(apiLimiter);
app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

app.use("/api/fuel", fuelProxy);
app.use("/api/news", newsProxy);
app.use("/api/analytics", analyticsProxy);
app.use("/", healthCheck);
app.use(errorHandler);

export default app;
