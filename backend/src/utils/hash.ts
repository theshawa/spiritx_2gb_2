import { compareSync, hashSync } from "bcrypt";

export const hashString = (str: string): string => {
  return hashSync(str, 10);
};

export const compareHash = (str: string, hash: string): boolean => {
  return compareSync(str, hash);
};
