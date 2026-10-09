import { useQueryClient } from "@tanstack/react-query";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import { render, screen } from "./test-utils";
import { expect, it } from "vitest";

function QueryDefaults() {
  const client = useQueryClient();
  return <output>{String(client.getDefaultOptions().queries?.staleTime)}</output>;
}

it("provides a query client with a nonzero default stale time", () => {
  render(
    <ReactQueryProvider>
      <QueryDefaults />
    </ReactQueryProvider>,
  );

  expect(screen.getByText("60000")).toBeInTheDocument();
});
