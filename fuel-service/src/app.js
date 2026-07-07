import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware.js";
import fuelRoutes from "./routes/fuel.routes.js";
import fuelHistoryRoutes from "./routes/fuel.history.routes.js";
import { validateApiKey } from "./middleware/api.key.middleware.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(validateApiKey);
app.use("/api/fuel", fuelRoutes);
app.use("/api/fuel/history", fuelHistoryRoutes);
app.use(errorHandler);

export default app;
