import type { ReactNode } from "react";
import { TriangleAlertIcon } from "@/components/icons";

export function ErrorState({ title = "Something went wrong", description = "Please try again.", action }: {
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <section role="alert" className="flex flex-col items-center gap-3 rounded-lg border border-destructive/30 bg-card px-6 py-12 text-center">
      <TriangleAlertIcon className="size-7 text-destructive" />
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </section>
  );
}
