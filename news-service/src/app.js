import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware.js";
import newsRoutes from "./routes/news.routes.js";
import { validateApiKey } from "./middleware/api.key.middleware.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(validateApiKey);
app.use("/api/news", newsRoutes);
app.use(errorHandler);

export default app;
