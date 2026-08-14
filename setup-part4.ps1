New-Item -ItemType Directory -Force -Path "src\components\navigation","src\components\layout","src\components\cards","src\components\common" | Out-Null

@'
"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </Button>
  );
}
'@ | Set-Content -Path "src\components\navigation\ThemeToggle.tsx" -Encoding utf8

@'
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/constants/routes";
import { cn } from "@/lib/utils";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "text-sm font-medium transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm",
              isActive ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
'@ | Set-Content -Path "src\components\navigation\NavLinks.tsx" -Encoding utf8

@'
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/constants/routes";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </Button>

      {isOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="absolute left-0 right-0 top-16 z-50 flex flex-col gap-1 border-b border-border bg-background p-4"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
'@ | Set-Content -Path "src\components\navigation\MobileMenu.tsx" -Encoding utf8

Write-Host "Navigation components done" -ForegroundColor Green

@'
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
'@ | Set-Content -Path "src\components\layout\Header.tsx" -Encoding utf8

@'
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
            href={SITE_CONFIG.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
          >
            GitHub
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
'@ | Set-Content -Path "src\components\layout\Footer.tsx" -Encoding utf8

@'
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
'@ | Set-Content -Path "src\components\layout\PageTransition.tsx" -Encoding utf8

Write-Host "Layout components done" -ForegroundColor Green

@'
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types/project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STATUS_LABELS: Record<Project["status"], string> = {
  completed: "Completed",
  "in-progress": "In progress",
  planned: "Planned",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>{project.name}</CardTitle>
          <Badge>{STATUS_LABELS[project.status]}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="text-sm text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
        <div className="mt-auto flex gap-4 pt-2 text-sm">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              aria-label={`${project.name} GitHub repository`}
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              Code
            </a>
          )}
          {project.docsUrl && (
            <a
              href={project.docsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              aria-label={`${project.name} documentation`}
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Docs
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
'@ | Set-Content -Path "src\components\cards\ProjectCard.tsx" -Encoding utf8

@'
import Link from "next/link";
import type { Article } from "@/types/article";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
    >
      <Card className="h-full transition-colors hover:border-foreground/20">
        <CardHeader>
          <CardTitle>{article.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">{article.excerpt}</p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge>{article.category}</Badge>
            <span>{formatDate(article.publishedAt)}</span>
            <span aria-hidden="true">.</span>
            <span>{article.readingTimeMinutes} min read</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
'@ | Set-Content -Path "src\components\cards\ArticleCard.tsx" -Encoding utf8

@'
import type { Skill } from "@/types/skill";

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{skill.name}</span>
        <span
          className="text-muted-foreground"
          aria-label={`Proficiency ${skill.proficiency} out of 100`}
        >
          {skill.proficiency}%
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={skill.proficiency}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={skill.name}
        className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${skill.proficiency}%` }}
        />
      </div>
    </div>
  );
}
'@ | Set-Content -Path "src\components\cards\SkillCard.tsx" -Encoding utf8

Write-Host "Card components done" -ForegroundColor Green

@'
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import type { ImageMetadata } from "@/types/image";

interface OptimizedImageProps
  extends Omit<ImageProps, "src" | "alt" | "width" | "height"> {
  image: ImageMetadata;
  className?: string;
}

const FALLBACK_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMxNzFkMjkiLz48L3N2Zz4=";

export function OptimizedImage({
  image,
  className,
  priority = false,
  sizes,
  ...rest
}: OptimizedImageProps) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      placeholder="blur"
      blurDataURL={image.blurDataUrl ?? FALLBACK_BLUR_DATA_URL}
      priority={priority}
      sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
      className={cn("object-cover", className)}
      {...rest}
    />
  );
}

export function AvatarImage({
  image,
  size = 96,
  className,
}: {
  image: ImageMetadata;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={size}
      height={size}
      placeholder="blur"
      blurDataURL={image.blurDataUrl ?? FALLBACK_BLUR_DATA_URL}
      priority
      className={cn("rounded-full object-cover", className)}
    />
  );
}
'@ | Set-Content -Path "src\components\common\optimized-image.tsx" -Encoding utf8

Write-Host "Common components done" -ForegroundColor Green
Write-Host "PART 4 COMPLETE - run setup-part5.ps1 next" -ForegroundColor Cyan