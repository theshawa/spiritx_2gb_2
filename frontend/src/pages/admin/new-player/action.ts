import { AxiosClient } from "../../../backend/axios";

export interface AddPlayerActionInput {
  name: string;
  category: string;
  university: string;
  totalRuns: number;
  ballsFaced: number;
  inningsPlayed: number;
  wickets: number;
  oversBowled: number;
  runsConceded: number;
}

export const addPlayerAction = async (data: AddPlayerActionInput) => {
  await AxiosClient.post("/new-player", data);
};
