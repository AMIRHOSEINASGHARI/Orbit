import { z } from "zod";

export const requiredText = z.string().trim().min(1, "Required");

export type FieldErrors = Record<string, string[]>;

export function formatZodError(error: z.ZodError) {
  const { formErrors, fieldErrors } = z.flattenError(error);
  return { formErrors, fieldErrors };
}
