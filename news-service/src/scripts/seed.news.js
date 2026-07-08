import mongoose from "mongoose";
import dotenv from "dotenv";

import News from "../models/news.model.js";
import { createRandom, stringToSeed, randomInt } from "./generators/random.js";
import { CITIES } from "./data/cities.js";
import { generateNews } from "./generators/news.generator.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});
const seedNews = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB");

    await News.deleteMany({});

    console.log("Old news deleted");

    const news = [];

    const startDate = new Date("2024-01-01");
    const endDate = new Date();

    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const articlesToday = 2 + (currentDate.getDate() % 5);

      for (let i = 0; i < articlesToday; i++) {
        const random = createRandom(
          stringToSeed(`${currentDate.toISOString()}-${i}`),
        );

        const city = CITIES[randomInt(random, 0, CITIES.length - 1)];

        news.push(
          generateNews(city.city, city.state, new Date(currentDate), i),
        );
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    await News.insertMany(news);

    console.log(`Inserted ${news.length} news articles`);

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedNews();
