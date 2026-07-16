import {
  captureFuelSnapshot,
  fetchFuelHistoryByCity,
  fetchFuelTrend,
} from "../services/fuel.history.service.js";
import { HTTP_STATUS_CODES } from "../constants/status.codes.js";
import { MESSAGES } from "../constants/messages.js";
import { apiResponse } from "../utils/api.response.js";

export const createSnapshot = async (req, res, next) => {
  try {
    const data = await captureFuelSnapshot();

    return apiResponse(
      res,
      HTTP_STATUS_CODES.CREATED,
      data,
      MESSAGES.SUCCESS.SNAPSHOT_CREATED,
    );
  } catch (error) {
    return next(error);
  }
};

export const getCityHistory = async (req, res, next) => {
  try {
    const { city } = req.params;

    const data = await fetchFuelHistoryByCity(city);

    return apiResponse(
      res,
      HTTP_STATUS_CODES.OK,
      data,
      MESSAGES.SUCCESS.CITY_HISTORY_FETCHED,
    );
  } catch (error) {
    return next(error);
  }
};

export const getFuelTrend = async (req, res, next) => {
  try {
    const { city } = req.params;
    const { fuelType, range = "30d" } = req.query;

    if (!fuelType) {
      return apiResponse(
        res,
        HTTP_STATUS_CODES.BAD_REQUEST,
        null,
        MESSAGES.ERROR.FUEL_TYPE_REQUIRED,
        false,
      );
    }

    const data = await fetchFuelTrend(city, fuelType, range);

    return apiResponse(
      res,
      HTTP_STATUS_CODES.OK,
      data,
      MESSAGES.SUCCESS.FUEL_TREND_FETCHED,
    );
  } catch (error) {
    return next(error);
  }
};
