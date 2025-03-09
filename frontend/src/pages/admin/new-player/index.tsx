import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AxiosClient } from "../../../backend/axios";
import { getErrorMessage } from "../../../backend/error";
import { useSnackBar } from "../../../snackbar";
import { addPlayerAction } from "./action";

type Inputs = {
  name: string;
  category: string;
  university: string;
  totalRuns: number;
  ballsFaced: number;
  inningsPlayed: number;
  wickets: number;
  oversBowled: number;
  runsConceded: number;
};

export const AdminNewPlayerPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const queryClient = useQueryClient();

  const { showSnackBar } = useSnackBar();

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await AxiosClient.get<string[]>("/categories");
      return response?.data;
    },
  });

  const mutation = useMutation({
    mutationFn: addPlayerAction,
    onSuccess: (data) => {
      showSnackBar("success", `New player added successfully!`);
      reset();
    },
    onError: (err) => {
      showSnackBar("error", `Unable to login: ${getErrorMessage(err)}`);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate({
      ...data,
      totalRuns: Number(data.totalRuns),
      ballsFaced: Number(data.ballsFaced),
      inningsPlayed: Number(data.inningsPlayed),
      wickets: Number(data.wickets),
      oversBowled: Number(data.oversBowled),
      runsConceded: Number(data.runsConceded),
    });
  };

  if (categoriesQuery.isLoading) {
    return <></>;
  }

  if (categoriesQuery.isError) {
    return (
      <Typography>
        Unable to load data due to an error:{" "}
        {getErrorMessage(categoriesQuery.error)}
      </Typography>
    );
  }

  if (!categoriesQuery.data) {
    return <></>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 300,
        mt: 5,
        mx: "auto",
      }}
    >
      <Typography variant="h6" sx={{ mt: 2, mb: 3 }}>
        New Player
      </Typography>
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
        <TextField
          fullWidth
          size="small"
          label="Name"
          autoComplete="name"
          type="text"
          error={!!errors.name}
          helperText={errors.name?.message}
          {...register("name", {
            required: "Name is required",
          })}
        />
        <FormControl fullWidth>
          <InputLabel error={!!errors.category} size="small">
            Category
          </InputLabel>
          <Select
            id="demo-simple-select"
            label="Category"
            size="small"
            error={!!errors.category}
            {...register("category", {
              required: "Category is required",
            })}
          >
            {categoriesQuery.data.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
          {errors.category && (
            <FormHelperText error={!!errors.category}>
              {errors.category.message}
            </FormHelperText>
          )}
        </FormControl>

        <TextField
          fullWidth
          size="small"
          label="University"
          autoComplete="university"
          type="text"
          error={!!errors.university}
          helperText={errors.university?.message}
          {...register("university", {
            required: "University is required",
          })}
        />
        <TextField
          fullWidth
          size="small"
          label="Total Runs"
          autoComplete="total-runs"
          type="number"
          error={!!errors.totalRuns}
          helperText={errors.totalRuns?.message}
          {...register("totalRuns", {
            required: "Total Runs is required",
            min: {
              value: 0,
              message: "Total Runs must be a positive number",
            },
          })}
        />
        <TextField
          fullWidth
          size="small"
          label="Balls Faced"
          autoComplete="balls-faced"
          type="number"
          error={!!errors.ballsFaced}
          helperText={errors.ballsFaced?.message}
          {...register("ballsFaced", {
            required: "Balls Faced is required",
            min: {
              value: 0,
              message: "Balls Faced must be a positive number",
            },
          })}
        />
        <TextField
          fullWidth
          size="small"
          label="Innings Played"
          autoComplete="innings-played"
          type="number"
          error={!!errors.inningsPlayed}
          helperText={errors.inningsPlayed?.message}
          {...register("inningsPlayed", {
            required: "Innings Played is required",
            min: {
              value: 0,
              message: "Innings Played must be a positive number",
            },
          })}
        />
        <TextField
          fullWidth
          size="small"
          label="Wickets"
          autoComplete="wickets"
          type="number"
          error={!!errors.wickets}
          helperText={errors.wickets?.message}
          {...register("wickets", {
            required: "Wickets is required",
            min: {
              value: 0,
              message: "Wickets must be a positive number",
            },
          })}
        />
        <TextField
          fullWidth
          size="small"
          label="Overs Bowled"
          autoComplete="overs-bowled"
          type="number"
          error={!!errors.oversBowled}
          helperText={errors.oversBowled?.message}
          {...register("oversBowled", {
            required: "Overs Bowled is required",
            min: {
              value: 0,
              message: "Overs Bowled must be a positive number",
            },
          })}
        />
        <TextField
          fullWidth
          size="small"
          label="Runs Conceded"
          autoComplete="runs-conceded"
          type="number"
          error={!!errors.runsConceded}
          helperText={errors.runsConceded?.message}
          {...register("runsConceded", {
            required: "Runs Conceded is required",
            min: {
              value: 0,
              message: "Runs Conceded must be a positive number",
            },
          })}
        />
        <Button
          loading={!!queryClient.isMutating(mutation)}
          fullWidth
          type="submit"
          variant="contained"
        >
          Create
        </Button>
      </Stack>
    </Box>
  );
};
