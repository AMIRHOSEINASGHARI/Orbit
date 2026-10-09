import { unstable_rethrow } from "next/navigation";
import { z } from "zod";
import type { ActionResult } from "@/types";
import { formatZodError } from "@/utils/validation";

export function handleActionError(error: unknown): ActionResult<never> {
  unstable_rethrow(error);

  if (error instanceof z.ZodError) {
    const { formErrors, fieldErrors } = formatZodError(error);
    return {
      success: false,
      error: formErrors[0] ?? "Please correct the highlighted fields.",
      fieldErrors,
    };
  }

  return {
    success: false,
    error: "Something went wrong. Please try again.",
  };
}
