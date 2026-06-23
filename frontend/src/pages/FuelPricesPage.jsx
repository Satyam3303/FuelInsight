import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
} from "@mui/material";

import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

import api from "../api/api";

function FuelPricesPage() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await api.get("/api/fuel/prices");
        setPrices(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrices();
  }, []);

  return (
    <>
      <Box sx={{ mb: 5 }}>
        {" "}
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Fuel Dashboard{" "}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Track fuel prices across major Indian cities
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
        }}
      >
        {prices.map((price) => (
          <Card
            key={price._id}
            elevation={0}
            sx={{
              width: 300,
              height: 340,
              border: "1px solid rgba(255,255,255,0.08)",
              transition: "0.3s",

              "&:hover": {
                transform: "translateY(-6px)",
                borderColor: "primary.main",
              },
            }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h5" fontWeight={600}>
                  {price.city}
                </Typography>

                <LocalGasStationIcon color="primary" />
              </Box>

              <Chip label="Live Price" color="primary" size="small" />

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1" sx={{ mb: 1 }}>
                Petrol
              </Typography>

              <Typography variant="h5" color="primary" fontWeight={700}>
                ₹{price.petrolPrice}
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Diesel
                </Typography>

                <Typography variant="h5" fontWeight={700}>
                  ₹{price.dieselPrice}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
}

export default FuelPricesPage;
