import { AxiosClient } from "../../backend/axios";

export interface GetCurrentAuthActionResponse {
  name: string;
  accessToken: string;
  id: number;
  username: string;
  budget: number;
  role: string;
}

export const getAccessTokenAction = async () => {
  const res = await AxiosClient.get<GetCurrentAuthActionResponse>(
    "/access-token"
  );

  return res?.data;
};
