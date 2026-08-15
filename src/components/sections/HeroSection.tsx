"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/constants/site";
import { ROUTES } from "@/constants/routes";

export function HeroSection() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center">
      <div className="hero-reveal relative h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20 shadow-lg md:h-40 md:w-40">
        <Image
          src="/images/profile.optimized.jpg"
          alt={SITE_CONFIG.name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 128px, 160px"
        />
      </div>

      <h1 className="hero-reveal text-4xl font-semibold tracking-tight md:text-5xl" style={{ animationDelay: "50ms" }}>
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

      <div className="hero-reveal flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "200ms" }}>
        <Button asChild>
          <Link href={ROUTES.projects}>View Projects</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={ROUTES.resume}>Download Resume</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={ROUTES.contact}>Contact Me</Link>
        </Button>
      </div>
    </section>
  );
}
