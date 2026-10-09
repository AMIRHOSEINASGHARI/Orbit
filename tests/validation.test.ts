import { expect, it } from "vitest";
import { z } from "zod";
import { formatZodError, requiredText } from "@/utils/validation";

it("trims required text and formats Zod field errors", () => {
  expect(requiredText.parse(" Orbit ")).toBe("Orbit");

  const result = z.object({ name: requiredText }).safeParse({ name: " " });

  expect(result.success).toBe(false);
  if (!result.success) {
    expect(formatZodError(result.error).fieldErrors).toEqual({ name: ["Required"] });
  }
});
