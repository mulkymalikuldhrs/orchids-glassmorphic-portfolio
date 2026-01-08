"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface CreatorPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatorPopup({ isOpen, onClose }: CreatorPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md z-[101]"
          >
            <div className="glass rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 glass rounded-full hover:bg-white/10 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Section with "Background Removal" Mask */}
              <div className="relative h-80 w-full overflow-hidden bg-gradient-to-b from-white/5 to-transparent">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute inset-0 flex justify-center items-end"
                >
                  <img
                      src="https://huuuiecurrrylshywheo.supabase.co/storage/v1/render/image/public/project-uploads/5fe886a9-3e99-4faa-b7d5-8e128951ffb5/aifaceswap-b8b8473f7f497e39f19277a9ebe538e3-1-resized-1767835389040.jpg?width=8000&height=8000&resize=contain"

                    alt="Mulky Malikul Dhaher"
                    className="h-[110%] w-auto object-contain select-none pointer-events-none"
                    style={{
                      maskImage: "linear-gradient(to top, black 85%, transparent 100%), radial-gradient(circle at 50% 40%, black 60%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to top, black 85%, transparent 100%), radial-gradient(circle at 50% 40%, black 60%, transparent 100%)",
                      maskComposite: "intersect",
                      WebkitMaskComposite: "source-in",
                      filter: "drop-shadow(0 0 20px rgba(255,255,255,0.1))"
                    }}
                  />
                </motion.div>
                
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-8 left-8 flex items-center gap-2">
                   <div className="px-3 py-1 glass rounded-full flex items-center gap-2 border border-white/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[10px] uppercase tracking-widest text-white/60 font-medium">Verified Presence</span>
                   </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-8 pt-4 text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-2xl font-light tracking-tight mb-2">Mulky Malikul Dhaher</h2>
                  <p className="text-sm text-subtle mb-6 leading-relaxed">
                    Digital architect craftting immersive web experiences. Solitary, observant, and deeply rooted in minimal aesthetics.
                  </p>
                  
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-3 glass rounded-2xl border border-white/5">
                      <span className="text-xs text-white/40 uppercase tracking-wider">Status</span>
                      <span className="text-xs text-white/70">Focusing on Deep Work</span>
                    </div>
                    <div className="flex items-center justify-between p-3 glass rounded-2xl border border-white/5">
                      <span className="text-xs text-white/40 uppercase tracking-wider">Location</span>
                      <span className="text-xs text-white/70">Indonesia</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Decoration */}
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
