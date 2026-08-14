import type { Skill } from "@/types/skill";

export const skills: Skill[] = [
  { id: "skill-hydraulics", name: "Well Hydraulics", domain: "Well Hydraulics", proficiency: 85 },
  { id: "skill-drilling", name: "Drilling Engineering", domain: "Drilling Engineering", proficiency: 85 },
  { id: "skill-production", name: "Production Engineering", domain: "Production Engineering", proficiency: 60 },
  { id: "skill-nextjs", name: "Next.js / TypeScript", domain: "Software Development", proficiency: 80 },
  { id: "skill-python", name: "Python", domain: "Software Development", proficiency: 75 },
  { id: "skill-ai", name: "AI Systems Design", domain: "AI Engineering", proficiency: 70 },
];

export function getSkillsByDomain(domain: Skill["domain"]): Skill[] {
  return skills.filter((skill) => skill.domain === domain);
}
