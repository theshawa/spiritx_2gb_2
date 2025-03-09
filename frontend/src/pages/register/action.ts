import { AxiosClient } from "../../backend/axios";

export interface RegisterActionInput {
  name: string;
  username: string;
  password: string;
}

export const registerAction = async (data: RegisterActionInput) => {
  (await AxiosClient.post("/register", data)).data;
};
