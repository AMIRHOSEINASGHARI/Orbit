import type { ReactNode } from "react";

export function PageHeader({ title, description, breadcrumbs, actions }: {
  title: string;
  description?: string;
  breadcrumbs?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
      <div className="min-w-0 space-y-1.25">
        {breadcrumbs && <div className="text-ui-label font-semibold text-primary">{breadcrumbs}</div>}
        <h1 className="text-[32px] leading-[1.2] font-bold text-foreground">{title}</h1>
        {description && <p className="text-sm leading-[1.6] text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}
