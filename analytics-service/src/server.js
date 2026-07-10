import dotenv from "dotenv";
import { MESSAGES } from "./constants/messages.js";
dotenv.config();
import app from "./app.js";

const PORT = process.env.PORT;

if (!PORT) {
  console.error(MESSAGES.ERROR.ANALYTICS_PORT_ERROR);
  process.exit(1);
}

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`${MESSAGES.SUCCESS.ANALYTICS_SERVER_START} ${PORT}`);
    });
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

startServer();
