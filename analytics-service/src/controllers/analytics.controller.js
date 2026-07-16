import {
  fetchMarketReport,
  fetchCityAnalytics,
  fetchStateAnalytics,
  fetchTopCities,
  fetchCheapestCities,
} from "../services/analytics.service.js";
import { MESSAGES } from "../constants/messages.js";
import { HTTP_STATUS_CODES } from "../constants/status.codes.js";
import { apiResponse } from "../utils/api.response.js";

export const healthCheck = (req, res) => {
  return apiResponse(
    res,
    HTTP_STATUS_CODES.OK,
    null,
    MESSAGES.SUCCESS.ANALYTICS_SERVICE_HEALTHY,
    true,
    true,
  );
};

export const getMarketReport = async (req, res, next) => {
  try {
    const {
      fuelType = "regularPetrol",
      city = "Delhi",
      range = "30d",
    } = req.query;
    const report = await fetchMarketReport({
      fuelType,
      city,
      range,
    });

    return apiResponse(
      res,
      HTTP_STATUS_CODES.OK,
      report,
      MESSAGES.SUCCESS.MARKET_REPORT_FETCHED,
      true,
    );
  } catch (error) {
    return next(error);
  }
};

export const getCityAnalytics = async (req, res, next) => {
  try {
    const { city } = req.params;
    const { fuelType = "regularPetrol" } = req.query;

    const data = await fetchCityAnalytics(city, fuelType);

    return apiResponse(
      res,
      HTTP_STATUS_CODES.OK,
      data,
      MESSAGES.SUCCESS.CITY_ANALYTICS_FETCHED,
      true,
    );
  } catch (error) {
    return next(error);
  }
};

export const getStateAnalytics = async (req, res, next) => {
  try {
    const { state } = req.query;

    const data = await fetchStateAnalytics(state);

    return apiResponse(
      res,
      HTTP_STATUS_CODES.OK,
      data,
      MESSAGES.SUCCESS.STATE_ANALYTICS_FETCHED,
      true,
    );
  } catch (error) {
    return next(error);
  }
};

export const getTopCities = async (req, res, next) => {
  try {
    const { fuelType = "regularPetrol", limit = 10 } = req.query;

    const data = await fetchTopCities(fuelType, Number(limit));

    return apiResponse(
      res,
      HTTP_STATUS_CODES.OK,
      data,
      MESSAGES.SUCCESS.TOP_CITIES_FETCHED,
      true,
    );
  } catch (error) {
    return next(error);
  }
};

export const getCheapestCities = async (req, res, next) => {
  try {
    const { fuelType = "regularPetrol", limit = 10 } = req.query;

    const data = await fetchCheapestCities(fuelType, Number(limit));

    return apiResponse(
      res,
      HTTP_STATUS_CODES.OK,
      data,
      MESSAGES.SUCCESS.CHEAPEST_CITIES_FETCHED,
      true,
    );
  } catch (error) {
    return next(error);
  }
};
