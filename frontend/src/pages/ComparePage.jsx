import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import api from "../api/api";

const CITIES = ["Delhi", "Mumbai", "Bengaluru", "Bhubaneswar", "Chennai"];

const FUEL_TYPES = [
  { label: "All Fuels", value: "" },

  { label: "Regular Petrol", value: "regularPetrol" },
  { label: "XP95", value: "xp95" },
  { label: "Power95", value: "power95" },
  { label: "Speed97", value: "speed97" },
  { label: "E20", value: "e20" },

  { label: "Regular Diesel", value: "regularDiesel" },
  { label: "XtraGreen", value: "xtraGreen" },
  { label: "TurboJet", value: "turboJet" },
  { label: "Speed Diesel", value: "speedDiesel" },
  { label: "Bio Diesel", value: "bioDiesel" },

  { label: "CNG", value: "cng" },
  { label: "PNG", value: "png" },
  { label: "LNG", value: "lng" },

  { label: "Ethanol", value: "ethanol" },
  { label: "Hydrogen", value: "hydrogen" },
];

const fuelLabels = {
  regular: "Regular",
  regularPetrol: "Regular Petrol",
  xp95: "XP95",
  power95: "Power95",
  speed97: "Speed 97",
  e20: "E20",

  regularDiesel: "Regular Diesel",
  xtraGreen: "Xtra Green",
  turboJet: "Turbo Jet",
  speedDiesel: "Speed Diesel",
  bioDiesel: "Bio Diesel",

  cng: "CNG",
  png: "PNG",
  lng: "LNG",

  ethanol: "Ethanol",
  hydrogen: "Hydrogen",
};

function ComparePage() {
  const [city1, setCity1] = useState("Delhi");
  const [city2, setCity2] = useState("Mumbai");

  const [fuelType, setFuelType] = useState("");

  const [result, setResult] = useState(null);

  const handleCompare = async () => {
    try {
      let url = `/api/fuel/compare?city1=${city1}&city2=${city2}`;

      if (city1 === city2) {
        alert("Please select different cities");
        return;
      }

      if (fuelType) {
        url += `&fuelType=${fuelType}`;
      }

      const response = await api.get(url);

      setResult(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderComparisonTable = (title, data) => (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "transparent",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fuel Type</TableCell>

                <TableCell align="right">{result.city1}</TableCell>

                <TableCell align="right">{result.city2}</TableCell>

                <TableCell align="right">Difference</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Object.entries(data).map(([fuel, values]) => (
                <TableRow key={fuel}>
                  <TableCell>{fuelLabels[fuel] || fuel}</TableCell>

                  <TableCell align="right">₹{values.city1}</TableCell>

                  <TableCell align="right">₹{values.city2}</TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      color: "warning.main",
                      fontWeight: 700,
                    }}
                  >
                    ₹{values.difference}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      {" "}
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Compare Cities{" "}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>City 1</InputLabel>

          <Select
            value={city1}
            label="City 1"
            onChange={(e) => setCity1(e.target.value)}
          >
            {CITIES.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>City 2</InputLabel>

          <Select
            value={city2}
            label="City 2"
            onChange={(e) => setCity2(e.target.value)}
          >
            {CITIES.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel>Fuel Type</InputLabel>

          <Select
            value={fuelType}
            label="Fuel Type"
            onChange={(e) => setFuelType(e.target.value)}
          >
            {FUEL_TYPES.map((fuel) => (
              <MenuItem key={fuel.label} value={fuel.value}>
                {fuel.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleCompare}>
          Compare
        </Button>
      </Stack>
      {result && result.comparisons && (
        <>
          {renderComparisonTable("Petrol", result.comparisons.petrol)}

          {renderComparisonTable("Diesel", result.comparisons.diesel)}

          {renderComparisonTable("Gas", result.comparisons.gas)}

          {renderComparisonTable(
            "Alternative Fuels",
            result.comparisons.alternative,
          )}
        </>
      )}
      {result && result.fuelType && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {FUEL_TYPES.find((f) => f.value === result.fuelType)?.label}{" "}
              Comparison
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mt: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">{result.city1.city}</Typography>

                <Typography variant="h6" color="primary">
                  ₹{result.city1.value}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">{result.city2.city}</Typography>

                <Typography variant="h6" color="primary">
                  ₹{result.city2.value}
                </Typography>
              </Box>

              <Box
                sx={{
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  pt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" fontWeight={700}>
                  Difference
                </Typography>

                <Typography variant="h5" color="warning.main" fontWeight={700}>
                  ₹{result.difference}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default ComparePage;
