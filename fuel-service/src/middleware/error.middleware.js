import { apiResponse } from "../utils/api.response.js";

export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  return apiResponse(res, statusCode, null, error.message, false);
};
