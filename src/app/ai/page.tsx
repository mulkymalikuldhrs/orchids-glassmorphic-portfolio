"use client";

import { motion } from "framer-motion";
import { AICompanion } from "@/components/AICompanion";
import { Terminal } from "@/components/Terminal";
import { useLanguage } from "@/hooks/useLanguage";
import { Activity, Shield, Cpu, HardDrive } from "lucide-react";

export default function AIPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="heading-display text-4xl sm:text-6xl mb-4">{t.ai.title}</h1>
          <p className="text-subtle text-sm sm:text-lg max-w-2xl mx-auto">
            {t.ai.subtitle}
          </p>
        </div>

        {/* OS Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[750px]">
          
          {/* Left Side: System Monitor & Tools */}
          <div className="lg:col-span-3 space-y-6 hidden lg:flex flex-col">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass p-6 rounded-2xl border border-white/5 space-y-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-primary" />
                <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-white/40">System Status</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase tracking-wider text-white/20">
                    <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> Core Load</span>
                    <span className="text-primary">12%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: ["12%", "15%", "12%"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="h-full bg-primary/40" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase tracking-wider text-white/20">
                    <span className="flex items-center gap-1"><HardDrive className="w-3 h-3" /> Memory</span>
                    <span className="text-emerald-500">2.4GB</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: ["35%", "37%", "35%"] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="h-full bg-emerald-500/40" 
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-widest">
                    <Shield className="w-3 h-3 text-emerald-500" />
                    <span>Kernel: Verified</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-dark p-6 rounded-2xl border border-white/5 flex-1"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-white/40">Quick Access</h3>
              </div>
              <div className="space-y-2">
                {['About.sys', 'Projects.dir', 'Resume.enc', 'Logs.txt'].map((file) => (
                  <div key={file} className="p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group flex items-center justify-between">
                    <span className="text-sm text-white/60 group-hover:text-white transition-colors">{file}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/5 group-hover:bg-primary transition-colors" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Center: AI Companion */}
          <div className="lg:col-span-5 h-[600px] lg:h-full">
            <AICompanion />
          </div>

          {/* Right side: Terminal */}
          <div className="lg:col-span-4 h-[400px] lg:h-full">
            <Terminal />
          </div>

        </div>
      </motion.div>
    </div>
  );
}
