import mongoose from "mongoose";
import dotenv from "dotenv";

import FuelHistory from "../src/models/fuel.history.model.js";
import FuelPrice from "../src/models/fuel-price.model.js";

import { CITIES } from "./data/cities.js";
import { getBaseFuelPrices } from "./data/base-prices.js";

import { generateFuelPrices } from "./generators/fuel-generator.js";
import { generateHistory } from "./generators/history-generator.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB");

    await FuelPrice.deleteMany({});
    await FuelHistory.deleteMany({});

    console.log("Old data deleted");


const { history, currentPrices } = generateHistory();

await FuelPrice.insertMany(currentPrices);

await FuelHistory.insertMany(history);

console.log(`Inserted ${currentPrices.length} fuel prices`);
console.log(`Inserted ${history.length} history records`);


    console.log(
      `Inserted ${history.length} history records`,
    );

    console.log("Database seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedDatabase();