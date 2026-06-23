import {
  fetchAllFuelPrices,
  fetchFuelPriceByCity,
  compareFuelPrices,
} from "../services/fuel.service.js";
import { SUCCESS_MESSAGES } from "../constants/messages.js";

import { HTTP_STATUS_CODES } from "../constants/status-codes.js";
import { sendSuccessResponse } from "../utils/api-response.js";

export const getFuelPrices = async (req, res, next) => {
  try {
    const { state } = req.query;

    const data = await fetchAllFuelPrices(state);

    return sendSuccessResponse(res, HTTP_STATUS_CODES.OK, data);
  } catch (error) {
    next(error);
  }
};

export const getFuelPriceByCity = async (req, res, next) => {
  try {
    const { city } = req.params;

    const data = await fetchFuelPriceByCity(city);

    return sendSuccessResponse(res, HTTP_STATUS_CODES.OK, data);
  } catch (error) {
    next(error);
  }
};
export const healthCheck = (req, res) => {
  res.status(HTTP_STATUS_CODES.OK).json({
    success: true,
    message: SUCCESS_MESSAGES.SERVICE_HEALTHY,
    service: "fuel-service",
    timestamp: new Date(),
  });
};

export const compareCities = async (req, res, next) => {
  try {
    const { city1, city2, fuelType } = req.query;

    if (!city1 || !city2) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: "city1 and city2 are required",
      });
    }

    const data = await compareFuelPrices(city1, city2, fuelType);

    return sendSuccessResponse(res, HTTP_STATUS_CODES.OK, data);
  } catch (error) {
    next(error);
  }
};
