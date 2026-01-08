"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { ArrowRight, Github, Instagram, Mail, User } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { AIPet } from "@/components/AIPet";
import { CreatorPopup } from "@/components/CreatorPopup";

export default function Home() {
  const { t } = useLanguage();
  const { playClick, playHover } = useSoundEffects();
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">
      <CreatorPopup isOpen={isCreatorOpen} onClose={() => setIsCreatorOpen(false)} />

      {/* Hero Visual Element - Upgraded AI Robot */}
      <AIPet isHero />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1] 
        }}
        className="max-w-3xl"
      >
        <button 
          onClick={() => { playClick(); setIsCreatorOpen(true); }}
          onMouseEnter={playHover}
          className="group"
        >
          <h1 className="heading-display text-4xl sm:text-5xl md:text-7xl mb-4 sm:mb-6 leading-tight transition-colors group-hover:text-white/80">
            Mulky Malikul Dhaher
          </h1>
        </button>
        <p className="text-lg sm:text-xl md:text-2xl text-subtle mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
          {t.home.hero_sub}
        </p>

        <div className="flex flex-col gap-3 sm:gap-4 items-center mb-12 sm:mb-16">
          <p className="text-white/40 text-[10px] sm:text-sm tracking-[0.2em] uppercase px-4">
            {t.home.skills}
          </p>
          <p className="text-white/60 text-sm sm:text-base font-light italic">
            {t.home.philosophy}
          </p>
          <button
            onClick={() => { playClick(); setIsCreatorOpen(true); }}
            className="mt-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white/60 transition-colors"
          >
            <User className="w-3 h-3" />
            <span>Meet the Creator</span>
          </button>
        </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link 
              href="/ai" 
              onClick={playClick}
              onMouseEnter={playHover}
              className="group flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 glass-vision rounded-full hover:bg-white/10 transition-all duration-500 text-sm sm:text-base shadow-xl"
            >
              <span className="font-medium">{t.home.cta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-3 sm:gap-4">
              <a 
                href="https://github.com/mulkymalikuldhrs" 
                target="_blank" 
                onClick={playClick}
                onMouseEnter={playHover}
                className="p-3 sm:p-4 glass-vision rounded-full hover:bg-white/10 transition-all duration-500 shadow-lg" 
                title="GitHub"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="https://instagram.com/mulkymalikuldhr" 
                target="_blank" 
                onClick={playClick}
                onMouseEnter={playHover}
                className="p-3 sm:p-4 glass-vision rounded-full hover:bg-white/10 transition-all duration-500 shadow-lg" 
                title="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="mailto:mulkymalikuldhr@mail.com" 
                onClick={playClick}
                onMouseEnter={playHover}
                className="p-3 sm:p-4 glass-vision rounded-full hover:bg-white/10 transition-all duration-500 shadow-lg" 
                title="Email"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
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
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent animate-float" />
      </motion.div>
    </div>
  );
}
