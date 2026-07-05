import mongoose from "mongoose";
import { MESSAGES } from "../constants/messages.js";

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error(MESSAGES.ERROR.MONGODB_URI_NOT_DEFINED);
    }

    const connection = await mongoose.connect(process.env.MONGODB_URI);

    console.log(MESSAGES.SUCCESS.MONGODB_CONNECTED);
  } catch (error) {
    console.error(MESSAGES.ERROR.DATABASE_CONNECTION_FAILED, error.message);

    process.exit(1);
  }
};
