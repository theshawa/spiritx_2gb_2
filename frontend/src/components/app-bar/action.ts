import { AxiosClient } from "../../backend/axios";

export const logoutAction = async () => AxiosClient.post("/logout");
