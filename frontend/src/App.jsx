import { Link } from "react-router-dom";

import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      {" "}
      <AppBar position="static">
        {" "}
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            FuelInsight{" "}
          </Typography>

          <Button color="inherit" component={Link} to="/">
            Fuel Prices
          </Button>
          <Button color="inherit" component={Link} to="/compare">
            Compare
          </Button>
          <Button color="inherit" component={Link} to="/news">
            News
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <AppRoutes />
      </Container>
    </>
  );
}

export default App;
