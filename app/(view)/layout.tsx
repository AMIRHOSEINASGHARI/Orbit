import type { CSSProperties, ReactNode } from "react";
import { redirect } from "next/navigation";
import { Header } from "@/components/shared/Header";
import { Sidebar } from "@/components/shared/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { hasValidSession } from "@/lib/auth/session";

export default async function ViewLayout({ children }: Readonly<{ children: ReactNode }>) {
  if (!(await hasValidSession())) redirect("/login");

  return (
    <SidebarProvider style={{ "--sidebar-width": "14.25rem", "--sidebar-width-icon": "4.5rem" } as CSSProperties}>
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        {children}
      </div>
    </SidebarProvider>
  );
}
