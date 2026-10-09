import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { BellIcon, PlusIcon, SearchIcon } from "@/components/icons";
import { AppLogo } from "@/components/shared/AppLogo";
import { MobileNavigation } from "@/components/shared/MobileNavigation";
import { LogoutForm } from "@/features/auth/components/logout-form";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

type HeaderProps = {
  actions?: ReactNode;
  account?: ReactNode;
  onAddTask?: MouseEventHandler<HTMLButtonElement>;
};

function ProfileLink() {
  return (
    <Link
      href="/settings/profile"
      aria-label="Maya Chen, Product lead. Open profile"
      className="inline-flex shrink-0 items-center gap-[9px] px-[7px]"
    >
      <Avatar className="size-8">
        <AvatarImage src="/figma/maya-chen.png" alt="Maya Chen" />
        <AvatarFallback>MC</AvatarFallback>
      </Avatar>
      <span className="hidden flex-col gap-px lg:flex">
        <span className="text-ui-small font-semibold leading-none text-foreground">
          Maya Chen
        </span>
        <span className="text-ui-caption leading-none text-subtle-foreground">
          Product lead
        </span>
      </span>
    </Link>
  );
}

export function Header({ actions, account, onAddTask }: HeaderProps) {
  return (
    <header className="flex h-header items-center justify-between gap-2 border-b border-border bg-card px-3 md:px-7">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <MobileNavigation />
        <AppLogo
          href="/dashboard"
          size="sm"
          className="hidden sm:inline-flex md:hidden"
        />
        <InputGroup className="h-[38px] min-w-0 flex-1 gap-2 rounded-lg bg-card px-3 lg:flex-none lg:w-header-search">
          <InputGroupAddon className="shrink-0 gap-0 p-0 text-muted-foreground">
            <SearchIcon className="size-[15px]" />
          </InputGroupAddon>
          <InputGroupInput
            aria-label="Search anything"
            placeholder="Search anything…"
            className="h-full min-w-0 px-0 text-ui-label"
          />
        </InputGroup>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <nav aria-label="Global actions" className="flex items-center">
          <Link
            href="/notifications"
            aria-label="Notifications, 3 unread"
            className="relative inline-flex size-8.5 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <BellIcon className="size-4" />
            <span
              aria-hidden="true"
              className="absolute top-[3px] right-[5px] size-[7px] rounded-full bg-danger-foreground ring-2 ring-card"
            />
          </Link>
        </nav>
        <ThemeToggle />
        {account ?? <ProfileLink />}
        <LogoutForm />
        {actions}
        <Button
          type="button"
          aria-label="Add task"
          onClick={onAddTask}
          className="hidden size-9 rounded-lg border-0 p-0 sm:inline-flex sm:size-[38px] sm:px-3.5 lg:w-auto lg:gap-[7px] lg:text-sm"
        >
          <PlusIcon className="size-4" />
          <span className="hidden lg:inline">Add task</span>
        </Button>
      </div>
    </header>
  );
}
