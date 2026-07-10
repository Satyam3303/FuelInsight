import axios from "axios";
import dotenv from "dotenv";
import { API_CONSTANTS } from "../constants/apiConstants.js";

dotenv.config();

const fuelClient = axios.create({
  baseURL: process.env.FUEL_SERVICE_URL,
  timeout: 10000,
  headers: {
    "x-api-key": process.env.SERVICE_API_KEY,
  },
});

export const getAllFuelPrices = async () => {
  const response = await fuelClient.get(API_CONSTANTS.FUEL_PRICES);

  return response.data.data;
};

export const getFuelPriceByCity = async (city) => {
  const response = await fuelClient.get(`${API_CONSTANTS.FUEL_PRICES}/${city}`);

  return response.data.data;
};

export const getFuelTrend = async (city, fuelType) => {
  const response = await fuelClient.get(
    `${API_CONSTANTS.FUEL_HISTORY}/${city}/trends`,
    {
      params: {
        fuelType,
      },
    },
  );

  return response.data.data;
};
