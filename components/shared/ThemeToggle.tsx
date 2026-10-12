"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

type ThemeToggleTypes = {
  text?: boolean;
};

export function ThemeToggle({ text = true }: ThemeToggleTypes) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? "Dark" : "Light";

  useEffect(() => setMounted(true), []);

  return (
    <Button
      type="button"
      variant="outline"
      size={text ? "default" : "icon"}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <MoonIcon className="size-3.5" />
      ) : (
        <SunIcon className="size-3.5" />
      )}
      {text && <span className="hidden sm:inline">{label}</span>}
    </Button>
  );
}
