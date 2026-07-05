import mongoose from "mongoose";

const fuelHistorySchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    fuels: {
      type: Object,
      required: true,
    },

    capturedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "fuel_history",
  },
);

fuelHistorySchema.index({
  city: 1,
  capturedAt: -1,
});

const FuelHistory = mongoose.model(
  "FuelHistory",
  fuelHistorySchema,
);

export default FuelHistory;