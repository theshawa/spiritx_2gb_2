import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export const ProtectedRoute: FC<{
  children: ReactNode;
  role?: "admin" | "user";
  authRequired?: boolean;
}> = ({ children, role = "user", authRequired = true }) => {
  const { auth } = useAuth();

  if (authRequired && !auth) {
    return <Navigate to="/" />;
  }

  if (authRequired && auth && auth.role !== role) {
    return <Navigate to="/" />;
  }

  if (!authRequired && auth) {
    return <Navigate to={`/${auth.role}`} />;
  }

  return children;
};
