import { skills } from "@/data/skills";
import { SkillCard } from "@/components/cards/SkillCard";

export function SkillsSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h2 className="text-xl font-semibold tracking-tight">Skills</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </section>
  );
}
