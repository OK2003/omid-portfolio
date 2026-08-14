"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/types/project";

export type ProjectFilter = ProjectCategory | "all";

export function useProjectFilter(projects: Project[]) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");

  const filteredProjects = useMemo<Project[]>(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [projects, activeFilter]);

  return { activeFilter, setActiveFilter, filteredProjects };
}
