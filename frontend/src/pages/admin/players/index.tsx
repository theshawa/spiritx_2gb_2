import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Link } from "react-router-dom";
import { AxiosClient } from "../../../backend/axios";
import { getErrorMessage } from "../../../backend/error";
import { PlayerData } from "../../../data.types";

export const AdminPlayersPage: FC = () => {
  const {
    data: players,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-players"],
    queryFn: async () => {
      const res = await AxiosClient.get<PlayerData[]>("/players");
      return res?.data;
    },
  });

  if (isError) {
    return (
      <Typography variant="body2">
        Error loading data: {getErrorMessage(error)}
      </Typography>
    );
  }

  if (!players) {
    return <></>;
  }

  return (
    <Stack spacing={6}>
      <Box>
        <Link to="/admin/new-player">
          <Button variant="contained">New Player</Button>
        </Link>
      </Box>
      <Typography variant="h4">{players.length} players</Typography>
      <Grid2 container spacing={2}>
        {players.map((player) => (
          <Grid2 key={player.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              <Link to={`/admin/player/${player.id}`}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {player.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {player.category} from {player.university}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
              <CardActions>
                <Link to={`/admin/player/${player.id}`}>
                  <Button size="small" color="primary">
                    View Stats
                  </Button>
                </Link>
                <Link to={`/admin/edit-player/${player.id}`}>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </Link>
                <Button size="small" color="error">
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
};
