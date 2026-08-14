import { projects as projectData } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types/project";

export function getAllProjects(): Project[] {
  return projectData;
}

export function getFeaturedProjects(): Project[] {
  return projectData.filter((project) => project.featured);
}

export function getProjectsByCategory(
  category: ProjectCategory | "all"
): Project[] {
  if (category === "all") return projectData;
  return projectData.filter((project) => project.category === category);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projectData.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projectData.map((project) => project.slug);
}
