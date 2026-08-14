New-Item -ItemType Directory -Force -Path "src\components\forms","src\components\sections" | Out-Null

@'
import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

export function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
'@ | Set-Content -Path "src\components\forms\FormField.tsx" -Encoding utf8

@'
"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/forms/FormField";
import { useContactForm } from "@/hooks/useContactForm";

export function ContactForm() {
  const { formData, errors, isSubmitting, statusMessage, updateField, handleSubmit } =
    useContactForm();

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4" aria-label="Contact form">
      <FormField id="name" label="Name" error={errors.name}>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          autoComplete="name"
        />
      </FormField>

      <FormField id="email" label="Email" error={errors.email}>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          autoComplete="email"
        />
      </FormField>

      <FormField id="subject" label="Subject" error={errors.subject}>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={(e) => updateField("subject", e.target.value)}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
      </FormField>

      <FormField id="message" label="Message" error={errors.message}>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(e) => updateField("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          rows={5}
        />
      </FormField>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>

      {statusMessage && (
        <p role="status" className="text-sm text-muted-foreground">
          {statusMessage}
        </p>
      )}
    </form>
  );
}
'@ | Set-Content -Path "src\components\forms\ContactForm.tsx" -Encoding utf8

Write-Host "Form components done" -ForegroundColor Green

@'
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/constants/site";
import { ROUTES } from "@/constants/routes";

export function HeroSection() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-xs uppercase tracking-widest text-muted-foreground"
      >
        Portfolio
      </motion.p>

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
'@ | Set-Content -Path "src\components\sections\HeroSection.tsx" -Encoding utf8

@'
const INTERESTS = [
  "Drilling Engineering",
  "Well Hydraulics",
  "Reservoir Engineering",
  "Production Engineering",
  "Artificial Intelligence",
  "Engineering Software Development",
];

export function AboutSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <p className="mt-4 text-sm text-muted-foreground md:text-base">
        A petroleum engineering student combining domain expertise in drilling and well operations with software engineering and applied AI, building tools that bring modern UX and intelligent automation to engineering workflows.
      </p>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">
        Areas of interest
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {INTERESTS.map((interest) => (
          <li
            key={interest}
            className="rounded-lg border border-border px-4 py-3 text-sm"
          >
            {interest}
          </li>
        ))}
      </ul>
    </section>
  );
}
'@ | Set-Content -Path "src\components\sections\AboutSection.tsx" -Encoding utf8

@'
import { skills } from "@/data/skills";
import { SkillCard } from "@/components/cards/SkillCard";

export function SkillsSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h2 className="text-xl font-semibold tracking-tight">Skills</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </section>
  );
}
'@ | Set-Content -Path "src\components\sections\SkillsSection.tsx" -Encoding utf8

@'
import { experiences } from "@/data/experience";

export function TimelineSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h2 className="text-xl font-semibold tracking-tight">Timeline</h2>
      <ol className="mt-6 flex flex-col gap-6 border-l border-border pl-6">
        {experiences.map((experience) => (
          <li key={experience.id} className="relative">
            <span
              className="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full bg-primary"
              aria-hidden="true"
            />
            <p className="text-sm font-medium">{experience.title}</p>
            <p className="text-sm text-muted-foreground">
              {experience.organization} . {experience.startDate}
              {experience.endDate ? `-${experience.endDate}` : " - Present"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {experience.description}
            </p>
            {experience.highlights && (
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                {experience.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
'@ | Set-Content -Path "src\components\sections\TimelineSection.tsx" -Encoding utf8

@'
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getFeaturedProjects } from "@/lib/content/project-loader";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function FeaturedProjectsSection() {
  const featuredProjects = getFeaturedProjects();

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">
          Featured projects
        </h2>
        <Button asChild variant="ghost" size="sm">
          <Link href={ROUTES.projects}>View all</Link>
        </Button>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
        className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {featuredProjects.map((project) => (
          <motion.div key={project.slug} variants={itemVariants} transition={{ duration: 0.4, ease: "easeOut" }}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
'@ | Set-Content -Path "src\components\sections\FeaturedProjectsSection.tsx" -Encoding utf8

@'
"use client";

import type { Project, ProjectCategory } from "@/types/project";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Button } from "@/components/ui/button";
import { useProjectFilter } from "@/hooks/useProjectFilter";
import { cn } from "@/lib/utils";

const CATEGORIES: Array<ProjectCategory | "all"> = [
  "all",
  "Petroleum Engineering",
  "Software Development",
  "AI Systems",
  "Data Analysis",
];

export function ProjectsGridSection({ projects }: { projects: Project[] }) {
  const { activeFilter, setActiveFilter, filteredProjects } =
    useProjectFilter(projects);

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>

      <div
        role="group"
        aria-label="Filter projects by category"
        className="mt-6 flex flex-wrap gap-2"
      >
        {CATEGORIES.map((category) => (
          <Button
            key={category}
            variant={activeFilter === category ? "default" : "outline"}
            size="sm"
            aria-pressed={activeFilter === category}
            onClick={() => setActiveFilter(category)}
            className={cn(category === "all" && "capitalize")}
          >
            {category === "all" ? "All" : category}
          </Button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
'@ | Set-Content -Path "src\components\sections\ProjectsGridSection.tsx" -Encoding utf8

Write-Host "Section components done" -ForegroundColor Green
Write-Host "PART 5 COMPLETE - run setup-part6.ps1 next" -ForegroundColor Cyan