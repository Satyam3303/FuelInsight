import { apiResponse } from "../utils/api.response.js";
import { HTTP_STATUS_CODES } from "../constants/status.codes.js";
import { MESSAGES } from "../constants/messages.js";

export const healthCheck = (req, res) => {
  return apiResponse(
    res,
    HTTP_STATUS_CODES.OK,
    null,
    MESSAGES.GATEWAY_SERVICE_HEALTHY,
    true,
    true
  );
};
