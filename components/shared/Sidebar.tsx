"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronsUpDownIcon,
  HardDriveIcon,
  OrbitIcon,
  PanelLeftOpenIcon,
} from "@/components/icons";
import {
  isNavigationItemActive,
  navigationGroups,
} from "@/components/shared/sidebar-navigation";
import {
  Sidebar as UiSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NavigationLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="space-y-6">
      {navigationGroups.map((group) => (
        <div key={group.label}>
          <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {group.label}
          </h2>
          <ul className="space-y-1">
            {group.items.map(({ badge, href, icon: Icon, label, separatorBefore }) => {
              const active = isNavigationItemActive(pathname, href);
              return (
                <li
                  key={href}
                  className={cn(
                    separatorBefore && "mt-2 border-t border-border pt-2",
                  )}
                >
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring",
                      active && "bg-primary-tint font-medium text-primary",
                    )}
                  >
                    <Icon className="size-4" />
                    {label}
                    {badge && (
                      <span className="ml-auto rounded-full bg-danger px-2 py-0.5 text-ui-caption font-bold text-danger-foreground">
                        {badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { setOpenMobile, toggleSidebar } = useSidebar();

  // shortcut: labels, unread count, and storage usage mirror the Figma sample until live workspace data is wired.
  return (
    <UiSidebar collapsible="icon">
      <SidebarHeader className="gap-6 px-4 pt-5.5 pb-0 group-data-[collapsible=icon]:px-3.5">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            aria-label="Orbit home"
            className="flex items-center gap-2 px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
          >
            <OrbitIcon className="size-8.5 shrink-0" />
            <span className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
              <span className="text-ui-section font-bold leading-tight text-foreground">
                Orbit
              </span>
              <span className="text-ui-caption font-medium leading-tight text-subtle-foreground">
                WORKSPACE
              </span>
            </span>
          </Link>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Collapse sidebar"
            onClick={toggleSidebar}
            className="shrink-0 group-data-[collapsible=icon]:hidden"
          >
            <PanelLeftOpenIcon className="size-4.5 rotate-180" />
          </Button>
        </div>
        <div
          role="group"
          aria-label="Current workspace"
          className="flex h-10.5 w-full items-center gap-2.25 overflow-hidden rounded-card border border-border bg-table-header px-2.5 group-data-[collapsible=icon]:w-10.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-1 group-data-[collapsible=icon]:px-0"
        >
          <div
            aria-hidden="true"
            className="flex size-6 shrink-0 items-center justify-center rounded-[7px] bg-primary-tint text-ui-label font-bold text-primary group-data-[collapsible=icon]:size-6"
          >
            {" "}
            <span className="hidden group-data-[collapsible=icon]:inline">
              N
            </span>
          </div>
          <span className="min-w-0 flex-1 truncate text-xs font-semibold text-foreground group-data-[collapsible=icon]:hidden">
            Northstar Studio
          </span>
          <ChevronsUpDownIcon className="hidden size-2 shrink-0 text-subtle-foreground group-data-[collapsible=icon]:block" />
        </div>
      </SidebarHeader>
      <SidebarContent className="pt-6 group-data-[collapsible=icon]:pt-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Expand sidebar"
          onClick={toggleSidebar}
          className="mx-auto mb-3 hidden shrink-0 border-border bg-table-header group-data-[collapsible=icon]:inline-flex"
        >
          <PanelLeftOpenIcon className="size-4.5" />
        </Button>
        {navigationGroups.map((group) => (
          <SidebarGroup
            key={group.label}
            className="px-4 py-0 group-data-[collapsible=icon]:px-3.5"
          >
            <SidebarGroupLabel className="h-5 px-2.5 pb-1 text-ui-caption font-semibold uppercase tracking-wide text-subtle-foreground">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1.25">
                {group.items.map(({ badge, href, icon: Icon, label, separatorBefore }) => {
                  const active = isNavigationItemActive(pathname, href);

                  return (
                    <SidebarMenuItem
                      key={href}
                      className={cn(
                        separatorBefore && "mt-2 border-t border-border pt-2",
                      )}
                    >
                      <SidebarMenuButton
                        render={
                          <Link
                            href={href}
                            aria-label={label}
                            aria-current={active ? "page" : undefined}
                            onClick={() => setOpenMobile(false)}
                          />
                        }
                        isActive={active}
                        tooltip={label}
                        className="h-10 rounded-lg px-2.5 text-muted-foreground data-active:bg-primary-tint data-active:font-semibold data-active:text-primary group-data-[collapsible=icon]:h-10! group-data-[collapsible=icon]:w-11! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0!"
                      >
                        <Icon className="size-4.25" />
                        <span className="group-data-[collapsible=icon]:hidden">
                          {label}
                        </span>
                      </SidebarMenuButton>
                      {badge && (
                        <SidebarMenuBadge className="top-1/2 right-2 h-5 min-w-5.5 -translate-y-1/2 rounded-full bg-danger px-1 text-ui-caption font-bold text-danger-foreground peer-data-active/menu-button:text-danger-foreground group-data-[collapsible=icon]:top-0 group-data-[collapsible=icon]:right-0 group-data-[collapsible=icon]:h-4 group-data-[collapsible=icon]:min-w-4 group-data-[collapsible=icon]:translate-y-0 group-data-[collapsible=icon]:rounded-full group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:flex">
                          {badge}
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="gap-2 p-4 pt-0 group-data-[collapsible=icon]:items-center">
        <div className="w-full space-y-2 rounded-card bg-table-header p-3 group-data-[collapsible=icon]:hidden">
          <div className="flex items-center justify-between text-ui-label">
            <span className="font-semibold text-muted-foreground">Storage</span>
            <span className="text-subtle-foreground">6.8 / 10 GB</span>
          </div>
          <div
            role="progressbar"
            aria-label="Storage used"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={68}
            className="h-1.25 overflow-hidden rounded-full bg-border"
          >
            <div className="h-full w-[68%] rounded-full bg-primary" />
          </div>
        </div>
        <div className="hidden w-10 flex-col items-center gap-2 pt-5 group-data-[collapsible=icon]:flex">
          <HardDriveIcon className="size-4 text-subtle-foreground" />
          <div
            role="progressbar"
            aria-label="Storage used"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={68}
            className="h-1 w-8 overflow-hidden rounded-full bg-border"
          >
            <div className="h-full w-[68%] rounded-full bg-primary" />
          </div>
        </div>
      </SidebarFooter>
    </UiSidebar>
  );
}
