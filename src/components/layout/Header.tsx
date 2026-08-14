import Link from "next/link";
import { SITE_CONFIG } from "@/constants/site";
import { NavLinks } from "@/components/navigation/NavLinks";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
        >
          {SITE_CONFIG.name}
        </Link>
        <div className="flex items-center gap-4">
          <NavLinks />
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
