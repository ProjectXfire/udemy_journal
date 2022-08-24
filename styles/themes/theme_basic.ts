import { createTheme } from "@mui/material/styles";

export const basicTheme = createTheme({
  palette: {
    background: {
      paper: "#263238",
    },
    mode: "dark",
    primary: {
      main: "#37474f",
    },
    secondary: {
      main: "#2344a5",
    },
    info: {
      main: "#fff",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none",
          color: "white",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        color: "info",
      },
    },
  },
});
