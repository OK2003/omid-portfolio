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
    title: "EDi - Drilling Engineering Application",
    organization: "Independent Project",
    startDate: "2025",
    description:
      "Designing and developing a competitive drilling engineering desktop application, including hydraulics and well planning modules.",
    highlights: [
      "Hydraulics module with multiple rheology models",
      "UI/UX redesign across multiple iterations",
      "Competitive positioning against industry tools",
    ],
  },
];

export function getExperiencesByType(type: Experience["type"]): Experience[] {
  return experiences.filter((experience) => experience.type === type);
}
