import express from "express";
import cors from "cors";

import { fuelProxy } from "./routes/fuel.routes.js";

console.log("Fuel Proxy:", fuelProxy);

const app = express();

app.use(cors());

app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

app.use("/api/fuel", fuelProxy);

export default app;