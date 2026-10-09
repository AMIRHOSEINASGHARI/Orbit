import type { ReactNode } from "react";
import { InfoIcon } from "@/components/icons";

export function EmptyState({ title, description, action, icon }: {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <section className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-card px-6 py-12 text-center">
      <div className="rounded-full bg-muted p-3 text-muted-foreground">{icon ?? <InfoIcon className="size-6" />}</div>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </section>
  );
}
