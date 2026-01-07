"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";
import { LanguageSwitcher } from "./LanguageSwitcher";

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 sm:p-6 pointer-events-none">
      <div className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
        <div className="glass px-1 py-1 sm:px-2 sm:py-2 rounded-full flex items-center gap-0.5 sm:gap-1 overflow-x-auto no-scrollbar max-w-[95vw]">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const name = t.nav[item.nameKey as keyof typeof t.nav];
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "relative px-3 sm:px-4 py-1.5 text-xs sm:text-sm transition-colors rounded-full font-light whitespace-nowrap",
                  isActive ? "text-white" : "text-white/40 hover:text-white/70"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{name}</span>
              </Link>
            );
          })}
        </div>
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
