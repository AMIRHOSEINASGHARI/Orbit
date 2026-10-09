import type { ComponentType, SVGProps } from "react";
import {
  ArchiveIcon,
  BellIcon,
  CalendarDaysIcon,
  ChartIcon,
  HomeIcon,
  NoteIcon,
  SettingsIcon,
  TasksIcon,
  TrashIcon,
  UsersIcon,
} from "@/components/icons";

export type NavigationItem = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  badge?: string;
  separatorBefore?: boolean;
};

export type NavigationGroup = {
  label: string;
  items: NavigationItem[];
};

export function isNavigationItemActive(pathname: string | null, href: string) {
  return pathname !== null && (pathname === href || pathname.startsWith(`${href}/`));
}

export const navigationGroups: NavigationGroup[] = [
  {
    label: "Workspace",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: HomeIcon },
      { label: "Tasks", href: "/tasks", icon: TasksIcon },
      { label: "Groups", href: "/groups", icon: UsersIcon },
      { label: "Notes", href: "/notes", icon: NoteIcon },
      { label: "Calendar", href: "/calendar", icon: CalendarDaysIcon },
      { label: "Archived", href: "/archive", icon: ArchiveIcon },
      { label: "Analytics", href: "/reports", icon: ChartIcon, separatorBefore: true },
      { label: "Notifications", href: "/notifications", icon: BellIcon, badge: "3" },
      { label: "Trash", href: "/trash", icon: TrashIcon },
      { label: "Settings", href: "/settings", icon: SettingsIcon },
    ],
  },
];
