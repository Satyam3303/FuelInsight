import {
  fetchAllFuelPrices,
  fetchFuelPriceByCity,
  compareFuelPrices,
} from "../services/fuel.service.js";
import { MESSAGES } from "../constants/messages.js";
import { HTTP_STATUS_CODES } from "../constants/status.codes.js";
import { apiResponse } from "../utils/api.response.js";

export const healthCheck = (req, res) => {
  return apiResponse(
    res,
    HTTP_STATUS_CODES.OK,
    null,
    MESSAGES.SUCCESS.FUEL_SERVICE_HEALTHY,
    true, 
    true
  );  
};

export const getFuelPrices = async (req, res, next) => {
  try {
    const { state } = req.query;
    const data = await fetchAllFuelPrices(state);

    return apiResponse(
      res,
      HTTP_STATUS_CODES.OK,
      data,
      MESSAGES.SUCCESS.ALL_FUEL_PRICES_FETCHED,
      true,
    );
  } catch (error) {
    return next(error);
  }
};

export const compareCities = async (req, res, next) => {
  try {
    const { city1, city2, fuelType } = req.query;

    if (!city1 || !city2) {
      return apiResponse(
        res,
        HTTP_STATUS_CODES.BAD_REQUEST,
        null,
        MESSAGES.ERROR.CITY1_CITY2_REQUIRED,
        false,
      );
    }

    const data = await compareFuelPrices(city1, city2, fuelType);

    return apiResponse(
      res,
      HTTP_STATUS_CODES.OK,
      data,
      MESSAGES.SUCCESS.CITIES_COMPARED,
      true,
    );
  } catch (error) {
    return next(error);
  }
};

export const getFuelPriceByCity = async (req, res, next) => {
  try {
    const { city } = req.params;

    const data = await fetchFuelPriceByCity(city);

    return apiResponse(
      res,
      HTTP_STATUS_CODES.OK,
      data,
      MESSAGES.SUCCESS.CITY_FUEL_PRICE_FETCHED,
    );
  } catch (error) {
    return next(error);
  }
};
