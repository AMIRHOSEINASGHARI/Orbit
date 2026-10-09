"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? "Dark" : "Light";

  useEffect(() => setMounted(true), []);

  return (
    <Button
      type="button"
      variant="outline"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="h-8.5 gap-1.5 rounded-full border-border bg-table-header px-2 text-ui-label text-muted-foreground hover:bg-muted"
    >
      {isDark ? <MoonIcon className="size-3.5" /> : <SunIcon className="size-3.5" />}
      <span className="hidden sm:inline">{label}</span>
    </Button>
  );
}
