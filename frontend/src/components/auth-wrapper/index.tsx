import { InternalAxiosRequestConfig } from "axios";
import { useSetAtom } from "jotai";
import { FC, ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { AxiosClient } from "../../backend/axios";
import { BudgetAtom } from "../../budget";
import { getAccessTokenAction, GetCurrentAuthActionResponse } from "./action";

export const AuthWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { auth, setAuth } = useAuth();
  const setBudget = useSetAtom(BudgetAtom);
  const [loading, setLoading] = useState(true);

  const updateAuthWithResponse = (data: GetCurrentAuthActionResponse) => {
    if (data.role === "user") {
      setBudget(data.budget);
      setAuth({
        accessToken: data.accessToken,
        id: data.id,
        name: data.name,
        role: data.role,
        username: data.username,
      });
    } else {
      setAuth({
        accessToken: data.accessToken,
        role: data.role,
        username: data.username,
        id: 0,
        name: "",
      });
    }
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const data = await getAccessTokenAction();
        if (data) updateAuthWithResponse(data);
      } catch (error) {
        console.log("FETCH_ACCESS_TOKEN_ERROR", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccessToken();
  }, []);

  useLayoutEffect(() => {
    if (auth?.accessToken) {
      const authInterceptor = AxiosClient.interceptors.request.use(
        (config: InternalAxiosRequestConfig<any> & { _retry?: boolean }) => {
          config.headers.Authorization = !config._retry
            ? `Bearer ${auth.accessToken}`
            : config.headers.Authorization;
          return config;
        }
      );

      return () => {
        AxiosClient.interceptors.request.eject(authInterceptor);
      };
    }
  }, [auth]);

  useLayoutEffect(() => {
    const refreshInterceptor = AxiosClient.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalRequest = err.config;

        if (err.response.status === 403) {
          try {
            const data = await getAccessTokenAction();
            if (data) updateAuthWithResponse(data);

            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            originalRequest._retry = true;
            return AxiosClient(originalRequest);
          } catch (error) {
            setAuth(null);
          }
        }
        return Promise.reject(err);
      }
    );

    return () => {
      AxiosClient.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  if (loading) return <></>;

  return children;
};
