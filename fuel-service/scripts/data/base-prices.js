export const STATE_BASE_PRICES = {
  Delhi: 95.41,
  Maharashtra: 104.21,
  Karnataka: 102.86,
  "Tamil Nadu": 100.75,
  Telangana: 107.46,
  Gujarat: 94.62,
  Rajasthan: 104.72,
  Punjab: 97.2,
  Haryana: 95.08,
  "Uttar Pradesh": 94.65,
  Uttarakhand: 94.98,
  Bihar: 106.32,
  Jharkhand: 98.94,
  Odisha: 101.47,
  "West Bengal": 104.95,
  Kerala: 107.28,
  Goa: 96.54,
  "Madhya Pradesh": 106.81,
  Chhattisgarh: 101.73,
  Assam: 98.16,
  Meghalaya: 96.7,
  Nagaland: 98.09,
  Manipur: 99.74,
  Mizoram: 95.62,
  Tripura: 97.82,
  Sikkim: 101.18,
  "Arunachal Pradesh": 93.8,
  "Andhra Pradesh": 109.64,
  "Himachal Pradesh": 97.34,
  "Jammu & Kashmir": 100.12,
  Ladakh: 101.48,
};

export const getBaseFuelPrices = (state) => {
  const petrol = STATE_BASE_PRICES[state];

  if (!petrol) {
    throw new Error(`Base price not configured for state: ${state}`);
  }

  const diesel = Number((petrol - 7).toFixed(2));

  return {
    petrol: {
      regular: petrol,
      xp95: Number((petrol + 5.4).toFixed(2)),
      power95: Number((petrol + 5.8).toFixed(2)),
      speed97: Number((petrol + 7.9).toFixed(2)),
      e20: Number((petrol + 1.5).toFixed(2)),
    },

    diesel: {
      regular: diesel,
      xtraGreen: Number((diesel + 3.1).toFixed(2)),
      turboJet: Number((diesel + 2.8).toFixed(2)),
      speedDiesel: Number((diesel + 3.4).toFixed(2)),
      bioDiesel: Number((diesel + 0.7).toFixed(2)),
    },

    gas: {
      cng: 78.5,
      png: 56.0,
      lng: 71.0,
    },

    alternative: {
      ethanol: 62.0,
      hydrogen: 355.0,
    },
  };
};
