import {
  getAllFuelPrices,
  getFuelPriceByCity,
  getFuelTrend,
} from "../clients/fuel.client.js";
import { getLatestNews } from "../clients/news.client.js";
import AppError from "../utils/app.error.js";
import { MESSAGES } from "../constants/messages.js";
import { HTTP_STATUS_CODES } from "../constants/status.codes.js";

const fuelSelector = {
  regularPetrol: (city) => city.fuels.petrol.regular,
  xp95: (city) => city.fuels.petrol.xp95,
  power95: (city) => city.fuels.petrol.power95,
  speed97: (city) => city.fuels.petrol.speed97,
  e20: (city) => city.fuels.petrol.e20,

  regularDiesel: (city) => city.fuels.diesel.regular,
  xtraGreen: (city) => city.fuels.diesel.xtraGreen,
  turboJet: (city) => city.fuels.diesel.turboJet,
  speedDiesel: (city) => city.fuels.diesel.speedDiesel,
  bioDiesel: (city) => city.fuels.diesel.bioDiesel,

  cng: (city) => city.fuels.gas.cng,
  png: (city) => city.fuels.gas.png,
  lng: (city) => city.fuels.gas.lng,

  ethanol: (city) => city.fuels.alternative.ethanol,
  hydrogen: (city) => city.fuels.alternative.hydrogen,
};

export const fetchMarketReport = async ({ fuelType, city, range }) => {
  const [cities, news, trendData] = await Promise.all([
    getAllFuelPrices(),
    getLatestNews(),
    getFuelTrend(city, fuelType, range),
  ]);

  if (!cities || cities.length === 0) {
    throw new AppError(
      MESSAGES.ERROR.CITIES_NOT_FOUND,
      HTTP_STATUS_CODES.NOT_FOUND,
    );
  }

  if (!news || news.length === 0) {
    throw new AppError(
      MESSAGES.ERROR.NEWS_NOT_FOUND,
      HTTP_STATUS_CODES.NOT_FOUND,
    );
  }

  if (!trendData || !trendData.trend) {
    throw new AppError(
      MESSAGES.ERROR.FUEL_HISTORY_NOT_FOUND,
      HTTP_STATUS_CODES.NOT_FOUND,
    );
  }

  const selector = fuelSelector[fuelType];

  if (!selector) {
    throw new AppError(
      MESSAGES.ERROR.INVALID_FUEL_TYPE,
      HTTP_STATUS_CODES.BAD_REQUEST,
    );
  }

  const prices = cities.map(selector);

  const averagePrice =
    prices.reduce((sum, price) => sum + price, 0) / prices.length;

  const sorted = [...cities].sort((a, b) => selector(b) - selector(a));

  return {
    summary: {
      fuelType,
      averagePrice: Number(averagePrice.toFixed(2)),
      highestPrice: selector(sorted[0]),
      lowestPrice: selector(sorted[sorted.length - 1]),
      highestCity: sorted[0].city,
      lowestCity: sorted[sorted.length - 1].city,
      totalCities: cities.length,
    },
    trend: trendData.trend,
    topExpensive: sorted.slice(0, 5),
    topCheapest: sorted.slice(-5).reverse(),
    latestNews: news.slice(0, 5),
  };
};

export const fetchCityAnalytics = async (city, fuelType) => {
  const [cityData, trendData, news] = await Promise.all([
    getFuelPriceByCity(city),
    getFuelTrend(city, fuelType),
    getLatestNews(),
  ]);

  if (!cityData) {
    throw new AppError(
      MESSAGES.ERROR.CITY_NOT_FOUND,
      HTTP_STATUS_CODES.NOT_FOUND,
    );
  }

  if (!trendData || !trendData.trend || trendData.trend.length === 0) {
    throw new AppError(
      MESSAGES.ERROR.FUEL_HISTORY_NOT_FOUND,
      HTTP_STATUS_CODES.NOT_FOUND,
    );
  }

  if (!news || news.length === 0) {
    throw new AppError(
      MESSAGES.ERROR.NEWS_NOT_FOUND,
      HTTP_STATUS_CODES.NOT_FOUND,
    );
  }

  const trend = trendData.trend;
  const prices = trend.map((item) => item.price);
  const currentPrice = prices[prices.length - 1];
  const highestPrice = Math.max(...prices);
  const lowestPrice = Math.min(...prices);
  const averagePrice = prices.reduce((a, b) => a + b, 0) / prices.length;

  return {
    city: cityData.city,
    state: cityData.state,
    fuelType,
    currentPrice,
    highestPrice,
    lowestPrice,
    averagePrice: Number(averagePrice.toFixed(2)),
    trend,
    latestNews: news.slice(0, 5),
  };
};

