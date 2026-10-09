import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/shared/Sidebar";

export const metadata: Metadata = {
  title: {
    default: "Orbit",
    template: "%s | Orbit",
  },
  description: "Organize your work and keep your projects moving with Orbit.",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <Sidebar />
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
