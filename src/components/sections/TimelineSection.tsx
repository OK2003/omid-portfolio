import { experiences } from "@/data/experience";

export function TimelineSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h2 className="text-xl font-semibold tracking-tight">Timeline</h2>
      <ol className="mt-6 flex flex-col gap-6 border-l border-border pl-6">
        {experiences.map((experience) => (
          <li key={experience.id} className="relative">
            <span
              className="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full bg-primary"
              aria-hidden="true"
            />
            <p className="text-sm font-medium">{experience.title}</p>
            <p className="text-sm text-muted-foreground">
              {experience.organization} . {experience.startDate}
              {experience.endDate ? `-${experience.endDate}` : " - Present"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {experience.description}
            </p>
            {experience.highlights && (
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                {experience.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
