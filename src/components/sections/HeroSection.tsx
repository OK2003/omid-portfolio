"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/constants/site";
import { ROUTES } from "@/constants/routes";

export function HeroSection() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-3 py-16 text-center sm:px-4 sm:py-24">
      <div className="hero-reveal relative h-28 w-28 overflow-hidden rounded-full border-4 border-primary/20 shadow-lg sm:h-32 sm:w-32 md:h-40 md:w-40">
        <Image
          src="/images/profile.optimized.jpg"
          alt={SITE_CONFIG.name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 160px"
        />
      </div>

      <h1 className="hero-reveal text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl" style={{ animationDelay: "50ms" }}>
        {SITE_CONFIG.name}
      </h1>

      <div className="hero-reveal flex flex-wrap items-center justify-center gap-2" style={{ animationDelay: "100ms" }}>
        {SITE_CONFIG.roles.map((role) => (
          <Badge key={role}>{role}</Badge>
        ))}
      </div>

      <p className="hero-reveal max-w-xl text-sm text-muted-foreground md:text-base" style={{ animationDelay: "150ms" }}>
        {SITE_CONFIG.description}
      </p>

      <div className="hero-reveal flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center" style={{ animationDelay: "200ms" }}>
        <Button asChild className="w-full sm:w-auto">
          <Link href={ROUTES.projects}>View Projects</Link>
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href={ROUTES.resume}>Download Resume</Link>
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href={ROUTES.contact}>Contact Me</Link>
        </Button>
      </div>
    </section>
  );
}
