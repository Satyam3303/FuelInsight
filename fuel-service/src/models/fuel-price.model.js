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

    fuels: {
      petrol: {
        regular: {
          type: Number,
          required: true,
          min: 0,
        },

        xp95: {
          type: Number,
          min: 0,
        },

        power95: {
          type: Number,
          min: 0,
        },

        speed97: {
          type: Number,
          min: 0,
        },

        e20: {
          type: Number,
          min: 0,
        },
      },

      diesel: {
        regular: {
          type: Number,
          required: true,
          min: 0,
        },

        xtraGreen: {
          type: Number,
          min: 0,
        },

        turboJet: {
          type: Number,
          min: 0,
        },

        speedDiesel: {
          type: Number,
          min: 0,
        },

        bioDiesel: {
          type: Number,
          min: 0,
        },
      },

      gas: {
        cng: {
          type: Number,
          min: 0,
        },

        png: {
          type: Number,
          min: 0,
        },

        lng: {
          type: Number,
          min: 0,
        },
      },

      alternative: {
        ethanol: {
          type: Number,
          min: 0,
        },

        hydrogen: {
          type: Number,
          min: 0,
        },
      },

      ev: {
        homeCharging: {
          type: Number,
          min: 0,
        },

        publicAC: {
          type: Number,
          min: 0,
        },

        publicDC: {
          type: Number,
          min: 0,
        },
      },
    },

    taxes: {
      centralExcise: {
        type: Number,
        min: 0,
      },

      stateVAT: {
        type: Number,
        min: 0,
      },

      dealerCommission: {
        type: Number,
        min: 0,
      },
    },

    metadata: {
      metroCity: {
        type: Boolean,
        default: false,
      },

      tier2City: {
        type: Boolean,
        default: false,
      },
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

const FuelPrice = mongoose.model(
  "FuelPrice",
  fuelPriceSchema
);

export default FuelPrice;