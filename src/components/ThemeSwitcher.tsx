"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const { playClick, playHover } = useSoundEffects();
  const isDark = theme === 'dark';

  const handleClick = () => {
    playClick();
    toggleTheme();
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={playHover}
      className="relative w-14 h-7 glass rounded-full p-1 border border-white/10 transition-colors duration-500"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden"
        initial={false}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isDark 
              ? "linear-gradient(to right, #1a1a2e, #16213e)" 
              : "linear-gradient(to right, #87CEEB, #E0F6FF)"
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      <motion.div
        className="relative w-5 h-5 rounded-full flex items-center justify-center"
        animate={{
          x: isDark ? 0 : 26,
          rotate: isDark ? 0 : 360,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        style={{ willChange: "transform" }}
      >
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="text-yellow-200"
            >
              <motion.path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                fill="currentColor"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <motion.div
              className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-yellow-100 rounded-full"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-2 -right-1 w-1 h-1 bg-yellow-100/60 rounded-full"
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ scale: 0, rotate: 90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -90 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="text-amber-500"
            >
              <motion.circle
                cx="12"
                cy="12"
                r="5"
                fill="currentColor"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <motion.line
                  key={angle}
                  x1="12"
                  y1="2"
                  x2="12"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  transform={`rotate(${angle} 12 12)`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                />
              ))}
            </svg>
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 8px 2px rgba(251, 191, 36, 0.3)",
                  "0 0 12px 4px rgba(251, 191, 36, 0.5)",
                  "0 0 8px 2px rgba(251, 191, 36, 0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </button>
  );
}
