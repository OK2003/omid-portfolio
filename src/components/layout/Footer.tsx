import { SITE_CONFIG } from "@/constants/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 py-8 text-center text-sm text-muted-foreground md:flex-row md:justify-between">
        <p>
          (c) {year} {SITE_CONFIG.name}. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            href={SITE_CONFIG.links.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
          >
            Instagram
          </a>
          <a
            href={SITE_CONFIG.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
          >
            LinkedIn
          </a>
          <a
            href={SITE_CONFIG.links.telegram}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
          >
            Telegram
          </a>
        </div>
      </div>
    </footer>
  );
}
