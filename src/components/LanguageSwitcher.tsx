
"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 glass p-1 rounded-full border border-white/10">
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded-full text-sm transition-all duration-300 flex items-center gap-1.5 ${
          language === 'en' 
            ? 'bg-white/10 text-white shadow-lg' 
            : 'text-white/40 hover:text-white/70'
        }`}
        title="English"
      >
        <span>🇺🇸</span>
        <span className="hidden sm:inline font-medium">EN</span>
      </button>
      <button
        onClick={() => setLanguage('id')}
        className={`px-2 py-1 rounded-full text-sm transition-all duration-300 flex items-center gap-1.5 ${
          language === 'id' 
            ? 'bg-white/10 text-white shadow-lg' 
            : 'text-white/40 hover:text-white/70'
        }`}
        title="Bahasa Indonesia"
      >
        <span>🇮🇩</span>
        <span className="hidden sm:inline font-medium">ID</span>
      </button>
    </div>
  );
}
