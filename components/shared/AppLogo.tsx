import Link from "next/link";
import { OrbitIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type AppLogoProps = {
  href?: string;
  size?: "sm" | "md" | "lg";
  tone?: "primary" | "inverse" | "current";
  className?: string;
};

const sizes = {
  sm: "text-base [&>svg]:size-6",
  md: "text-lg [&>svg]:size-8",
  lg: "text-2xl [&>svg]:size-10",
};

const tones = {
  primary: "text-primary",
  inverse: "text-primary-foreground",
  current: "text-current",
};

export function AppLogo({ href = "/", size = "md", tone = "primary", className }: AppLogoProps) {
  return (
    <Link href={href} aria-label="Orbit home" className={cn("inline-flex items-center gap-2 font-semibold", sizes[size], tones[tone], className)}>
      <OrbitIcon />
      <span>Orbit</span>
    </Link>
  );
}
