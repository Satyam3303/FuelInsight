import FuelHistory from "../models/fuel.history.model.js";

export const createFuelSnapshot = async (
  snapshot,
) => {
  return FuelHistory.create(snapshot);
};

export const createBulkFuelSnapshots = async (
  snapshots,
) => {
  return FuelHistory.insertMany(snapshots, {
    ordered: false,
  });
};

export const getFuelHistoryByCity = async (
  city,
) => {
  return FuelHistory.find(
    {
      city: new RegExp(`^${city}$`, "i"),
    },
    {
      city: 1,
      state: 1,
      fuels: 1,
      capturedAt: 1,
    },
  )
    .sort({ capturedAt: 1 })
    .lean();
};