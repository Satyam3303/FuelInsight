import mongoose from "mongoose";

const fuelPriceSchema = new mongoose.Schema(
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
    petrolPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    dieselPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "fuel_prices",
  }
);

fuelPriceSchema.index({ city: 1 });

const FuelPrice = mongoose.model("FuelPrice", fuelPriceSchema);

export default FuelPrice;