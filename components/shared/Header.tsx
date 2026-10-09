import Link from "next/link";
import type { ReactNode } from "react";
import { BellIcon, SearchIcon } from "@/components/icons";
import { AppLogo } from "@/components/shared/AppLogo";
import { MobileNavigation } from "@/components/shared/MobileNavigation";

export function Header({ actions, account }: { actions?: ReactNode; account?: ReactNode }) {
  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b border-border bg-card px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <MobileNavigation />
        <AppLogo href="/dashboard" size="sm" />
      </div>
      <div className="flex items-center gap-3">
        {actions}
        <Link href="/search" aria-label="Search" className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring"><SearchIcon className="size-5" /></Link>
        <Link href="/notifications" aria-label="Notifications" className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring"><BellIcon className="size-5" /></Link>
        {account ?? <Link href="/settings/profile" className="text-sm font-medium text-foreground hover:underline">Profile</Link>}
      </div>
    </header>
  );
}
