import type { Project } from "@/types/project";
import { CodeIcon, ExternalLinkIcon } from "@/components/ui/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STATUS_LABELS: Record<Project["status"], string> = {
  completed: "Completed",
  "in-progress": "In progress",
  planned: "Planned",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>{project.name}</CardTitle>
          <Badge>{STATUS_LABELS[project.status]}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="text-sm text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
        <div className="mt-auto flex gap-4 pt-2 text-sm">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" aria-label={`${project.name} GitHub repository`}>
              <CodeIcon className="h-4 w-4" />
              Code
            </a>
          )}
          {project.docsUrl && (
            <a href={project.docsUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" aria-label={`${project.name} documentation`}>
              <ExternalLinkIcon className="h-4 w-4" />
              Docs
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
