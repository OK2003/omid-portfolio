import Link from "next/link";
import { getFeaturedProjects } from "@/lib/content/project-loader";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export function FeaturedProjectsSection() {
  const featuredProjects = getFeaturedProjects();

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Featured projects</h2>
        <Button asChild variant="ghost" size="sm">
          <Link href={ROUTES.projects}>View all</Link>
        </Button>
      </div>
      <div className="project-grid-reveal mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <div key={project.slug} className="project-card-reveal">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
