"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { BookOpen, Zap, Target } from "lucide-react";

const thoughts = [
  {
    title: "Gravity vs. Noise",
    type: "Insight",
    content: "Building systems that attract the right people (gravity) is 10x more effective than shouting to find anyone (noise).",
    icon: Target
  },
  {
    title: "Decision Logic Layer",
    type: "Framework",
    content: "Separate the intent from the execution. Let the agent handle the 'how', but the human defines the 'why' through rigid system constraints.",
    icon: Zap
  },
  {
    title: "Solo Builder System",
    type: "System Note",
    content: "The bottleneck of a solo builder is not code—it's decision fatigue. Automate the low-level choices to preserve high-level intuition.",
    icon: BookOpen
  }
];

export default function ThinkingPage() {
  return (
    <div className="container mx-auto px-6 py-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mb-16"
      >
        <h1 className="heading-display text-4xl md:text-5xl mb-6">Thinking</h1>
        <p className="text-subtle">
          Mini-insights and frameworks. Not routine, but high density.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {thoughts.map((thought, index) => (
          <GlassCard key={thought.title} delay={index * 0.1} className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <thought.icon className="w-5 h-5 text-primary" />
              <span className="text-[10px] uppercase tracking-widest text-white/30">{thought.type}</span>
            </div>
            <div>
              <h3 className="text-xl mb-3 font-medium">{thought.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed font-light">
                {thought.content}
              </p>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
