import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "default" | "vision";
}

export function GlassCard({ children, className, delay = 0, variant = "vision" }: GlassCardProps) {
  const { playClick, playHover } = useSoundEffects();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -4,
        backgroundColor: variant === "vision" ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)",
        borderColor: "rgba(255, 255, 255, 0.2)"
      }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={playHover}
      onClick={playClick}
      transition={{ 
        duration: 0.6, 
        delay, 
        ease: [0.22, 1, 0.36, 1],
        y: { type: "spring", stiffness: 300, damping: 20 }
      }}
      style={{ willChange: "transform, opacity" }}
      className={cn(
        variant === "vision" ? "glass-vision" : "glass",
        "rounded-[2.5rem] p-8", 
        className
      )}
    >
      {/* Inner Shine Effect - More pronounced in vision variant */}
      <div className={cn(
        "absolute inset-0 pointer-events-none transition-opacity duration-500",
        variant === "vision" 
          ? "bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-100" 
          : "bg-gradient-to-br from-white/5 to-transparent opacity-50"
      )} />
      
      {/* Soft Rim Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
