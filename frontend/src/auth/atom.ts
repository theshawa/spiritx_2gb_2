import { atom } from "jotai";
import { AuthData } from "./auth-data";

export const AuthAtom = atom<AuthData | null>(null);
