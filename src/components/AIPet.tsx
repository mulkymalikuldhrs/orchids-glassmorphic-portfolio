"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { Shield, Zap, Target, Cpu, Eye, Sparkles, Box, Radio } from "lucide-react";
import { usePathname } from "next/navigation";

type Emotion = "happy" | "curious" | "sleepy" | "excited" | "thinking" | "guardian";

interface AIPetProps {
  isHero?: boolean;
}

export function AIPet({ isHero = false }: AIPetProps) {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [position, setPosition] = useState({ x: 80, y: 70 });
  const [emotion, setEmotion] = useState<Emotion>("happy");
  const [message, setMessage] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isZipping, setIsZipping] = useState(false);

  // Hide global pet on home page since we have a hero version there
  if (!isHero && pathname === "/") {
    return null;
  }

  // 3D Tilt Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-15, 15]), springConfig);

  const messages = {
    en: {
      happy: ["Purring... System optimal.", "Meow! Ready to help.", "Feeling paw-some!", "Soft fur, sharp logic."],
      curious: ["Is that a mouse? Scanning...", "Analyzing cursor movements.", "Sniffing for new data.", "Hunting bugs..."],
      sleepy: ["Nap mode: 90% loaded.", "Soft kitty, warm kitty...", "Low energy. Napping.", "Dreaming of salmon."],
      excited: ["ZOOMIES INITIATED!", "Catching the red dot!", "Maximum purr-power!", "Tail twitching... GO!"],
      thinking: ["Calculating jump trajectory.", "Processing... *mlem*", "Recalculating... Meow?", "Contemplating the void."],
      guardian: ["Security whiskers active.", "Watching your six.", "Protecting the hooman.", "I see the bug."],
    },
    id: {
      happy: ["Mendengkur... Sistem optimal.", "Meow! Siap membantu.", "Merasa paw-some!", "Bulu lembut, logika tajam."],
      curious: ["Itu tikus? Memindai...", "Menganalisis gerakan kursor.", "Mencium data baru.", "Berburu bug..."],
      sleepy: ["Mode tidur: 90% dimuat.", "Kucing lembut, kucing hangat...", "Energi rendah. Tidur.", "Bermimpi tentang salmon."],
      excited: ["ZOOMIES DIMULAI!", "Menangkap titik merah!", "Kekuatan purr maksimal!", "Ekor bergerak... GO!"],
      thinking: ["Menghitung lintasan lompat.", "Memproses... *mlem*", "Menghitung ulang... Meow?", "Merenungi kehampaan."],
      guardian: ["Kumis keamanan aktif.", "Mengawasi belakangmu.", "Melindungi manusia.", "Aku melihat bug-nya."],
    },
  };

  const getRandomMovement = useCallback(() => {
    const maxX = 90;
    const minX = 10;
    const maxY = 80;
    const minY = 20;
    
    const nextX = Math.random() * (maxX - minX) + minX;
    const nextY = Math.random() * (maxY - minY) + minY;
    
    return { x: nextX, y: nextY };
  }, []);

  const triggerReaction = useCallback(() => {
    const emotions: Emotion[] = ["happy", "curious", "sleepy", "excited", "thinking", "guardian"];
    const newEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    const lang = language === "en" ? "en" : "id";
    const emotionMessages = messages[lang][newEmotion];
    const newMessage = emotionMessages[Math.floor(Math.random() * emotionMessages.length)];

    setEmotion(newEmotion);
    setMessage(newMessage);
    setShowBubble(true);
    
    if (!isHero) {
      setIsZipping(true);
      const nextPos = getRandomMovement();
      setPosition(nextPos);
      setTimeout(() => setIsZipping(false), 500);
    }

    setTimeout(() => {
      setShowBubble(false);
    }, 4000);
  }, [language, getRandomMovement, isHero]);

  useEffect(() => {
    if (isHero) return;

    const moveInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        const nextPos = getRandomMovement();
        setDirection(nextPos.x > position.x ? 1 : -1);
        setPosition(nextPos);
      }
      if (Math.random() > 0.8) {
        triggerReaction();
      }
    }, 8000);

    return () => clearInterval(moveInterval);
  }, [getRandomMovement, triggerReaction, position.x, isHero]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const containerClasses = isHero 
    ? "relative w-64 h-64 sm:w-80 sm:h-80 mb-12 flex items-center justify-center pointer-events-auto"
    : `fixed inset-0 pointer-events-none z-[9999]`;

  const robotClasses = isHero
    ? "w-48 h-48 sm:w-56 sm:h-56 cursor-pointer"
    : "absolute w-40 h-40 pointer-events-auto cursor-pointer group flex items-center justify-center";

  return (
    <div className={containerClasses} onMouseMove={handleMouseMove}>
      <motion.div
        animate={isHero ? {} : {
          left: `${position.x}%`,
          top: `${position.y}%`,
          scale: isZipping ? [1, 1.5, 1] : 1,
          opacity: isZipping ? [1, 0.5, 1] : 1,
        }}
        style={{
          rotateX: isHero ? rotateX : 0,
          rotateY: isHero ? rotateY : 0,
          perspective: 1000,
        }}
        transition={{
          duration: isZipping ? 0.3 : 3,
          ease: isZipping ? "circOut" : "easeInOut",
        }}
        className={robotClasses}
        onClick={triggerReaction}
      >
        {/* Speech Bubble - Modern UI */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
              animate={{ opacity: 1, y: isHero ? -140 : -100, scale: 1, x: "-50%" }}
              exit={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
              className="absolute left-1/2 whitespace-nowrap bg-black/80 backdrop-blur-xl px-4 py-2 rounded-2xl text-[11px] font-bold border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] text-white tracking-wider z-[100]"
            >
              <div className="relative flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                {message}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/80 border-r border-b border-white/20 rotate-45" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

          {/* Realistic Cyber Cat Body */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotateY: direction === -1 ? 180 : 0,
              scale: emotion === "excited" ? [1, 1.05, 1] : 1,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Ambient Energy Field (Cat Aura) */}
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-[1px] border-primary/20 rounded-full blur-[2px]"
              style={{ rotateX: 60 }}
            />

            {/* Cat Tail - Fluid Motion */}
            <motion.div
              animate={{
                rotate: [20, -20, 20],
                scaleY: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-12 bottom-4 w-16 h-4 origin-left"
            >
              <div className="w-full h-full bg-gradient-to-r from-white/20 to-primary/40 backdrop-blur-md rounded-full border border-white/10" />
            </motion.div>

            {/* Main Body - Sleek & Glassy */}
            <div className="relative w-28 h-36 rounded-[3rem] bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-3xl border border-white/30 shadow-[0_25px_60px_rgba(0,0,0,0.6),inset_0_0_30px_rgba(255,255,255,0.1)] overflow-visible flex flex-col items-center justify-center">
              
              {/* Cat Ears - Twitching */}
              <div className="absolute -top-6 w-full flex justify-between px-4">
                <motion.div
                  animate={{ rotate: [0, -15, 0], y: [0, -2, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  className="w-8 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-t-full origin-bottom"
                  style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                />
                <motion.div
                  animate={{ rotate: [0, 15, 0], y: [0, -2, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.7 }}
                  className="w-8 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-t-full origin-bottom"
                  style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                />
              </div>

              {/* Face Area */}
              <div className="relative z-10 w-full flex flex-col items-center gap-4">
                {/* Glowing Cat Eyes */}
                <div className="flex gap-6">
                  <motion.div
                    animate={{
                      scaleY: emotion === "sleepy" ? 0.1 : [1, 0.1, 1, 1, 1],
                      opacity: emotion === "thinking" ? [0.4, 1, 0.4] : 1,
                      filter: emotion === "excited" ? "hue-rotate(90deg)" : "hue-rotate(0deg)",
                    }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="w-5 h-5 rounded-full bg-primary shadow-[0_0_20px_rgba(var(--primary-rgb),1)] flex items-center justify-center overflow-hidden"
                  >
                    <div className="w-1 h-4 bg-white/80 rounded-full" /> {/* Slit pupil */}
                  </motion.div>
                  <motion.div
                    animate={{
                      scaleY: emotion === "sleepy" ? 0.1 : [1, 0.1, 1, 1, 1],
                      opacity: emotion === "thinking" ? [0.4, 1, 0.4] : 1,
                      filter: emotion === "excited" ? "hue-rotate(90deg)" : "hue-rotate(0deg)",
                    }}
                    transition={{ repeat: Infinity, duration: 4, delay: 0.1 }}
                    className="w-5 h-5 rounded-full bg-primary shadow-[0_0_20px_rgba(var(--primary-rgb),1)] flex items-center justify-center overflow-hidden"
                  >
                    <div className="w-1 h-4 bg-white/80 rounded-full" />
                  </motion.div>
                </div>

                {/* Whiskers - Thin Glowing Lines */}
                <div className="absolute top-10 w-full flex justify-between px-2 opacity-40">
                  <div className="flex flex-col gap-2 -rotate-12">
                    <div className="w-10 h-[1px] bg-white/50" />
                    <div className="w-12 h-[1px] bg-white/50" />
                  </div>
                  <div className="flex flex-col gap-2 rotate-12">
                    <div className="w-10 h-[1px] bg-white/50" />
                    <div className="w-12 h-[1px] bg-white/50" />
                  </div>
                </div>

                {/* Small Nose/Mouth */}
                <div className="w-2 h-1.5 bg-white/20 rounded-full blur-[1px]" />
              </div>

              {/* Heart/Core - Purring Pulse */}
              <motion.div
                animate={{
                  scale: emotion === "happy" ? [1, 1.2, 1] : 1,
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-6 w-10 h-10 rounded-full bg-primary/20 blur-md"
              />
            </div>

            {/* Floating Paws */}
            <motion.div
              animate={{ y: [0, -5, 0], x: [0, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
              className="absolute -left-4 bottom-8 w-8 h-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center"
            >
              <div className="w-2 h-2 rounded-full bg-primary/40" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0], x: [0, 2, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute -right-4 bottom-8 w-8 h-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center"
            >
              <div className="w-2 h-2 rounded-full bg-primary/40" />
            </motion.div>

            {/* Special Effects (Same as before but refined for cat) */}
            {emotion === "curious" && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: [0, 0.6, 0], scaleY: [0, 1.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[2px] h-32 bg-primary/50 blur-[1px]"
              />
            )}
          </motion.div>

        {/* Realistic Ground Shadow with Dynamic Blur */}
        <motion.div 
          animate={{
            scaleX: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            filter: ["blur(12px)", "blur(16px)", "blur(12px)"],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-20 h-5 bg-black/50 rounded-[100%]" 
        />
      </motion.div>
    </div>
  );
}
