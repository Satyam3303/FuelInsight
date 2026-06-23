import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

import api from "../api/api";

function FuelPricesPage() {
  const [prices, setPrices] = useState([]);
  const navigate = useNavigate();

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
        {prices.map((price) => {
          const fuelCount =
            Object.keys(price.fuels.petrol).length +
            Object.keys(price.fuels.diesel).length +
            Object.keys(price.fuels.gas).length +
            Object.keys(price.fuels.alternative).length;

          return (
            <Card
              onClick={() => navigate(`/fuel/${price.city}`)}
              key={price._id}
              elevation={0}
              sx={{
                width: 300,
                height: 440,
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "0.3s",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-8px)",
                  borderColor: "warning.main",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                },
              }}
            >
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Box>
                    <Typography variant="h5" fontWeight={600}>
                      {price.city}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {price.state}
                    </Typography>
                  </Box>

                  <LocalGasStationIcon color="primary" />
                </Box>

                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip label="Petrol" size="small" color="primary" />
                  <Chip label="Diesel" size="small" />
                  <Chip label="Gas" size="small" />
                </Stack>

                <Divider sx={{ mb: 2 }} />

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  <Box display="flex" justifyContent="space-between">
                    <Typography color="text.secondary">Petrol</Typography>

                    <Typography color="primary.main" fontWeight={700}>
                      ₹{price.fuels?.petrol?.regular}
                    </Typography>
                  </Box>

                  <Box display="flex" justifyContent="space-between">
                    <Typography color="text.secondary">Diesel</Typography>

                    <Typography fontWeight={700}>
                      ₹{price.fuels?.diesel?.regular}
                    </Typography>
                  </Box>

                  <Box display="flex" justifyContent="space-between">
                    <Typography color="text.secondary">CNG</Typography>

                    <Typography fontWeight={700}>
                      ₹{price.fuels?.gas?.cng}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: "auto" }}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="caption" color="text.secondary">
                    {fuelCount} Fuel Types Tracked
                  </Typography>

                  <br />

                  <Typography variant="caption" color="text.secondary">
                    Updated {new Date(price.lastUpdated).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </>
  );
}

export default FuelPricesPage;
