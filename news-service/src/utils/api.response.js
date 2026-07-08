export const apiResponse = (res, statusCode, data, message, success = true, timestamp = false) => {
  const response = { success };

  if (message) {
    response.message = message;
  }

  if (data !== undefined && data !== null) {
    response.data = data;
  }

  if (timestamp) {
    response.timestamp = new Date().toISOString();
  }

  return res.status(statusCode).json(response);
};
