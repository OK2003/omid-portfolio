import type { Experience } from "@/types/experience";

export const experiences: Experience[] = [
  {
    id: "exp-put",
    type: "education",
    title: "B.Sc. Petroleum Engineering",
    organization: "University of Technology of Iran (PUT)",
    location: "Iran",
    startDate: "2022",
    endDate: "2026",
    description:
      "B.Sc. in petroleum engineering with focus on drilling and well operations. Graduated in 2026.",
  },
  {
    id: "exp-edi",
    type: "project",
    title: "EDi — Engineering Drilling Innovation",
    organization: "Independent Project",
    startDate: "2025",
    description:
      "Developing EDi (Engineering Drilling Innovation), a professional platform for hydraulics, well engineering and control, planning, operations, utilities, AI advisory, and reporting. Designed as a fast, readable industrial workstation with modular workflows, traceable results, testable calculations, offline capability, and project-based organization.",
    highlights: [
      "In development: modular workflows for hydraulics, well engineering and control, planning, and operations",
      "Development goals: traceable results, testable calculations, and a fast, readable industrial workstation",
      "Planned capabilities: utilities, AI advisory, reporting, offline use, and project-based organization",
    ],
  },
];

export function getExperiencesByType(type: Experience["type"]): Experience[] {
  return experiences.filter((experience) => experience.type === type);
}
