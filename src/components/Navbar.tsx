"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";

const navItems = [
  { nameKey: "home", path: "/" },
  { nameKey: "about", path: "/about" },
  { nameKey: "projects", path: "/projects" },
  { nameKey: "thinking", path: "/thinking" },
  { nameKey: "talkToAi", path: "/ai" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { playClick, playHover } = useSoundEffects();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 sm:p-6 pointer-events-none">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
      >
        <div className="glass-vision px-1.5 py-1.5 sm:px-2.5 sm:py-2.5 rounded-full flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[95vw] shadow-2xl">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const name = t.nav[item.nameKey as keyof typeof t.nav];
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={playClick}
                onMouseEnter={playHover}
                className={cn(
                  "relative px-4 sm:px-6 py-2 text-xs sm:text-sm transition-all duration-300 rounded-full font-medium whitespace-nowrap",
                  isActive 
                    ? theme === 'dark' ? "text-white" : "text-gray-900" 
                    : theme === 'dark' ? "text-white/40 hover:text-white/80" : "text-gray-500 hover:text-gray-900"
                )}
              >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className={cn(
                        "absolute inset-0 rounded-full shadow-lg",
                        theme === 'dark' ? "bg-white/15" : "bg-black/10"
                      )}
                      transition={{ 
                        type: "spring", 
                        bounce: 0.2, 
                        duration: 0.6,
                        layout: { duration: 0.4 } 
                      }}
                      style={{ willChange: "transform, opacity" }}
                    />
                  )}
                <span className="relative z-10">{name}</span>
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </motion.div>
    </nav>
  );
}
