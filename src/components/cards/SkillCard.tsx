import type { Skill } from "@/types/skill";

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{skill.name}</span>
        <span
          className="text-muted-foreground"
          aria-label={`Proficiency ${skill.proficiency} out of 100`}
        >
          {skill.proficiency}%
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={skill.proficiency}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={skill.name}
        className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${skill.proficiency}%` }}
        />
      </div>
    </div>
  );
}
