import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";

if (!process.env.PORT) {
  console.warn("PORT not defined. Using default port 3001.");
}

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Fuel Service running on port ${PORT}`);
  });
};

startServer();
