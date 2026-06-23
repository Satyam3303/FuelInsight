import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#f59e0b",
    },

    secondary: {
      main: "#38bdf8",
    },

    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
  },

  typography: {
    fontFamily: "Inter, sans-serif",

    h1: {
      fontWeight: 700,
    },

    h2: {
      fontWeight: 600,
    },

    h3: {
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 16,
  },
});

export default theme;