import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AxiosClient } from "../../../backend/axios";
import { getErrorMessage } from "../../../backend/error";
import { useSnackBar } from "../../../snackbar";

type Inputs = {
  name: string;
};

export const UserNewTeamPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const queryClient = useQueryClient();

  const { showSnackBar } = useSnackBar();

  const mutation = useMutation({
    mutationFn: async (data: Inputs) => {
      await AxiosClient.post("/new-team", data);
    },
    onSuccess: (data) => {
      showSnackBar(
        "success",
        `New team added successfully! Go to team page to assign players.`
      );
      reset();
    },
    onError: (err) => {
      showSnackBar("error", `Unable to add team: ${getErrorMessage(err)}`);
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
        New Team
      </Typography>
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
        <TextField
          fullWidth
          size="small"
          label="Name"
          autoComplete="name"
          type="text"
          placeholder="Sumathi Super Kings"
          error={!!errors.name}
          helperText={errors.name?.message}
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 6,
              message: "Name must be at least 6 characters long",
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
