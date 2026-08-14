"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/constants/site";
import { ROUTES } from "@/constants/routes";

export function HeroSection() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20 shadow-lg md:h-40 md:w-40"
      >
        <Image
          src="/images/profile.jpg"
          alt={SITE_CONFIG.name}
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="text-4xl font-semibold tracking-tight md:text-5xl"
      >
        {SITE_CONFIG.name}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap items-center justify-center gap-2"
      >
        {SITE_CONFIG.roles.map((role) => (
          <Badge key={role}>{role}</Badge>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="max-w-xl text-sm text-muted-foreground md:text-base"
      >
        {SITE_CONFIG.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap items-center justify-center gap-3"
      >
        <Button asChild>
          <Link href={ROUTES.projects}>View Projects</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={ROUTES.resume}>Download Resume</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={ROUTES.contact}>Contact Me</Link>
        </Button>
      </motion.div>
    </section>
  );
}
