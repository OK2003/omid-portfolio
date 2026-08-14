export type ProjectCategory =
  | "Petroleum Engineering"
  | "Software Development"
  | "AI Systems"
  | "Data Analysis";

export type ProjectStatus = "completed" | "in-progress" | "planned";

export interface Project {
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  githubUrl?: string;
  docsUrl?: string;
  imageUrl?: string;
  featured: boolean;
}
