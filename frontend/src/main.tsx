import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider } from "@tanstack/react-query";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { BackendClient } from "./backend/query-client";
import { SnackBarWrapper } from "./snackbar";
import theme from "./theme";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={BackendClient}>
    <ThemeProvider theme={theme}>
      <SnackBarWrapper>
        <CssBaseline />
        <App />
      </SnackBarWrapper>
    </ThemeProvider>
  </QueryClientProvider>
);
