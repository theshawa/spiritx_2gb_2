import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { Outlet } from "react-router-dom";

export const RootLayout: FC = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Outlet />
      <Box component="footer" sx={{ textAlign: "center", mt: 5, py: 1 }}>
        <Typography fontSize={12} color="textSecondary">
          Developed by Team <strong>2GB</strong> for Xcelerate Compitition. All
          rights reserved to relevant parties.
        </Typography>
      </Box>
    </Box>
  );
};
