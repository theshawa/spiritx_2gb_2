import { Box, Toolbar } from "@mui/material";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { AppBar } from "../app-bar";
import { LINKS } from "./links";

export const RoleBasedLayout: FC<{
  role: "user" | "admin";
}> = ({ role }) => {
  return (
    <>
      <AppBar
        links={LINKS[role]}
        title={role === "admin" ? "Spirit11.Admin" : ""}
      />
      <Box
        component="main"
        sx={{ py: 3 }}
        display="flex"
        flexDirection="column"
      >
        <Toolbar />
        <Outlet />
      </Box>
    </>
  );
};
