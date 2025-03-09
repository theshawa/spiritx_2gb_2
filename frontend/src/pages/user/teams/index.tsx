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

export const UserTeamsPage: FC = () => {
  const {
    data: teams,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user-teams"],
    queryFn: async () => {
      const res = await AxiosClient.get<
        { id: number; name: string; players: PlayerData[] }[]
      >("/teams");
      return res?.data;
    },
  });

  if (isLoading) return <></>;

  if (isError) return <Typography>{getErrorMessage(error)}</Typography>;

  if (!teams) return <div>No data found</div>;
  return (
    <Stack spacing={6}>
      <Box>
        <Link to="/user/new-team">
          <Button variant="contained">New Team</Button>
        </Link>
      </Box>
      <Grid2 container spacing={2}>
        {teams.map((team) => (
          <Grid2 key={team.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              <Link to={`/user/teams/${team.id}`}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {team.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {team.players.length}/11 Players
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
              <CardActions>
                <Link to={`/user/teams/${team.id}`}>
                  <Button size="small" color="primary">
                    View Players
                  </Button>
                </Link>
                <Link to={`/user/edit-team/${team.id}`}>
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
