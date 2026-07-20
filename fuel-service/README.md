# ⛽ Fuel Service

The **Fuel Service** is a core microservice of the **FuelInsight** platform responsible for managing fuel price data across India.

It provides REST APIs to retrieve current fuel prices, compare prices between cities, access historical price snapshots, and analyze fuel price trends. The service is designed following the **Single Responsibility Principle**, focusing exclusively on fuel-related operations.

---

# Features

- Current fuel prices for Indian cities
- State-wise filtering
- City-wise fuel details
- Fuel price comparison between cities
- Historical fuel price snapshots
- Fuel trend analysis
- Health check endpoint
- RESTful API design

---

# Architecture

```
                API Gateway
                     │
                     ▼
             Fuel Service
                     │
        ┌────────────┴────────────┐
        │                         │
Business Logic             MongoDB Database
```

The Fuel Service is consumed by:

- Frontend Application
- Analytics Service

The Analytics Service uses this service to generate market reports, city analytics, and price rankings.

---

# Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

---

# Project Structure

```text
fuel-service/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   └── app.js
│
├── server.js
├── package.json
└── .env
```

---

# API Endpoints

## Health

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/fuel/health` | Check service health |

---

## Fuel Prices

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/fuel/prices` | Get fuel prices for all cities |
| GET | `/api/fuel/prices?state={state}` | Get fuel prices filtered by state |
| GET | `/api/fuel/prices/{city}` | Get fuel prices for a specific city |

---

## Fuel Comparison

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/fuel/compare?city1={city1}&city2={city2}` | Compare all fuel types between two cities |
| GET | `/api/fuel/compare?city1={city1}&city2={city2}&fuelType={fuelType}` | Compare a specific fuel type |

---

## Fuel History

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/fuel/history/snapshot` | Create a daily fuel price snapshot |
| GET | `/api/fuel/history/{city}` | Retrieve historical fuel price records for a city |

---

## Fuel Trends

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/fuel/history/{city}/trends?fuelType={fuelType}&range={range}` | Analyze fuel price trends for a city over a selected time range |

### Supported Query Parameters

| Parameter | Description | Example |
|----------|-------------|---------|
| `fuelType` | Fuel variant to analyze | `xp95` |
| `range` | Time duration | `7d`, `30d`, `6m`, `1y`, `2y` |

### Example

```http
GET /api/fuel/history/Mumbai/trends?fuelType=xp95&range=2y
```

Returns:

- Historical trend points
- Time-series data
- Price movement
- Trend analysis
- Data ready for line/area charts
---

# Supported Fuel Categories

## Petrol

- Regular Petrol
- XP95
- Power95
- Speed97
- E20

## Diesel

- Regular Diesel
- Xtra Green
- TurboJet
- Speed Diesel
- Bio Diesel

## Gas

- CNG
- PNG
- LNG

## Alternative Fuels

- Ethanol
- Hydrogen

---

# Data Model

Each city document contains:

```javascript
{
  city,
  state,
  fuels: {
    petrol: {...},
    diesel: {...},
    gas: {...},
    alternative: {...}
  },
  lastUpdated
}
```

---

# Request Flow

```text
Client

↓

API Gateway

↓

Fuel Routes

↓

Controller

↓

Service

↓

Repository

↓

MongoDB

↓

Response
```

---

# Design Principles

- Layered Architecture
- Repository Pattern
- Service Layer Pattern
- RESTful API Design
- Separation of Concerns
- Reusable Business Logic

---

# Environment Variables

```env
PORT=3001

MONGODB_URI=<your_mongodb_connection_string>

NODE_ENV=development
```

---

# Running the Service

Install dependencies

```bash
npm install
```

Run in development mode

```bash
npm run dev
```

Run in production mode

```bash
npm start
```

---

# API Response Format

Successful responses follow a consistent structure.

```json
{
  "success": true,
  "message": "Fuel prices fetched successfully",
  "data": {}
}
```

Error responses:

```json
{
  "success": false,
  "message": "City not found"
}
```

---

# Integration

This service communicates with:

- MongoDB (data persistence)
- API Gateway (request routing)

Additionally, it provides data to the **Analytics Service**, which consumes fuel information to generate aggregated reports and insights.

---

# Future Enhancements

- Fuel price forecasting
- Regional analytics
- Bulk comparison
- Redis caching
- Rate limiting
- API versioning
- OpenAPI/Swagger documentation

---

# License

This project is part of the **FuelInsight** microservices platform and is intended for educational and portfolio purposes.