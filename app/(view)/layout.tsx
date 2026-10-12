import type { CSSProperties, ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/shared/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/shared/Header";
import { getCurrentUser } from "@/lib/auth/current-user";
import { inspectAuthToken } from "@/lib/auth/jwt";
import { SESSION_COOKIE } from "@/lib/auth/session";

export default async function ViewLayout({ children }: Readonly<{ children: ReactNode }>) {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser();
  if (!user) {
    const status = token ? inspectAuthToken(token).status : "missing";
    redirect(status === "missing" ? "/login" : `/login?session=${status === "expired" ? "expired" : "invalid"}`);
  }
  const profile = {
    displayName: user.displayName || [user.firstName, user.lastName].filter(Boolean).join(" ") || user.username,
    username: user.username,
    avatarUrl: user.avatar?.url ?? null,
  };

  return (
    <SidebarProvider style={{ "--sidebar-width": "14.25rem", "--sidebar-width-icon": "4.5rem" } as CSSProperties}>
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header profile={profile} />
        {children}
      </div>
    </SidebarProvider>
  );
}
