import { getAllFuelPrices } from "../repositories/fuel.repository.js";
import { FUEL_TYPES } from "../constants/fuel.types.js";
import { getNestedValue } from "../utils/get-nested-value.js";
import AppError from "../utils/app.error.js";
import { HTTP_STATUS_CODES } from "../constants/status.codes.js";
import { MESSAGES } from "../constants/messages.js";
import {
  createBulkFuelSnapshots,
  getFuelHistoryByCity,
} from "../repositories/fuel.history.repository.js";

export const captureFuelSnapshot = async () => {
  const cities = await getAllFuelPrices();

  if (cities.length === 0) {
    throw new AppError(
      MESSAGES.ERROR.FUEL_PRICES_NOT_FOUND,
      HTTP_STATUS_CODES.NOT_FOUND,
    );
  }

  const snapshots = cities.map((city) => ({
    city: city.city,
    state: city.state,
    fuels: city.fuels,
  }));

  await createBulkFuelSnapshots(snapshots);

  return {
    snapshotsCreated: snapshots.length,
  };
};

export const fetchFuelHistoryByCity = async (city) => {
  const history = await getFuelHistoryByCity(city);

  if (history.length === 0) {
    throw new AppError(
      MESSAGES.ERROR.FUEL_HISTORY_NOT_FOUND,
      HTTP_STATUS_CODES.NOT_FOUND,
    );
  }

  return history;
};

export const fetchFuelTrend = async (city, fuelType) => {
  const path = FUEL_TYPES[fuelType];

  if (!path) {
    throw new AppError(
      MESSAGES.ERROR.INVALID_FUEL_TYPE,
      HTTP_STATUS_CODES.BAD_REQUEST,
    );
  }

  const history = await getFuelHistoryByCity(city);

  if (history.length === 0) {
    throw new AppError(
      MESSAGES.ERROR.FUEL_HISTORY_NOT_FOUND,
      HTTP_STATUS_CODES.NOT_FOUND,
    );
  }

  const prices = history.map((snapshot) => getNestedValue(snapshot, path));

  return {
    city,

    fuelType,

    currentPrice: prices[prices.length - 1],

    highestPrice: Math.max(...prices),

    lowestPrice: Math.min(...prices),

    averagePrice: Number(
      (prices.reduce((sum, price) => sum + price, 0) / prices.length).toFixed(
        2,
      ),
    ),

    trend: history.map((snapshot) => ({
      date: snapshot.capturedAt.toISOString().split("T")[0],

      price: getNestedValue(snapshot, path),
    })),
  };
};
