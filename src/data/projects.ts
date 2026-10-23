import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "edi-drilling-engineering",
    name: "EDi — Engineering Drilling Innovation",
    description:
      "A drilling engineering platform in development, bringing hydraulics, well engineering, planning, and operations into one modular workspace.",
    longDescription:
      "Developing EDi (Engineering Drilling Innovation), a professional platform for hydraulics, well engineering and control, planning, operations, utilities, AI advisory, and reporting. Designed as a fast, readable industrial workstation with modular workflows, traceable results, testable calculations, offline capability, and project-based organization.",
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
