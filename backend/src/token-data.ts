import { z } from "zod";

export const TokenData = z.object({
  id: z.number().optional(),
  username: z.string(),
  role: z.string(),
});
