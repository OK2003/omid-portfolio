export type SkillDomain =
  | "Drilling Engineering"
  | "Well Hydraulics"
  | "Reservoir Engineering"
  | "Production Engineering"
  | "AI Engineering"
  | "Software Development";

export interface Skill {
  id: string;
  name: string;
  domain: SkillDomain;
  proficiency: number;
  icon?: string;
}
