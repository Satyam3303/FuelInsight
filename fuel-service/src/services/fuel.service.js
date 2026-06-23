import {
  getAllFuelPrices,
  getFuelPriceByCity,
  getFuelPricesByCities,
} from "../repositories/fuel.repository.js";

import AppError from "../utils/app-error.js";

import { ERROR_MESSAGES } from "../constants/messages.js";

import { HTTP_STATUS_CODES } from "../constants/status-codes.js";

import { FUEL_TYPES } from "../constants/fuel-types.js";

import { getNestedValue } from "../utils/get-nested-value.js";

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

export const compareFuelPrices = async (city1, city2, fuelType) => {
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

  if (!firstCity || !secondCity) {
  throw new AppError(
    ERROR_MESSAGES.CITIES_NOT_FOUND,
    HTTP_STATUS_CODES.NOT_FOUND,
  );
}

  if (!fuelType) {
    return {
      city1: firstCity.city,
      city2: secondCity.city,

      comparisons: {
        petrol: {
          regular: {
            city1: firstCity.fuels.petrol.regular,
            city2: secondCity.fuels.petrol.regular,
            difference: Number(
              (
                secondCity.fuels.petrol.regular - firstCity.fuels.petrol.regular
              ).toFixed(2),
            ),
          },

          xp95: {
            city1: firstCity.fuels.petrol.xp95,
            city2: secondCity.fuels.petrol.xp95,
            difference: Number(
              (
                secondCity.fuels.petrol.xp95 - firstCity.fuels.petrol.xp95
              ).toFixed(2),
            ),
          },

          power95: {
            city1: firstCity.fuels.petrol.power95,
            city2: secondCity.fuels.petrol.power95,
            difference: Number(
              (
                secondCity.fuels.petrol.power95 - firstCity.fuels.petrol.power95
              ).toFixed(2),
            ),
          },

          speed97: {
            city1: firstCity.fuels.petrol.speed97,
            city2: secondCity.fuels.petrol.speed97,
            difference: Number(
              (
                secondCity.fuels.petrol.speed97 - firstCity.fuels.petrol.speed97
              ).toFixed(2),
            ),
          },

          e20: {
            city1: firstCity.fuels.petrol.e20,
            city2: secondCity.fuels.petrol.e20,
            difference: Number(
              (
                secondCity.fuels.petrol.e20 - firstCity.fuels.petrol.e20
              ).toFixed(2),
            ),
          },
        },

        diesel: {
          regular: {
            city1: firstCity.fuels.diesel.regular,
            city2: secondCity.fuels.diesel.regular,
            difference: Number(
              (
                secondCity.fuels.diesel.regular - firstCity.fuels.diesel.regular
              ).toFixed(2),
            ),
          },

          xtraGreen: {
            city1: firstCity.fuels.diesel.xtraGreen,
            city2: secondCity.fuels.diesel.xtraGreen,
            difference: Number(
              (
                secondCity.fuels.diesel.xtraGreen -
                firstCity.fuels.diesel.xtraGreen
              ).toFixed(2),
            ),
          },

          turboJet: {
            city1: firstCity.fuels.diesel.turboJet,
            city2: secondCity.fuels.diesel.turboJet,
            difference: Number(
              (
                secondCity.fuels.diesel.turboJet -
                firstCity.fuels.diesel.turboJet
              ).toFixed(2),
            ),
          },

          speedDiesel: {
            city1: firstCity.fuels.diesel.speedDiesel,
            city2: secondCity.fuels.diesel.speedDiesel,
            difference: Number(
              (
                secondCity.fuels.diesel.speedDiesel -
                firstCity.fuels.diesel.speedDiesel
              ).toFixed(2),
            ),
          },

          bioDiesel: {
            city1: firstCity.fuels.diesel.bioDiesel,
            city2: secondCity.fuels.diesel.bioDiesel,
            difference: Number(
              (
                secondCity.fuels.diesel.bioDiesel -
                firstCity.fuels.diesel.bioDiesel
              ).toFixed(2),
            ),
          },
        },

        gas: {
          cng: {
            city1: firstCity.fuels.gas.cng,
            city2: secondCity.fuels.gas.cng,
            difference: Number(
              (secondCity.fuels.gas.cng - firstCity.fuels.gas.cng).toFixed(2),
            ),
          },

          png: {
            city1: firstCity.fuels.gas.png,
            city2: secondCity.fuels.gas.png,
            difference: Number(
              (secondCity.fuels.gas.png - firstCity.fuels.gas.png).toFixed(2),
            ),
          },

          lng: {
            city1: firstCity.fuels.gas.lng,
            city2: secondCity.fuels.gas.lng,
            difference: Number(
              (secondCity.fuels.gas.lng - firstCity.fuels.gas.lng).toFixed(2),
            ),
          },
        },

        alternative: {
          ethanol: {
            city1: firstCity.fuels.alternative.ethanol,
            city2: secondCity.fuels.alternative.ethanol,
            difference: Number(
              (
                secondCity.fuels.alternative.ethanol -
                firstCity.fuels.alternative.ethanol
              ).toFixed(2),
            ),
          },

          hydrogen: {
            city1: firstCity.fuels.alternative.hydrogen,
            city2: secondCity.fuels.alternative.hydrogen,
            difference: Number(
              (
                secondCity.fuels.alternative.hydrogen -
                firstCity.fuels.alternative.hydrogen
              ).toFixed(2),
            ),
          },
        },
      },
    };
  }

  const path = FUEL_TYPES[fuelType];

  if (!path) {
    throw new AppError("Invalid fuel type", HTTP_STATUS_CODES.BAD_REQUEST);
  }

  const firstValue = getNestedValue(firstCity, path);

  const secondValue = getNestedValue(secondCity, path);

  return {
    fuelType,

    city1: {
      city: firstCity.city,
      value: firstValue,
    },

    city2: {
      city: secondCity.city,
      value: secondValue,
    },

    difference: Number((secondValue - firstValue).toFixed(2)),
  };
};