export const fetchStateAnalytics = async (state) => {
  const cities = await getAllFuelPrices();

  if (!cities || cities.length === 0) {
    throw new AppError(
      MESSAGES.ERROR.CITIES_NOT_FOUND,
      HTTP_STATUS_CODES.NOT_FOUND,
    );
  }

  const states = {};

  for (const city of cities) {
    if (!states[city.state]) {
      states[city.state] = [];
    }

    states[city.state].push(city);
  }

  const analytics = Object.entries(states).map(([stateName, stateCities]) => {
    const petrolPrices = stateCities.map((city) => city.fuels.petrol.regular);

    const dieselPrices = stateCities.map((city) => city.fuels.diesel.regular);

    const averagePetrol =
      petrolPrices.reduce((sum, price) => sum + price, 0) / petrolPrices.length;

    const averageDiesel =
      dieselPrices.reduce((sum, price) => sum + price, 0) / dieselPrices.length;

    const sortedCities = [...stateCities].sort(
      (a, b) => b.fuels.petrol.regular - a.fuels.petrol.regular,
    );

    return {
      state: stateName,

      cities: stateCities.length,

      averagePetrol: Number(averagePetrol.toFixed(2)),

      averageDiesel: Number(averageDiesel.toFixed(2)),

      highestCity: sortedCities[0].city,

      lowestCity: sortedCities[sortedCities.length - 1].city,
    };
  });

  let result = analytics;

  if (state) {
    result = analytics.filter(
      (item) => item.state.toLowerCase() === state.toLowerCase(),
    );

    if (result.length === 0) {
      throw new AppError(
        MESSAGES.ERROR.STATE_NOT_FOUND,
        HTTP_STATUS_CODES.NOT_FOUND,
      );
    }
  }

  return result.sort((a, b) => a.state.localeCompare(b.state));
};

export const fetchTopCities = async (fuelType, limit) => {
  const cities = await getAllFuelPrices();

  if (!cities || cities.length === 0) {
    throw new AppError(
      MESSAGES.ERROR.CITIES_NOT_FOUND,
      HTTP_STATUS_CODES.NOT_FOUND,
    );
  }

  const fuelMap = {
    regularPetrol: (city) => city.fuels.petrol.regular,
    xp95: (city) => city.fuels.petrol.xp95,
    power95: (city) => city.fuels.petrol.power95,
    speed97: (city) => city.fuels.petrol.speed97,
    e20: (city) => city.fuels.petrol.e20,

    regularDiesel: (city) => city.fuels.diesel.regular,
    xtraGreen: (city) => city.fuels.diesel.xtraGreen,
    turboJet: (city) => city.fuels.diesel.turboJet,
    speedDiesel: (city) => city.fuels.diesel.speedDiesel,
    bioDiesel: (city) => city.fuels.diesel.bioDiesel,

    cng: (city) => city.fuels.gas.cng,
    png: (city) => city.fuels.gas.png,
    lng: (city) => city.fuels.gas.lng,

    ethanol: (city) => city.fuels.alternative.ethanol,
    hydrogen: (city) => city.fuels.alternative.hydrogen,
  };

  const selector = fuelMap[fuelType];

  if (!selector) {
    throw new AppError(
      MESSAGES.ERROR.INVALID_FUEL_TYPE,
      HTTP_STATUS_CODES.BAD_REQUEST,
    );
  }

  if (!limit || Number(limit) <= 0) {
    throw new AppError(
      MESSAGES.ERROR.PAGE_LIMIT_ERROR,
      HTTP_STATUS_CODES.BAD_REQUEST,
    );
  }

  const result = [...cities]
    .sort((a, b) => selector(b) - selector(a))
    .slice(0, Number(limit))
    .map((city) => ({
      city: city.city,
      state: city.state,
      price: selector(city),
    }));

  if (result.length === 0) {
    throw new AppError(
      MESSAGES.ERROR.CITIES_NOT_FOUND,
      HTTP_STATUS_CODES.NOT_FOUND,
    );
  }

  return result;
};

export const fetchCheapestCities = async (fuelType, limit) => {
  const cities = await getAllFuelPrices();

  if (!cities || cities.length === 0) {
    throw new AppError(
      MESSAGES.ERROR.CITIES_NOT_FOUND,
      HTTP_STATUS_CODES.NOT_FOUND,
    );
  }

  const fuelMap = {
    regularPetrol: (city) => city.fuels.petrol.regular,
    xp95: (city) => city.fuels.petrol.xp95,
    power95: (city) => city.fuels.petrol.power95,
    speed97: (city) => city.fuels.petrol.speed97,
    e20: (city) => city.fuels.petrol.e20,

    regularDiesel: (city) => city.fuels.diesel.regular,
    xtraGreen: (city) => city.fuels.diesel.xtraGreen,
    turboJet: (city) => city.fuels.diesel.turboJet,
    speedDiesel: (city) => city.fuels.diesel.speedDiesel,
    bioDiesel: (city) => city.fuels.diesel.bioDiesel,

    cng: (city) => city.fuels.gas.cng,
    png: (city) => city.fuels.gas.png,
    lng: (city) => city.fuels.gas.lng,

    ethanol: (city) => city.fuels.alternative.ethanol,
    hydrogen: (city) => city.fuels.alternative.hydrogen,
  };

  const selector = fuelMap[fuelType];

  if (!selector) {
    throw new AppError(
      MESSAGES.ERROR.INVALID_FUEL_TYPE,
      HTTP_STATUS_CODES.BAD_REQUEST,
    );
  }

  if (!limit || Number(limit) <= 0) {
    throw new AppError(
      MESSAGES.ERROR.PAGE_LIMIT_ERROR,
      HTTP_STATUS_CODES.BAD_REQUEST,
    );
  }

  const result = [...cities]
    .sort((a, b) => selector(a) - selector(b))
    .slice(0, Number(limit))
    .map((city) => ({
      city: city.city,
      state: city.state,
      price: selector(city),
    }));

  if (result.length === 0) {
    throw new AppError(
      MESSAGES.ERROR.CITIES_NOT_FOUND,
      HTTP_STATUS_CODES.NOT_FOUND,
    );
  }

  return result;
};
