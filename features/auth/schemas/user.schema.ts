import { z } from "zod";

export const userSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()),
  passwordHash: z.string().min(1),
});

export type User = z.infer<typeof userSchema>;
