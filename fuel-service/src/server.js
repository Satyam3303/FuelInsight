import dotenv from "dotenv";
import { MESSAGES } from "./constants/messages.js";
dotenv.config();
import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT;

if (!PORT) {
  console.error(MESSAGES.ERROR.FUEL_PORT_ERROR);
  process.exit(1);
}

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`${MESSAGES.SUCCESS.FUEL_SERVER_START} ${PORT}`);
    });
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

startServer();
