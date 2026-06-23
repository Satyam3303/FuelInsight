import {
  Box,
  Button,
  Typography,
  Stack,
} from "@mui/material";

function Hero() {
  return (
    <Box
      sx={{
        py: 8,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
      >
        FuelInsight
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
      >
        Fuel Intelligence Across India
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ mt: 4 }}
      >
        <Button
          variant="contained"
          size="large"
        >
          Compare Cities
        </Button>

        <Button
          variant="outlined"
          size="large"
        >
          Latest News
        </Button>
      </Stack>
    </Box>
  );
}

export default Hero;