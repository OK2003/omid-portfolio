import { experiences } from "@/data/experience";
import { skills } from "@/data/skills";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Resume",
  description: "Education, experience, and skills summary.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Resume</h1>
        <Button asChild>
          <a href="/resume.pdf" download>
            Download PDF
          </a>
        </Button>
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">
        Experience
      </h2>
      <div className="mt-4 flex flex-col gap-4">
        {experiences.map((experience) => (
          <div key={experience.id}>
            <p className="text-sm font-medium">{experience.title}</p>
            <p className="text-sm text-muted-foreground">
              {experience.organization} . {experience.startDate}
              {experience.endDate ? `-${experience.endDate}` : " - Present"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {experience.description}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Skills</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill.id}>{skill.name}</Badge>
        ))}
      </div>
    </section>
  );
}
