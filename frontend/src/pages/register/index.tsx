import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../backend/error";
import { useSnackBar } from "../../snackbar";
import { registerAction } from "./action";

type Inputs = {
  name: string;
  username: string;
  password: string;
  cpassword: string;
};

export const RegisterPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  const queryClient = useQueryClient();

  const { showSnackBar } = useSnackBar();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerAction,
    onSuccess: () => {
      showSnackBar("success", `Successfully Registered! Please login.`);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
    onError: (err) => {
      showSnackBar("error", `Unable to register: ${getErrorMessage(err)}`);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate(data);
  };

  const password = watch("password");

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
        Welcome to Spirit11!
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
          label="Username"
          autoComplete="username"
          type="text"
          error={!!errors.username}
          helperText={errors.username?.message}
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 4,
              message: "Username must be at least 4 characters long",
            },
          })}
        />
        <TextField
          fullWidth
          size="small"
          label="Password"
          type="password"
          autoComplete="password"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        <TextField
          fullWidth
          size="small"
          label="Confirm Password"
          type="password"
          autoComplete="password"
          error={!!errors.cpassword}
          helperText={errors.cpassword?.message}
          {...register("cpassword", {
            required: {
              value: true,
              message: "Confirm Password is required",
            },
            validate: (value) =>
              value === "" || value === password || "Passwords do not match",
          })}
        />
        <Button
          loading={!!queryClient.isMutating(mutation)}
          fullWidth
          type="submit"
          variant="contained"
        >
          Register
        </Button>
        <Typography variant="body2">
          Already have an account?{" "}
          <Link to="/">
            <Typography color="textSecondary" component="span">
              Login
            </Typography>
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};
