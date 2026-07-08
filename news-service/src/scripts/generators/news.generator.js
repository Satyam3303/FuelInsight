import { NEWS_TEMPLATES } from "../data/templates.js";
import { NEWS_CATEGORIES } from "../../constants/news.categories.js";
import { NEWS_SOURCES } from "../../constants/news.sources.js";
import { NEWS_FUEL_TYPES } from "../../constants/fuel.types.js";

import {
  createRandom,
  stringToSeed,
  randomInt,
} from "./random.js";

const replacePlaceholders = (
  template,
  city,
  fuelType,
) => {
  return template
    .replaceAll("{city}", city)
    .replaceAll("{fuelType}", fuelType);
};

export const generateNews = (
  city,
  state,
  date,
  index,
) => {
  const random = createRandom(
    stringToSeed(`${city}-${date}-${index}`),
  );

  const category =
    NEWS_CATEGORIES[
      randomInt(random, 0, NEWS_CATEGORIES.length - 1)
    ];

  const fuelType =
    NEWS_FUEL_TYPES[
      randomInt(random, 0, NEWS_FUEL_TYPES.length - 1)
    ];

  const source =
    NEWS_SOURCES[
      randomInt(random, 0, NEWS_SOURCES.length - 1)
    ];

  const importanceLevels = [
    "low",
    "medium",
    "high",
  ];

  const importance =
    importanceLevels[
      randomInt(random, 0, importanceLevels.length - 1)
    ];

  const templates =
    NEWS_TEMPLATES[category] ??
    NEWS_TEMPLATES.pricing;

  const template =
    templates[
      randomInt(random, 0, templates.length - 1)
    ];

  const title = replacePlaceholders(
    template,
    city,
    fuelType,
  );

  return {
    title,

    description: `${title}. Market analysts continue to monitor developments across the country.`,

    category,

    source,

    url: `https://fuelinsight.news/${city.toLowerCase()}-${date.getTime()}-${index}`,

    location: city,

    fuelType,

    importance,

    tags: [
      category,
      fuelType,
      city.toLowerCase(),
      state.toLowerCase(),
    ],

    publishedAt: date,
  };
};