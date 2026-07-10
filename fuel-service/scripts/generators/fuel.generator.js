/**
 * Generates all fuel prices from a regular petrol price.
 * This keeps fuel relationships realistic.
 */

export const generateFuelPrices = (regularPetrol) => {
  const regularDiesel = Number((regularPetrol - 7).toFixed(2));

  return {
    petrol: {
      regular: regularPetrol,

      xp95: Number((regularPetrol + 5.40).toFixed(2)),

      power95: Number((regularPetrol + 5.80).toFixed(2)),

      speed97: Number((regularPetrol + 7.90).toFixed(2)),

      e20: Number((regularPetrol + 1.50).toFixed(2)),
    },

    diesel: {
      regular: regularDiesel,

      xtraGreen: Number((regularDiesel + 3.10).toFixed(2)),

      turboJet: Number((regularDiesel + 2.80).toFixed(2)),

      speedDiesel: Number((regularDiesel + 3.40).toFixed(2)),

      bioDiesel: Number((regularDiesel + 0.70).toFixed(2)),
    },

    gas: {
      cng: Number((78 + ((regularPetrol - 100) * 0.08)).toFixed(2)),

      png: Number((56 + ((regularPetrol - 100) * 0.05)).toFixed(2)),

      lng: Number((71 + ((regularPetrol - 100) * 0.06)).toFixed(2)),
    },

    alternative: {
      ethanol: Number((62 + ((regularPetrol - 100) * 0.03)).toFixed(2)),

      hydrogen: Number((355 + ((regularPetrol - 100) * 0.20)).toFixed(2)),
    },
  };
};