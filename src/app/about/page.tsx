"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Lock, ArrowRight, Mail, Instagram, Github } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-6 py-20 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 sm:mb-16"
          >
            <h1 className="heading-display text-4xl sm:text-5xl mb-8 sm:mb-12">{t.about.title}</h1>
            
            <div className="space-y-6 sm:space-y-8 text-base sm:text-lg md:text-xl text-white/80 font-light leading-relaxed">
              <p>
                {t.about.description1}
                <br />
                {t.about.description1_sub}
              </p>

              <p>
                {t.about.description2}
                <br />
                {t.about.description2_sub}
              </p>

              <p className="text-white/40 text-sm sm:text-base max-w-xl">
                {t.about.description3}
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
            <GlassCard delay={0.2} className="flex flex-col gap-3 sm:gap-4">
              <h3 className="text-[10px] sm:text-xs uppercase tracking-widest text-white/30">{t.about.philosophy_title}</h3>
              <p className="text-sm text-white/70 font-light">
                {t.about.philosophy_desc}
              </p>
            </GlassCard>
            
            <GlassCard delay={0.3} className="flex flex-col gap-3 sm:gap-4">
              <h3 className="text-[10px] sm:text-xs uppercase tracking-widest text-white/30">{t.about.interests_title}</h3>
              <p className="text-sm text-white/70 font-light">
                {t.about.interests_desc}
              </p>
            </GlassCard>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-10 sm:pt-12 border-t border-white/5 flex flex-col md:flex-row gap-6 sm:gap-8 items-start md:items-center justify-between"
          >
            <Link 
              href="/resume-locked" 
              className="inline-flex items-center gap-3 sm:gap-4 px-5 sm:px-6 py-2.5 sm:py-3 glass rounded-2xl hover:bg-white/5 transition-all group w-full md:w-auto justify-center md:justify-start"
            >
              <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span className="text-xs sm:text-sm font-light">{t.about.view_path}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>

            <div className="flex gap-6 w-full md:w-auto justify-center md:justify-end">
              <a href="mailto:mulkymalikuldhr@mail.com" className="text-white/40 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/mulkymalikuldhr" target="_blank" className="text-white/40 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://github.com/mulkymalikuldhrs" target="_blank" className="text-white/40 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
    </div>
  );
}
