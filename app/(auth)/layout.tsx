import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AuthLayout } from "@/components/shared/AuthLayout";
import { hasValidSession } from "@/lib/auth/session";

export default async function PublicAuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  if (await hasValidSession()) redirect("/");

  return <AuthLayout>{children}</AuthLayout>;
}
