"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getFeaturedProjects } from "@/lib/content/project-loader";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function FeaturedProjectsSection() {
  const featuredProjects = getFeaturedProjects();

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">
          Featured projects
        </h2>
        <Button asChild variant="ghost" size="sm">
          <Link href={ROUTES.projects}>View all</Link>
        </Button>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
        className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {featuredProjects.map((project) => (
          <motion.div key={project.slug} variants={itemVariants} transition={{ duration: 0.4, ease: "easeOut" }}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
