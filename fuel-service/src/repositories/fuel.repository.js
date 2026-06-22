import FuelPrice from "../models/fuel-price.model.js";

export const getAllFuelPrices = async (state) => {
  const query = {};

  if (state) {
    query.state = new RegExp(`^${state}$`, "i");
  }

  return FuelPrice.find(query).lean();
};

export const getFuelPriceByCity = async (city) => {
  return FuelPrice.findOne({
    city: new RegExp(`^${city}$`, "i"),
  }).lean();
};

export const createFuelPrice = async (payload) => {
  return FuelPrice.create(payload);
};

export const getFuelPricesByCities = async (
  city1,
  city2
) => {
  return FuelPrice.find({
    city: {
      $in: [
        new RegExp(`^${city1}$`, "i"),
        new RegExp(`^${city2}$`, "i"),
      ],
    },
  }).lean();
};