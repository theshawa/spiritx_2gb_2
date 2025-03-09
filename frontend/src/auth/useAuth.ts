import { useAtom } from "jotai";
import { AuthAtom } from "./atom";

export const useAuth = () => {
  const [auth, setAuth] = useAtom(AuthAtom);
  return {
    auth,
    setAuth,
  };
};
