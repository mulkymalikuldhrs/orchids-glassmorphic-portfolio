"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";

const projects = [
  {
    title: "System Logic Explorer",
    description: "A framework for mapping complex decision paths in automated systems.",
    problem: "Non-linear decision trees often lead to unpredictable agent behavior.",
    whyInteresting: "Uses recursive logic nodes to ensure system stability.",
    status: "Active / Core System",
    category: "Live",
    githubUrl: "https://github.com/mulkymalikuldhrs"
  },
  {
    title: "FX Agent Pro",
    description: "Quantitative trading agent designed for the FX markets with a focus on risk management.",
    problem: "Market noise overwhelms standard technical indicators.",
    whyInteresting: "Implements proprietary decision logic to filter high-probability setups.",
    status: "WIP / Alpha Testing",
    category: "In Progress",
    githubUrl: "https://github.com/mulkymalikuldhrs"
  },
  {
    title: "Aceh Subtle Design",
    description: "A design system based on the philosophy of 'futuristic restraint' and cultural grounding.",
    problem: "Modern portfolios are becoming increasingly flashy and interchangeable.",
    whyInteresting: "Blends futuristic aesthetics with minimal, deliberate interactions.",
    status: "Conceptual / Prototype",
    category: "Conceptual",
    githubUrl: "https://github.com/mulkymalikuldhrs"
  }
];

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-6 py-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mb-12 sm:mb-16"
      >
        <h1 className="heading-display text-4xl sm:text-5xl mb-4 sm:mb-6">Projects</h1>
        <p className="text-subtle text-sm sm:text-base">
          Real work, honest status. Divided into active systems, ongoing builds, and conceptual research.
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
