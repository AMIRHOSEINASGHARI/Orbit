import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().trim().toLowerCase().min(3).max(30),
    email: z.string().trim().email().toLowerCase(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    error: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  username: z.string().trim().toLowerCase().min(3).max(30),
  password: z.string().min(1),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
