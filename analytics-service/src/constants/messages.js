export const MESSAGES = {
  SUCCESS: {
    ANALYTICS_SERVICE_HEALTHY: "Analytics Service is healthy",
    MARKET_REPORT_FETCHED: "Market report fetched successfully",
    ANALYTICS_SERVER_START: "Analytics Service running on port",
    MONGODB_CONNECTED: "MongoDB Connected",
    CITY_ANALYTICS_FETCHED: "City Analytics is Fetched",
    STATE_ANALYTICS_FETCHED: "State Analytics is Fetched",
    TOP_CITIES_FETCHED: "Top Cities Fetched",
    CHEAPEST_CITIES_FETCHED: "Cheapest Cities Fetched"
  },
  ERROR: {
    ANALYTICS_PORT_ERROR: "PORT is not defined in the environment variables",
    MONGODB_URI_NOT_DEFINED: "MONGODB_URI is not defined",
    DATABASE_CONNECTION_FAILED: "Database connection failed",
    INVALID_API_KEY: "Invalid API key",
    CITIES_NOT_FOUND: "Cities Not Found",
    NEWS_NOT_FOUND: "News Not Found",
    CITY_NOT_FOUND: "City Not Found",
    FUEL_HISTORY_NOT_FOUND: "Fuel History Not Found",
    INVALID_FUEL_TYPE: "Invalid Fuel Type",
    PAGE_LIMIT_ERROR: "Page and limit must be positive integers",
    STATE_NOT_FOUND: "State not Found"
  },
};
