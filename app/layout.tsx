import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/shared/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

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
        <TooltipProvider>
          <SidebarProvider>
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex h-14 items-center border-b border-border px-4">
                <SidebarTrigger aria-label="Toggle navigation" />
              </div>
              {children}
            </div>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
