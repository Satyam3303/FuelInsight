import { createRandom, stringToSeed, randomBetween } from "./random.js";

/**
 * Generates realistic daily price movements.
 * Same city + same date = same price every run.
 */

export const generatePriceHistory = (
  city,
  basePrice,
  startDate,
  endDate,
) => {
  const random = createRandom(stringToSeed(city));

  const history = [];

  let currentPrice = basePrice;

  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    // Small daily fluctuation
    const dailyChange = randomBetween(random, -0.25, 0.25);

    // Weekly pattern
    const weeklyWave =
      Math.sin(history.length / 7) * 0.08;

    // Monthly trend
    const monthlyWave =
      Math.sin(history.length / 30) * 0.30;

    // Rare market event
    let marketEvent = 0;

    if (history.length % 90 === 0 && history.length !== 0) {
      marketEvent = randomBetween(random, -2, 2);
    }

    currentPrice =
      currentPrice +
      dailyChange +
      weeklyWave +
      monthlyWave +
      marketEvent;

    currentPrice = Number(currentPrice.toFixed(2));

    history.push({
      date: new Date(currentDate),
      price: currentPrice,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return history;
};