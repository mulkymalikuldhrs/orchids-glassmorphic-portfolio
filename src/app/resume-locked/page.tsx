
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, MessageCircle, ArrowRight, Download, ExternalLink } from "lucide-react";
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
    window.open(`https://wa.me/6285322624048?text=${message}`, "_blank");
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
              className="max-w-4xl w-full"
            >
              <GlassCard className="p-8 sm:p-12">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-12 sm:mb-16">
                  <div>
                    <h1 className="heading-display text-3xl sm:text-4xl mb-2">Curriculum Vitae</h1>
                    <div className="flex items-center gap-4">
                      <p className="text-primary text-[10px] sm:text-sm tracking-[0.2em] uppercase font-medium">Mulky Malikul Dhaher</p>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                      <p className="text-white/40 text-[10px] sm:text-xs">Lhokseumawe, Aceh, Indonesia</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="p-3 glass-dark rounded-xl border border-white/5">
                      <Unlock className="w-5 h-5 text-green-400" />
                    </div>
                  </div>
                </div>
  
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-12">
                    <section>
                      <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-8 pb-2 border-b border-white/5 font-bold">Experience</h3>
                      <div className="space-y-10">
                        <div className="relative pl-8 border-l border-white/10 group">
                          <div className="absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)] group-hover:scale-125 transition-transform" />
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                            <h4 className="font-semibold text-lg">Maintenance Technician & Panel Operator</h4>
                            <span className="text-[10px] text-white/30 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">2021 — Present</span>
                          </div>
                          <p className="text-xs text-primary/80 mb-4 font-medium uppercase tracking-wider">PT Yoga Wibawa Mandiri (Packing Plant Semen Padang)</p>
                          <ul className="text-sm text-white/50 font-light leading-relaxed space-y-2 list-disc list-outside ml-4">
                            <li>Conduct preventive and corrective machine maintenance, reducing equipment downtime by 25%.</li>
                            <li>Monitor and operate industrial control panels to ensure production continuity.</li>
                            <li>Perform diagnostics and timely repairs, improving operational efficiency by 10%.</li>
                          </ul>
                        </div>

                        <div className="relative pl-8 border-l border-white/10 group">
                          <div className="absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-primary/50 transition-colors" />
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                            <h4 className="font-semibold text-lg">Freight Administration</h4>
                            <span className="text-[10px] text-white/30 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">2016 — 2018</span>
                          </div>
                          <p className="text-xs text-white/40 mb-4 font-medium uppercase tracking-wider">PT Yoga Wibawa Mandiri</p>
                          <ul className="text-sm text-white/50 font-light leading-relaxed space-y-2 list-disc list-outside ml-4">
                            <li>Managed shipment documents, transport schedules, and daily material logs.</li>
                            <li>Increased tracking accuracy by 20% and reduced delivery times by 15% through system automation.</li>
                            <li>Negotiated carrier contracts, reducing freight costs by 10%.</li>
                          </ul>
                        </div>

                        <div className="relative pl-8 border-l border-white/10 group">
                          <div className="absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-primary/50 transition-colors" />
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                            <h4 className="font-semibold text-lg">Waiter</h4>
                            <span className="text-[10px] text-white/30 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">2016 — 2017</span>
                          </div>
                          <p className="text-xs text-white/40 mb-4 font-medium uppercase tracking-wider">Modern Corner — Klang, Malaysia</p>
                          <p className="text-sm text-white/50 font-light leading-relaxed">
                            Managed over 50 orders per shift while ensuring exceptional customer service in a high-pressure environment.
                          </p>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-8 pb-2 border-b border-white/5 font-bold">Education</h3>
                      <div className="space-y-8">
                        <div>
                          <h4 className="font-medium text-base">SMK Negeri 2 Lhokseumawe</h4>
                          <p className="text-xs text-white/40 mb-2">Multimedia (Teknik Informatika) · 2012 — 2015</p>
                          <p className="text-sm text-primary/60 font-medium">GPA: 85.2</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-base">Universitas Malikussaleh</h4>
                          <p className="text-xs text-white/40">Teknik Elektro · 2015 — 2016 (Completed basic courses)</p>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="space-y-12">
                    <section>
                      <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-6 pb-2 border-b border-white/5 font-bold">Primary Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Technical Maintenance", "Panel Operation", "Troubleshooting", "Admin & Documentation", "Community Support", "Content Writing"].map(s => (
                          <span key={s} className="px-3 py-1.5 glass-dark rounded-lg text-[10px] text-white/60 border border-white/5">
                            {s}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-6 pb-2 border-b border-white/5 font-bold">Digital Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Adobe Photoshop", "Adobe Premiere", "Adobe Illustrator", "Final Cut Pro", "Linux OS", "Networking", "Web3 Basics", "AI Implementation"].map(s => (
                          <span key={s} className="px-3 py-1.5 glass-dark rounded-lg text-[10px] text-primary/70 border border-primary/10">
                            {s}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-6 pb-2 border-b border-white/5 font-bold">Certifications</h3>
                      <div className="space-y-4">
                        <div className="p-3 glass-dark rounded-xl border border-white/5">
                          <p className="text-[11px] font-medium text-white/80">Ethical Hacking & Penetration Testing</p>
                          <p className="text-[9px] text-white/30 uppercase tracking-widest mt-1">2019</p>
                        </div>
                        <div className="p-3 glass-dark rounded-xl border border-white/5">
                          <p className="text-[11px] font-medium text-white/80">EF SET English Certificate</p>
                          <p className="text-[9px] text-white/30 uppercase tracking-widest mt-1">2020</p>
                        </div>
                      </div>
                    </section>

                    <div className="p-6 glass rounded-2xl border border-white/5 bg-white/[0.02]">
                      <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Interests</h4>
                      <p className="text-xs text-white/50 leading-relaxed font-light">
                        Web3, Crypto, AI, Multimedia, Industrial Systems, Self-Learning, Martial Arts.
                      </p>
                    </div>
                  </div>
                </div>
  
                <div className="mt-16 sm:mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">
                    Private Document · Mulky Malikul Dhaher
                  </p>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-[10px] text-white/40 hover:text-white transition-colors uppercase tracking-widest">
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF Version</span>
                    </button>
                    <button className="flex items-center gap-2 text-[10px] text-white/40 hover:text-white transition-colors uppercase tracking-widest">
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}
