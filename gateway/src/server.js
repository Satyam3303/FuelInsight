import dotenv from "dotenv";
import { MESSAGES } from './constants/messages.js'
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`${MESSAGES.GATEWAY_SERVER_START} ${PORT}`);
});
