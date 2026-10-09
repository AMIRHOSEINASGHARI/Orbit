import { AppLogo } from "@/components/shared/AppLogo";
import { render, screen } from "./test-utils";
import { expect, it } from "vitest";

it("provides an accessible logo link with size and theme tone variants", () => {
  render(<AppLogo size="lg" tone="inverse" />);

  const logo = screen.getByRole("link", { name: "Orbit home" });
  expect(logo).toHaveAttribute("href", "/");
  expect(logo).toHaveClass("text-2xl", "text-primary-foreground");
});
