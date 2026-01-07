"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-20 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="heading-display text-4xl md:text-5xl mb-12">About</h1>
          
          <div className="space-y-8 text-lg md:text-xl text-white/80 font-light leading-relaxed">
            <p>
              I work on systems. 
              <br />
              Sometimes software. 
              <br />
              Sometimes markets. 
              <br />
              Sometimes just thinking clearly.
            </p>

            <p>
              I don’t move fast. 
              <br />
              I move deliberately.
            </p>

            <p className="text-white/40 text-base max-w-xl">
              Building for the long term requires a certain kind of restraint. In a world of noise, I choose to build gravity fields—nodes where logic and systems meet human intent.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <GlassCard delay={0.2} className="flex flex-col gap-4">
            <h3 className="text-sm uppercase tracking-widest text-white/30">Philosophy</h3>
            <p className="text-sm text-white/70 font-light">
              Aceh Subtle: Tenang, keras di dalam. Futuristic restraint in every interaction and every line of code.
            </p>
          </GlassCard>
          
          <GlassCard delay={0.3} className="flex flex-col gap-4">
            <h3 className="text-sm uppercase tracking-widest text-white/30">Interests</h3>
            <p className="text-sm text-white/70 font-light">
              Decision Logic, AI Agent Swarms, Quantitative FX Trading, and System Thinking.
            </p>
          </GlassCard>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-12 border-t border-white/5"
        >
          <Link 
            href="/resume-locked" 
            className="inline-flex items-center gap-4 px-6 py-3 glass rounded-2xl hover:bg-white/5 transition-all group"
          >
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-sm font-light">View Professional Path</span>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
