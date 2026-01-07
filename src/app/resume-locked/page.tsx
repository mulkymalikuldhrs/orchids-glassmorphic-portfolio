"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, MessageCircle, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";

export default function ResumeLockedPage() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleUnlock = () => {
    if (password === "mulkymalikuldhr") {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Halo Mulky, saya ingin meminta akses untuk melihat Curriculum Vitae Anda.");
    window.open(`https://wa.me/6285322624038?text=${message}`, "_blank");
  };

  return (
      <div className="container mx-auto px-6 py-20 min-h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-md w-full"
            >
              <GlassCard className="text-center p-8 sm:p-12">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full glass-dark mx-auto mb-6 sm:mb-8 flex items-center justify-center border border-white/10">
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                
                <h2 className="heading-display text-xl sm:text-2xl mb-4">Akses Terbatas</h2>
                <p className="text-xs sm:text-sm text-subtle mb-8 sm:mb-10 leading-relaxed">
                  Ini adalah filter sosial, bukan keamanan teknis. Silakan minta akses melalui WhatsApp untuk mendapatkan kata sandi.
                </p>
  
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                      placeholder="Masukkan kata sandi..."
                      className={`w-full glass-dark rounded-xl px-4 py-3 text-sm border transition-colors outline-none ${
                        error ? "border-red-500/50 text-red-200" : "border-white/5 focus:border-primary/50"
                      }`}
                    />
                    {error && (
                      <p className="absolute -bottom-6 left-0 right-0 text-[10px] text-red-500 uppercase tracking-widest">
                        Kata sandi salah
                      </p>
                    )}
                  </div>
  
                  <button
                    onClick={handleUnlock}
                    className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-all"
                  >
                    Buka Akses
                  </button>
  
                  <div className="pt-4 border-t border-white/5 mt-6 sm:mt-8">
                    <button
                      onClick={handleWhatsApp}
                      className="flex items-center justify-center gap-2 w-full text-[10px] sm:text-xs text-white/40 hover:text-white transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>Minta Akses via WhatsApp</span>
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl w-full"
            >
              <GlassCard className="p-8 sm:p-12">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-10 sm:mb-12">
                  <div>
                    <h1 className="heading-display text-3xl sm:text-4xl mb-2">Curriculum Vitae</h1>
                    <p className="text-primary text-[10px] sm:text-sm tracking-[0.2em] uppercase">Mulky Malikul Dhaher</p>
                  </div>
                  <div className="p-2.5 sm:p-3 glass-dark rounded-xl">
                    <Unlock className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  </div>
                </div>
  
                <div className="space-y-10 sm:space-y-12">
                  <section>
                    <h3 className="text-[10px] uppercase tracking-widest text-white/30 mb-6 pb-2 border-b border-white/5">Experience</h3>
                    <div className="space-y-6 sm:space-y-8">
                      <div className="relative pl-6 border-l border-white/10">
                        <div className="absolute top-0 left-[-4.5px] w-2 h-2 rounded-full bg-primary" />
                        <h4 className="font-medium text-base sm:text-lg">System Thinker & Developer</h4>
                        <p className="text-[10px] text-white/40 mb-2">2024 — Present · Solo Builder</p>
                        <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">Membangun ekosistem agen AI dan sistem trading kuantitatif berbasis logika keputusan murni.</p>
                      </div>
                      <div className="relative pl-6 border-l border-white/10">
                        <div className="absolute top-0 left-[-4.5px] w-2 h-2 rounded-full bg-white/20" />
                        <h4 className="font-medium text-base sm:text-lg">FX Market Analyst (Self-taught)</h4>
                        <p className="text-[10px] text-white/40 mb-2">2023 — Present</p>
                        <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">Mempelajari struktur pasar dan mengembangkan algoritma mitigasi risiko untuk trading harian.</p>
                      </div>
                    </div>
                  </section>
  
                  <section>
                    <h3 className="text-[10px] uppercase tracking-widest text-white/30 mb-6 pb-2 border-b border-white/5">Logic & Stack</h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {["Decision Logic", "AI Agents", "Next.js", "Three.js", "Python", "Quantitative Analysis"].map(s => (
                        <span key={s} className="px-3 py-1 glass-dark rounded-full text-[10px] sm:text-xs text-white/60 border border-white/5">
                          {s}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
  
                <div className="mt-12 sm:mt-16 pt-8 border-t border-white/5 text-center">
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">
                    Dokumen ini bersifat pribadi.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}
