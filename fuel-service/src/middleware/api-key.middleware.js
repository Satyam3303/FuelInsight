export const validateApiKey = (req, res, next) => {
  if (req.header("x-api-key") !== process.env.SERVICE_API_KEY) {
    return res.status(401).json({
      success: false,
      message: "Invalid API key",
    });
  }

  next();
};
