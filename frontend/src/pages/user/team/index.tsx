import { Button, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { AxiosClient } from "../../../backend/axios";
import { getErrorMessage } from "../../../backend/error";
import { PlayerData } from "../../../data.types";

export const UserTeamPage: FC = () => {
  const { teamId } = useParams();
  const {
    data: team,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user-team", teamId],
    queryFn: async () => {
      const res = await AxiosClient.get<{
        name: string;
        players: PlayerData[];
      }>("/team/" + teamId);
      return res?.data;
    },
  });

  if (isLoading) return <></>;

  if (isError) return <Typography>{getErrorMessage(error)}</Typography>;

  if (!team) return <div>No data found</div>;

  return (
    <Stack spacing={6}>
      <Stack spacing={1}>
        <Typography variant="h4">{team.name}</Typography>
        <Typography color="textDisabled" variant="subtitle1">
          {team.players.length}/11 players
        </Typography>
        <Typography variant="subtitle1">
          {0} points with {0} LKR
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button variant="contained">Assign Players</Button>
        <Button variant="contained">Make Team as Default</Button>
      </Stack>
      <Stack spacing={2}>
        {team.players.map((player) => (
          <Typography key={player.id}>{player.name}</Typography>
        ))}
      </Stack>
    </Stack>
  );
};
