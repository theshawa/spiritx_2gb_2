import { Container } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { AuthWrapper } from "./components/auth-wrapper";
import { router } from "./router";

export default function App() {
  return (
    <AuthWrapper>
      <Container maxWidth="xl">
        <RouterProvider router={router} />
      </Container>
    </AuthWrapper>
  );
}
