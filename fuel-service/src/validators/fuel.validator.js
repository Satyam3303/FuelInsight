import AppError from "../utils/app-error.js";

import { HTTP_STATUS_CODES } from "../constants/status-codes.js";

export const validateCompareCities = (city1, city2) => {
  if (!city1 || !city2) {
    throw new AppError(
      "city1 and city2 are required",
      HTTP_STATUS_CODES.BAD_REQUEST,
    );
  }
};
