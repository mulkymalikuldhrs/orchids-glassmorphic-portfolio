"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { useLanguage } from "@/hooks/useLanguage";

export default function ProjectsPage() {
  const { t } = useLanguage();
  const projects = t.projects.items.map(item => ({
    ...item,
    githubUrl: "https://github.com/mulkymalikuldhrs"
  }));

  return (
    <div className="container mx-auto px-6 py-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mb-12 sm:mb-16"
      >
        <h1 className="heading-display text-4xl sm:text-5xl mb-4 sm:mb-6">{t.projects.title}</h1>
        <p className="text-subtle text-sm sm:text-base">
          {t.projects.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            {...(project as any)}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
}
