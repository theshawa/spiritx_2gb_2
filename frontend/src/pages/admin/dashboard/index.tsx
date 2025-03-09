import { Card, CardContent, Grid2, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { AxiosClient } from "../../../backend/axios";
import { getErrorMessage } from "../../../backend/error";
import { PlayerData } from "../../../data.types";

export const AdminDashboardPage: FC = () => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["admin-tournament-summary"],
    queryFn: async () => {
      const res = await AxiosClient.get<{
        overallRuns: number;
        overallWickets: number;
        highestRunScorer: PlayerData;
        highestWicketTaker: PlayerData;
      }>("/tournament-summary");
      return res?.data;
    },
  });

  if (isLoading) return <></>;

  if (isError)
    return (
      <Typography>Unable to load data: {getErrorMessage(error)}</Typography>
    );

  if (!data) return <Typography>No data found</Typography>;

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent>
            <Typography color="textDisabled" variant="subtitle1" mb={2}>
              Overall Runs
            </Typography>
            <Typography variant="h2">{data.overallRuns}</Typography>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent>
            <Typography color="textDisabled" variant="subtitle1" mb={2}>
              Overall Wickets
            </Typography>
            <Typography variant="h2">{data.overallWickets}</Typography>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent>
            <Typography color="textDisabled" variant="subtitle1" mb={2}>
              Highest Run Scorer
            </Typography>
            <Typography variant="h4">{data.highestRunScorer.name}</Typography>
            <Typography variant="body2" mt={1}>
              {data.highestRunScorer.category} from{" "}
              {data.highestRunScorer.university} have scored{" "}
              {data.highestRunScorer.totalRuns} runs
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent>
            <Typography color="textDisabled" variant="subtitle1" mb={2}>
              Highest Wickets Taker
            </Typography>
            <Typography variant="h4">{data.highestWicketTaker.name}</Typography>
            <Typography variant="body2" mt={1}>
              {data.highestWicketTaker.category} from{" "}
              {data.highestWicketTaker.university} have taken{" "}
              {data.highestWicketTaker.wickets} wickets
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};
