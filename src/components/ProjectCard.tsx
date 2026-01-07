"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Layers } from "lucide-react";
import { GlassCard } from "./GlassCard";

interface ProjectProps {
  title: string;
  description: string;
  problem: string;
  whyInteresting: string;
  status: string;
  githubUrl?: string;
  category: "Live" | "In Progress" | "Conceptual";
  delay?: number;
}

export function ProjectCard({ 
  title, 
  description, 
  problem, 
  whyInteresting, 
  status, 
  githubUrl, 
  category,
  delay = 0 
}: ProjectProps) {
  return (
    <GlassCard delay={delay} className="group relative flex flex-col h-full border-white/5 hover:border-white/10 transition-colors">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 glass-dark rounded-2xl">
          <Layers className="w-5 h-5 text-primary" />
        </div>
        <div className="px-3 py-1 rounded-full bg-white/5 text-[10px] uppercase tracking-widest text-white/40 border border-white/5">
          {category}
        </div>
      </div>

      <h3 className="heading-display text-2xl mb-4">{title}</h3>
      <p className="text-sm text-subtle mb-6 leading-relaxed flex-grow">
        {description}
      </p>

      <div className="space-y-4 mb-8">
        <div>
          <h4 className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Problem</h4>
          <p className="text-sm text-white/60 font-light">{problem}</p>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Why Interesting</h4>
          <p className="text-sm text-white/60 font-light">{whyInteresting}</p>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Status</h4>
          <p className="text-sm text-white/60 font-light italic">{status}</p>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-white/5 flex gap-4">
        {githubUrl && (
          <a 
            href={githubUrl} 
            target="_blank" 
            className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        )}
      </div>
    </GlassCard>
  );
}
