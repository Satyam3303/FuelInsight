import { CITIES } from "../data/cities.js";
import { getBaseFuelPrices } from "../data/base-prices.js";

import { generatePriceHistory } from "./price-generator.js";
import { generateFuelPrices } from "./fuel-generator.js";

export const generateHistory = () => {
  const history = [];
  const currentPrices = [];

  const startDate = new Date("2024-01-01");
  const endDate = new Date();

  for (const city of CITIES) {
    const basePrices = getBaseFuelPrices(city.state);

    const petrolHistory = generatePriceHistory(
      city.city,
      basePrices.petrol.regular,
      startDate,
      endDate,
    );

    petrolHistory.forEach((day, index) => {
      const fuels = generateFuelPrices(day.price);

      history.push({
        city: city.city,
        state: city.state,
        fuels,
        capturedAt: day.date,
      });

      // Save latest day as current price
      if (index === petrolHistory.length - 1) {
        currentPrices.push({
          city: city.city,
          state: city.state,
          fuels,
          lastUpdated: day.date,
        });
      }
    });
  }

  return {
    history,
    currentPrices,
  };
};