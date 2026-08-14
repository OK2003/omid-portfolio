import { getAllProjects } from "@/lib/content/project-loader";
import { ProjectsGridSection } from "@/components/sections/ProjectsGridSection";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "Software and petroleum engineering projects, including the EDi drilling engineering application.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <ProjectsGridSection projects={getAllProjects()} />;
}
