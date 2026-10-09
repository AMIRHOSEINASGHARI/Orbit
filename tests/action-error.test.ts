import { expect, it, vi } from "vitest";
import { unstable_rethrow } from "next/navigation";
import { z } from "zod";
import { handleActionError } from "@/utils/actionError";

vi.mock("next/navigation", () => ({ unstable_rethrow: vi.fn() }));

it("returns safe generic errors and field-level Zod validation errors", () => {
  expect(handleActionError(new Error("database password secret"))).toEqual({
    success: false,
    error: "Something went wrong. Please try again.",
  });

  const result = z.object({ name: z.string().min(1, "Name is required") }).safeParse({ name: "" });
  if (result.success) throw new Error("Expected validation to fail");

  expect(handleActionError(result.error)).toEqual({
    success: false,
    error: "Please correct the highlighted fields.",
    fieldErrors: { name: ["Name is required"] },
  });
});

it("preserves Next.js control-flow exceptions", () => {
  const controlFlowError = new Error("redirect");
  vi.mocked(unstable_rethrow).mockImplementation((error) => {
    if (error === controlFlowError) throw error;
  });

  expect(() => handleActionError(controlFlowError)).toThrow(controlFlowError);
});
