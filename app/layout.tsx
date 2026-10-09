import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import { AppThemeProvider } from "@/components/providers/AppThemeProvider";
import { Toaster } from "@/components/ui/sonner";

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
              {children}
              <Toaster />
            </TooltipProvider>
          </ReactQueryProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
