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
            className={cn(
              "min-w-0 flex-1 whitespace-normal sm:flex-none",
              category === "all" && "capitalize"
            )}
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
