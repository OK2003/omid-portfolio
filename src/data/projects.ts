import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "edi-drilling-engineering",
    name: "EDi",
    description:
      "Desktop drilling engineering application with hydraulics, rheology, and well planning modules.",
    longDescription:
      "EDi is a drilling engineering desktop application designed to compete with industry-standard tools. It provides hydraulics calculations across multiple rheology models, circulating pressure analysis, and well planning utilities for petroleum engineers.",
    technologies: ["Python", "Hydraulics Modeling", "Data Analysis"],
    category: "Petroleum Engineering",
    status: "in-progress",
    featured: true,
  },
  {
    slug: "hydraulics-ai-assistant",
    name: "Hydraulics AI Assistant",
    description:
      "AI-assisted tool for hydraulics calculations, rheology model selection, and well control guidance.",
    technologies: ["Python", "LLM Integration"],
    category: "AI Systems",
    status: "planned",
    featured: false,
  },
];
