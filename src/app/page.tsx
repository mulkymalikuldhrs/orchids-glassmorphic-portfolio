"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { ArrowRight, Github, Instagram, Mail } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-6 text-center">
      {/* Hero Visual Element */}
      <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
        <motion.div
          animate={{
            rotate: 360,
            borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 70%", "60% 40% 30% 70% / 50% 60% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 70%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 border border-white/10 bg-gradient-to-br from-primary/10 to-transparent blur-sm"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-32 h-32 rounded-full bg-primary/20 blur-2xl"
        />
        <div className="relative z-10 glass-dark w-24 h-24 rounded-full flex items-center justify-center border border-white/10">
          <div className="w-12 h-12 rounded-full border border-white/20 animate-slow-spin" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="max-w-3xl"
      >
        <h1 className="heading-display text-5xl md:text-7xl mb-6">
          Mulky Malikul Dhaher
        </h1>
        <p className="text-xl md:text-2xl text-subtle mb-12 max-w-2xl mx-auto leading-relaxed">
          Building systems, not noise.
        </p>

        <div className="flex flex-col gap-4 items-center mb-16">
          <p className="text-white/40 text-sm tracking-[0.2em] uppercase">
            Beginner in FX Markets · AI Agent Enthusiasm · Decision Logic
          </p>
          <p className="text-white/60 font-light italic">
            Solo. Deliberate. Long-term.
          </p>
        </div>

          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/ai" className="group flex items-center gap-2 px-8 py-4 glass rounded-full hover:bg-white/10 transition-all duration-500">
              <span className="font-light">Talk to Mulky (AI)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-4">
              <a href="https://github.com/mulkymalikuldhrs" target="_blank" className="p-4 glass rounded-full hover:bg-white/10 transition-all duration-500" title="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/mulkymalikuldhr" target="_blank" className="p-4 glass rounded-full hover:bg-white/10 transition-all duration-500" title="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="mailto:mulkymalikuldhr@mail.com" className="p-4 glass rounded-full hover:bg-white/10 transition-all duration-500" title="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
      </motion.div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </div>
  );
}
