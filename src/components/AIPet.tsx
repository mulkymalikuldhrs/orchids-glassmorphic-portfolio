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
      happy: ["Awaiting orders.", "System integrity: 100%.", "Optimal performance.", "Guardian active."],
      curious: ["Scanning for threats...", "Analyzing packet data.", "New pattern detected.", "Querying origin..."],
      sleepy: ["Power cycling...", "Entering low-latency mode.", "Neural rest initialized.", "Hibernating..."],
      excited: ["OVERDRIVE ENGAGED!", "Target locked!", "Maximum output!", "Systems peaking!"],
      thinking: ["Processing logic...", "Parsing encrypted data.", "Recalculating...", "Optimizing path..."],
      guardian: ["I am your shield.", "Protocol 1: Protect.", "Security breach: Negative.", "Ready for deployment."],
    },
    id: {
      happy: ["Menunggu perintah.", "Integritas sistem: 100%.", "Performa optimal.", "Guardian aktif."],
      curious: ["Memindai ancaman...", "Menganalisis data paket.", "Pola baru terdeteksi.", "Mencari asal..."],
      sleepy: ["Siklus daya...", "Masuk mode latensi rendah.", "Istirahat saraf dimulai.", "Hibernasi..."],
      excited: ["OVERDRIVE DIAKTIFKAN!", "Target terkunci!", "Output maksimal!", "Sistem memuncak!"],
      thinking: ["Memproses logika...", "Mengurai data terenkripsi.", "Menghitung ulang...", "Mengoptimalkan jalur..."],
      guardian: ["Aku adalah perisaimu.", "Protokol 1: Lindungi.", "Pelanggaran keamanan: Nihil.", "Siap dikerahkan."],
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
                <Target className="w-3 h-3 text-primary animate-spin-slow" />
                {message}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/80 border-r border-b border-white/20 rotate-45" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Realistic Cyber Guardian Body */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotateY: direction === -1 ? 180 : 0,
            scale: emotion === "excited" ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Holographic Rings (5D Feel) */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-[0.5px] border-primary/20 rounded-full"
            style={{ rotateX: 60 }}
          />
          <motion.div
            animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 border-[0.5px] border-white/10 rounded-full"
            style={{ rotateY: 60 }}
          />
          <motion.div
            animate={{ rotate: 180, scale: [1, 1.2, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-8 border-[0.5px] border-primary/5 rounded-full"
            style={{ rotateX: 45, rotateY: 45 }}
          />

          {/* Main Body - Hyper Realistic Glass/Metal */}
          <div className="relative w-24 h-32 sm:w-28 sm:h-36 rounded-[2.5rem] bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-3xl border border-white/30 shadow-[0_25px_60px_rgba(0,0,0,0.6),inset_0_0_30px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col items-center justify-between py-6">
            {/* Inner Mechanical Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent_70%)]" />
            
            {/* Digital Visor / Eyes */}
            <div className="relative z-10 w-16 h-7 bg-black/95 rounded-full border border-white/10 flex items-center justify-center gap-2 shadow-[inset_0_0_15px_rgba(0,0,0,1)]">
              <motion.div
                animate={{
                  scaleX: emotion === "sleepy" ? 1 : [1, 1.3, 1],
                  scaleY: emotion === "sleepy" ? 0.1 : [1, 0.1, 1, 1, 1],
                  opacity: emotion === "thinking" ? [0.4, 1, 0.4] : 1,
                }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="w-3.5 h-3.5 rounded-full bg-primary shadow-[0_0_20px_rgba(var(--primary-rgb),1)] flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 bg-white rounded-full opacity-80" />
              </motion.div>
              <motion.div
                animate={{
                  scaleX: emotion === "sleepy" ? 1 : [1, 1.3, 1],
                  scaleY: emotion === "sleepy" ? 0.1 : [1, 0.1, 1, 1, 1],
                  opacity: emotion === "thinking" ? [0.4, 1, 0.4] : 1,
                }}
                transition={{ repeat: Infinity, duration: 4, delay: 0.1 }}
                className="w-3.5 h-3.5 rounded-full bg-primary shadow-[0_0_20px_rgba(var(--primary-rgb),1)] flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 bg-white rounded-full opacity-80" />
              </motion.div>
            </div>

            {/* Neural Core with Floating Orbs */}
            <div className="relative w-12 h-12 rounded-full bg-black/40 border border-white/5 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.2, 0.5, 0.2],
                  boxShadow: [
                    "0 0 15px rgba(var(--primary-rgb), 0.3)",
                    "0 0 40px rgba(var(--primary-rgb), 0.6)",
                    "0 0 15px rgba(var(--primary-rgb), 0.3)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-primary/20 blur-md"
              />
              <Cpu className={`relative z-10 w-5 h-5 text-primary/90 ${emotion === "thinking" ? "animate-pulse" : ""}`} />
            </div>

            {/* Bottom Status Grid */}
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-sm bg-emerald-500/80 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <div className={`w-2 h-2 rounded-sm ${emotion === "excited" ? "bg-primary animate-bounce shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" : "bg-white/10"}`} />
              <div className="w-2 h-2 rounded-sm bg-white/10" />
            </div>
          </div>

          {/* Floating Mechanical Limbs (Independent Motion) */}
          <motion.div
            animate={{ 
              y: [0, -8, 0], 
              rotate: [0, 8, 0],
              x: [0, -2, 0]
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-6 top-6 w-7 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/40 blur-[2px]" />
          </motion.div>
          <motion.div
            animate={{ 
              y: [0, 8, 0], 
              rotate: [0, -8, 0],
              x: [0, 2, 0]
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
            className="absolute -right-6 top-6 w-7 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/40 blur-[2px]" />
          </motion.div>

          {/* Floating Satellites (Mini Orbs) */}
          <motion.div
            animate={{
              rotate: 360,
              y: [0, 20, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-40px] pointer-events-none"
          >
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),1)]" />
          </motion.div>

          {/* Scanning Beam / Anime FX */}
          {emotion === "curious" && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: [0, 1, 0], scaleY: [0, 2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[3px] h-40 bg-gradient-to-b from-primary via-primary/50 to-transparent blur-[1px]"
            />
          )}

          {/* Guardian Shield FX */}
          {emotion === "guardian" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.8, 2.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-[-20px] border-[2px] border-primary/40 rounded-full shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]"
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
