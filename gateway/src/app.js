import express from "express";
import cors from "cors";

import { fuelProxy } from "./routes/fuel.routes.js";
import { newsProxy } from "./routes/news.routes.js";
console.log("Fuel Proxy:", fuelProxy);
console.log("News Proxy:", newsProxy);

const app = express();

app.use(cors());

app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

app.use("/api/fuel", fuelProxy);
app.use("/api/news", newsProxy);

export default app;