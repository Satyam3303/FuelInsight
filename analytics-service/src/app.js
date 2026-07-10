import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware.js";
import { validateApiKey } from "./middleware/api.key.middleware.js";
import analyticsRoutes from "./routes/analytics.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(validateApiKey);
app.use("/api/analytics", analyticsRoutes);
app.use(errorHandler);

export default app;
