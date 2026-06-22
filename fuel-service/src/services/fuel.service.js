import {
  getAllFuelPrices,
  getFuelPriceByCity,
  getFuelPricesByCities,
} from "../repositories/fuel.repository.js";
import AppError from "../utils/app-error.js";
import { ERROR_MESSAGES } from "../constants/messages.js";
import { HTTP_STATUS_CODES } from "../constants/status-codes.js";

export const fetchAllFuelPrices = async (state) => {
  return getAllFuelPrices(state);
};

export const fetchFuelPriceByCity = async (city) => {
  const fuelPrice = await getFuelPriceByCity(city);

  if (!fuelPrice) {
    throw new AppError(
      `${ERROR_MESSAGES.CITY_NOT_FOUND}: ${city}`,
      HTTP_STATUS_CODES.NOT_FOUND,
    );
  }

  return fuelPrice;
};

export const compareFuelPrices = async (city1, city2) => {
  const cities = await getFuelPricesByCities(city1, city2);

  if (cities.length !== 2) {
    throw new AppError(
      ERROR_MESSAGES.CITIES_NOT_FOUND,
      HTTP_STATUS_CODES.NOT_FOUND,
    );
  }

  const firstCity = cities.find(
    (city) => city.city.toLowerCase() === city1.toLowerCase(),
  );

  const secondCity = cities.find(
    (city) => city.city.toLowerCase() === city2.toLowerCase(),
  );

  return {
    city1: firstCity,
    city2: secondCity,
    difference: {
      petrol: Number(
        (secondCity.petrolPrice - firstCity.petrolPrice).toFixed(2),
      ),
      diesel: Number(
        (secondCity.dieselPrice - firstCity.dieselPrice).toFixed(2),
      ),
    },
  };
};
