import dotenv from "dotenv";
import { MESSAGES } from "./constants/messages.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT;

if (!PORT) {
  console.error(MESSAGES.ERROR.GATEWAY_PORT_ERROR);
  process.exit(1);
}

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`${MESSAGES.SUCCESS.GATEWAY_SERVER_START} ${PORT}`);
    });
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

startServer();
