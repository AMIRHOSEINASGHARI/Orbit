import { Button } from "@/components/ui/button";
import { render, screen } from "./test-utils";
import { expect, it } from "vitest";

it("renders shared UI components in the configured DOM test environment", () => {
  render(<Button>Continue</Button>);

  expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
});
