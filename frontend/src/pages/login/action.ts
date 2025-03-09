import { AxiosClient } from "../../backend/axios";

export interface LoginActionInput {
  username: string;
  password: string;
}

export interface LoginActionResponse {
  username: string;
  name: string;
  accessToken: string;
  budget: string;
  role: string;
  id: number;
}

export const loginAction = async (data: LoginActionInput) => {
  return (await AxiosClient.post<LoginActionResponse>("/login", data)).data;
};

export const getCurrentAuth = async () => {
  return (await AxiosClient.get<LoginActionResponse>("/login")).data;
};
