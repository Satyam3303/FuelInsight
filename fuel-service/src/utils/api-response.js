export const sendSuccessResponse = (
  res,
  statusCode,
  data,
  message = null
) => {
  const response = {
    success: true,
  };

  if (message) {
    response.message = message;
  }

  if (data) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};