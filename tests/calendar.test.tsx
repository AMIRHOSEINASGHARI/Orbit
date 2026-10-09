import { render, screen } from "./test-utils";
import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
import { expect, it } from "vitest";

it("uses Gregorian English dates by default and retains locale overrides", () => {
  const defaultMonth = new Date(2024, 0, 1);
  const { rerender } = render(<Calendar defaultMonth={defaultMonth} />);

  expect(screen.getByText("January 2024")).toBeInTheDocument();

  rerender(<Calendar defaultMonth={defaultMonth} locale={fr} />);
  expect(screen.getByText("janvier 2024")).toBeInTheDocument();
});
