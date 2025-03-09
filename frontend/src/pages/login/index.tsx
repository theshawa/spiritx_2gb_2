import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { getErrorMessage } from "../../backend/error";
import { useSnackBar } from "../../snackbar";
import { loginAction } from "./action";

type Inputs = {
  username: string;
  password: string;
};

export const LoginPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const queryClient = useQueryClient();

  const { showSnackBar } = useSnackBar();

  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const mutation = useMutation({
    mutationFn: loginAction,
    onSuccess: (data) => {
      setAuth(data);
      navigate(`/${data.role}`);
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
          label="Username"
          autoComplete="username"
          type="text"
          error={!!errors.username}
          helperText={errors.username?.message}
          {...register("username", {
            required: "Username is required",
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
        <Typography variant="body2">
          Don't have an account?{" "}
          <Link to="/register">
            <Typography color="textSecondary" component="span">
              Register
            </Typography>
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};
