import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { AxiosClient } from "../../../backend/axios";
import { getErrorMessage } from "../../../backend/error";
import { PlayerWithStatsData } from "../../../data.types";

export const AdminViewPlayerPage: FC = () => {
  const { playerId } = useParams<{ playerId: string }>();
  const { data, isError, error } = useQuery({
    queryKey: ["admin-view-player", playerId],
    queryFn: async () => {
      const res = await AxiosClient.get<PlayerWithStatsData>(
        `/players/${playerId}?more=1`
      );
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

  if (!data) {
    return <></>;
  }

  return (
    <Stack spacing={2} maxWidth={600} mx="auto" width="100%">
      <Typography variant="h3">{data.name}</Typography>
      <Typography variant="body2">
        {data.category} from {data.university}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Innings Played
              </TableCell>
              <TableCell align="right">{data.inningsPlayed}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Total Runs
              </TableCell>
              <TableCell align="right">{data.totalRuns}</TableCell>
            </TableRow>

            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Balls Faced
              </TableCell>
              <TableCell align="right">{data.ballsFaced}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Wickets Taken
              </TableCell>
              <TableCell align="right">{data.wickets}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Runs Conceded
              </TableCell>
              <TableCell align="right">{data.runsConceded}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Overs Bowled
              </TableCell>
              <TableCell align="right">{data.oversBowled || 0}</TableCell>
            </TableRow>

            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Batting Average
              </TableCell>
              <TableCell align="right">
                {data.stats.battingAverage?.toFixed(2) || "Not available"}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Batting Strike Rate
              </TableCell>
              <TableCell align="right">
                {data.stats.battingStrikeRate?.toFixed(2) || "Not available"}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Bowling Strike Rate
              </TableCell>
              <TableCell align="right">
                {data.stats.bowlingStrikeRate?.toFixed(2) || "Not available"}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Economy Rate
              </TableCell>
              <TableCell align="right">
                {data.stats.economyRate.toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Points
              </TableCell>
              <TableCell align="right">
                <Typography
                  color={
                    data.stats.points < 100 / 3
                      ? "error"
                      : data.stats.points < (100 / 3) * 2
                      ? "warning"
                      : "success"
                  }
                >
                  {data.stats.points.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Value
              </TableCell>
              <TableCell align="right">
                <strong>{Math.round(data.stats.value)} LKR</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {data.editable && (
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" size="small">
            Edit
          </Button>
          <Button variant="outlined" size="small" color="error">
            Delete
          </Button>
        </Stack>
      )}
    </Stack>
  );
};
