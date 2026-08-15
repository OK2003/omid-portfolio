import Link from "next/link";
import { SITE_CONFIG } from "@/constants/site";
import { NavLinks } from "@/components/navigation/NavLinks";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-2 px-3 sm:h-16 sm:px-4">
        <Link
          href="/"
          className="min-w-0 max-w-[calc(100vw-7.5rem)] truncate text-sm font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm sm:max-w-none"
        >
          {SITE_CONFIG.name}
        </Link>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:gap-4">
          <NavLinks />
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
