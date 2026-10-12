import Link from "next/link";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@/components/icons";
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
  profile: { displayName: string; avatarUrl: string | null };
};

function ProfileLink({ profile }: { profile: HeaderProps["profile"] }) {
  const initials = profile.displayName
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Button
      variant="ghost"
      size="lg"
      className="shrink-0 rounded-full"
      render={
        <Link
          href="/settings/profile"
          aria-label={`${profile.displayName}. Open profile`}
        />
      }
    >
      <Avatar className="size-7">
        {profile.avatarUrl && (
          <AvatarImage src={profile.avatarUrl} alt={profile.displayName} />
        )}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <ChevronDownIcon aria-hidden="true" className="size-3.5" />
    </Button>
  );
}

export function Header({ profile }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-header shrink-0 items-center justify-between gap-2 border-b border-border bg-card px-3 md:px-7">
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
          <Button
            variant="outline"
            size="icon"
            render={
              <Link
                href="/notifications"
                aria-label="Notifications, 3 unread"
                className="relative"
              />
            }
          >
            <BellIcon className="size-4" />
            <span
              aria-hidden="true"
              className="absolute top-[3px] right-[5px] size-[7px] rounded-full bg-danger-foreground ring-2 ring-card"
            />
          </Button>
        </nav>
        <ThemeToggle text={false} />
        <LogoutForm />
        <ProfileLink profile={profile} />
      </div>
    </header>
  );
}
