import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/useAuth";
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

export const AdminAddNewPlayerPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const queryClient = useQueryClient();

  const { showSnackBar } = useSnackBar();

  const navigate = useNavigate();

  const { setAuth } = useAuth();

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
    mutation.mutate(data);
  };

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
        Welcome!
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
        <Button
          loading={!!queryClient.isMutating(mutation)}
          fullWidth
          type="submit"
          variant="contained"
        >
          Login
        </Button>
      </Stack>
    </Box>
  );
};
