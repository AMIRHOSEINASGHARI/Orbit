import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

export function DashboardMetricCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: number | null;
  description: string;
  icon: ReactNode;
}) {
  return (
    <Card className="h-[154px] justify-between gap-3.5 p-5">
      <div className="flex items-center justify-between text-ui-small font-semibold text-muted-foreground">
        <h2>{title}</h2>
        <span aria-hidden="true" className="text-muted-foreground">
          {icon}
        </span>
      </div>
      <p
        className="text-[32px] leading-none font-bold text-foreground"
        aria-live="polite"
      >
        {value ?? "—"}
      </p>
      <p className="text-ui-label text-muted-foreground">{description}</p>
    </Card>
  );
}
