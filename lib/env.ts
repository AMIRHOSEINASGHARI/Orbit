import "server-only";
import { z } from "zod";

export const envSchema = z.object({
  MONGODB_URI: z
    .string()
    .trim()
    .min(1, "Required")
    .url()
    .refine(
      (uri) => uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://"),
      "Must use a mongodb:// or mongodb+srv:// URI",
    ),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const issues = result.error.issues
    .map(({ path, message }) => `${path.join(".")}: ${message}`)
    .join("\n");

  throw new Error(`Invalid environment configuration:\n${issues}`);
}

export const env = result.data;
export type Environment = z.infer<typeof envSchema>;
