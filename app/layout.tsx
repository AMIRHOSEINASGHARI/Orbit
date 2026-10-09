import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
