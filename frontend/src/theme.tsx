import { deepPurple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  palette: {
    mode: "dark",
    primary: deepPurple,
    secondary: deepPurple,
  },
});

export default theme;
