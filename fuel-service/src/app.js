import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";
import fuelRoutes from "./routes/fuel.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/fuel", fuelRoutes);
app.use(errorHandler);

export default app;