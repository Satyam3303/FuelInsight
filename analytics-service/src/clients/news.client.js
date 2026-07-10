import axios from "axios";
import dotenv from "dotenv";
import { API_CONSTANTS } from "../constants/apiConstants.js";
dotenv.config();

const newsClient = axios.create({
  baseURL: process.env.NEWS_SERVICE_URL,
  timeout: 10000,
  headers: {
    "x-api-key": process.env.SERVICE_API_KEY,
  },
});

export const getLatestNews = async () => {
  const response = await newsClient.get(API_CONSTANTS.NEWS);

  return response.data.data.data;
};
