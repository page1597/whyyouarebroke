import { z } from "zod";

export const logInFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});
