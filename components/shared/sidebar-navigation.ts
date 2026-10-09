import type { ComponentType, SVGProps } from "react";
import {
  ArchiveIcon,
  BellIcon,
  CalendarDaysIcon,
  ChartIcon,
  FilterIcon,
  HomeIcon,
  NoteIcon,
  SearchIcon,
  SettingsIcon,
  TasksIcon,
  TrashIcon,
  UsersIcon,
} from "@/components/icons";

export type NavigationItem = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export type NavigationGroup = {
  label: string;
  items: NavigationItem[];
};

export const navigationGroups: NavigationGroup[] = [
  {
    label: "Workspace",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: HomeIcon },
      { label: "Tasks", href: "/tasks", icon: TasksIcon },
      { label: "Task Groups", href: "/groups", icon: UsersIcon },
      { label: "Notes", href: "/notes", icon: NoteIcon },
      { label: "Calendar", href: "/calendar", icon: CalendarDaysIcon },
      { label: "Smart Lists", href: "/smart-lists", icon: FilterIcon },
      { label: "Archive", href: "/archive", icon: ArchiveIcon },
    ],
  },
  {
    label: "Explore",
    items: [
      { label: "Search", href: "/search", icon: SearchIcon },
      { label: "Workspaces", href: "/workspaces", icon: UsersIcon },
      { label: "Reports", href: "/reports", icon: ChartIcon },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Notifications", href: "/notifications", icon: BellIcon },
      { label: "Trash", href: "/trash", icon: TrashIcon },
      { label: "Settings", href: "/settings", icon: SettingsIcon },
    ],
  },
];
