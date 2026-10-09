import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/shared/Header";
import { Sidebar } from "@/components/shared/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import { AppThemeProvider } from "@/components/providers/AppThemeProvider";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

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
    <html lang="en" dir="ltr" className={inter.variable} suppressHydrationWarning>
      <body>
        <AppThemeProvider>
          <ReactQueryProvider>
            <TooltipProvider>
              <SidebarProvider style={{ "--sidebar-width": "14.25rem", "--sidebar-width-icon": "4.5rem" } as CSSProperties}>
                <Sidebar />
                <div className="flex min-w-0 flex-1 flex-col">
                  <Header />
                  {children}
                </div>
              </SidebarProvider>
            </TooltipProvider>
          </ReactQueryProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
