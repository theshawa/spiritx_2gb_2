import {
  Card,
  CardActionArea,
  CardContent,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../auth/useAuth";

export const UserDashboardPage: FC = () => {
  const { auth } = useAuth();
  return (
    <Stack spacing={6}>
      <Typography variant="h2">Hello {auth?.name}!</Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <Link to={`/user/teams`}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    View Teams
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <Link to={`/user/player-categories`}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    View Players
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </Grid2>
      </Grid2>
    </Stack>
  );
};
