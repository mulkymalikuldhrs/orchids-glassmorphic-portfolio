"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function GlassCard({ children, className, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      transition={{ 
        duration: 0.6, 
        delay, 
        ease: [0.22, 1, 0.36, 1],
        y: { type: "spring", stiffness: 300, damping: 20 }
      }}
      style={{ willChange: "transform, opacity" }}
      className={cn("glass rounded-3xl p-8 transition-shadow hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.2)]", className)}
    >
      {children}
    </motion.div>
  );
}
