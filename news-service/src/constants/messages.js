export const MESSAGES = {
  SUCCESS: {
    NEWS_SERVICE_HEALTHY: "News Service is healthy",
    NEWS_SERVER_START: "News Service running on port",
    MONGODB_CONNECTED: "MongoDB Connected",
    NEWS_CREATED: "News article created successfully",
    ALL_NEWS_FETCHED: "All news articles fetched successfully",
    FEATURED_NEWS_FETCHED: "Featured news articles fetched successfully",
  },
  ERROR: {
    NEWS_PORT_ERROR: "PORT is not defined in the environment variables",
    MONGODB_URI_NOT_DEFINED: "MONGODB_URI is not defined",
    DATABASE_CONNECTION_FAILED: "Database connection failed",
    INVALID_API_KEY: "Invalid API key",
    NEWS_NOT_FOUND: "No news articles found",
    PAGE_LIMIT_ERROR: "Page and limit must be positive integers",
    CATEGORY_REQUIRED: "Category parameter is required",
  },
};
