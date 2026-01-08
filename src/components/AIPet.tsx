"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { Shield, Zap, Target, Cpu, Eye, Sparkles } from "lucide-react";

type Emotion = "happy" | "curious" | "sleepy" | "excited" | "thinking" | "guardian";

export function AIPet() {
  const { language } = useLanguage();
  const [position, setPosition] = useState({ x: 80, y: 70 });
  const [emotion, setEmotion] = useState<Emotion>("happy");
  const [message, setMessage] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isZipping, setIsZipping] = useState(false);

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
    
    // Anime "Zip" effect on click
    setIsZipping(true);
    const nextPos = getRandomMovement();
    setPosition(nextPos);
    setTimeout(() => setIsZipping(false), 500);

    setTimeout(() => {
      setShowBubble(false);
    }, 4000);
  }, [language, getRandomMovement]);

  useEffect(() => {
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
  }, [getRandomMovement, triggerReaction, position.x]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <motion.div
        animate={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          scale: isZipping ? [1, 1.5, 1] : 1,
          opacity: isZipping ? [1, 0.5, 1] : 1,
        }}
        transition={{
          duration: isZipping ? 0.3 : 3,
          ease: isZipping ? "circOut" : "easeInOut",
        }}
        className="absolute w-40 h-40 pointer-events-auto cursor-pointer group flex items-center justify-center"
        onClick={triggerReaction}
      >
        {/* Speech Bubble - Modern UI */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
              animate={{ opacity: 1, y: -100, scale: 1, x: "-50%" }}
              exit={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
              className="absolute left-1/2 whitespace-nowrap bg-black/80 backdrop-blur-xl px-4 py-2 rounded-2xl text-[11px] font-bold border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] text-white tracking-wider"
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
            y: [0, -10, 0],
            rotateY: direction === -1 ? 180 : 0,
            scale: emotion === "excited" ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-32 h-32 flex items-center justify-center"
        >
          {/* Energy Halo */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.05, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-white/5 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 border border-primary/10 rounded-full"
          />

          {/* Main Body - Hyper Realistic Glass/Metal */}
          <div className="relative w-20 h-24 rounded-[2rem] bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-2xl border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.2)] overflow-hidden flex flex-col items-center justify-between py-4">
            {/* Glossy Reflection */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            
            {/* Digital Visor / Eyes */}
            <div className="relative z-10 w-14 h-6 bg-black/90 rounded-full border border-white/10 flex items-center justify-center gap-2 shadow-[inset_0_0_10px_rgba(0,0,0,1)]">
              <motion.div
                animate={{
                  scaleX: emotion === "sleepy" ? 1 : [1, 1.2, 1],
                  scaleY: emotion === "sleepy" ? 0.1 : [1, 0.1, 1, 1, 1],
                  opacity: emotion === "thinking" ? [0.5, 1, 0.5] : 1,
                }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),1)] flex items-center justify-center"
              >
                <div className="w-1 h-1 bg-white rounded-full" />
              </motion.div>
              <motion.div
                animate={{
                  scaleX: emotion === "sleepy" ? 1 : [1, 1.2, 1],
                  scaleY: emotion === "sleepy" ? 0.1 : [1, 0.1, 1, 1, 1],
                  opacity: emotion === "thinking" ? [0.5, 1, 0.5] : 1,
                }}
                transition={{ repeat: Infinity, duration: 4, delay: 0.1 }}
                className="w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),1)] flex items-center justify-center"
              >
                <div className="w-1 h-1 bg-white rounded-full" />
              </motion.div>
            </div>

            {/* Neural Core */}
            <div className="relative w-10 h-10 rounded-full bg-black/40 border border-white/5 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  boxShadow: [
                    "0 0 10px rgba(var(--primary-rgb), 0.2)",
                    "0 0 30px rgba(var(--primary-rgb), 0.5)",
                    "0 0 10px rgba(var(--primary-rgb), 0.2)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-6 h-6 rounded-full bg-primary/20 blur-sm"
              />
              <Cpu className={`w-4 h-4 text-primary/80 ${emotion === "thinking" ? "animate-pulse" : ""}`} />
            </div>

            {/* Bottom Status Light */}
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className={`w-1.5 h-1.5 rounded-full ${emotion === "excited" ? "bg-primary animate-bounce" : "bg-white/10"}`} />
              <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
            </div>
          </div>

          {/* Floating Shoulder Guards */}
          <motion.div
            animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-4 w-6 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 5, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -right-4 top-4 w-6 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
          </motion.div>

          {/* Scanning Beam / Anime FX */}
          {emotion === "curious" && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: [0, 1, 0], scaleY: [0, 1.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[2px] h-32 bg-gradient-to-b from-primary to-transparent"
            />
          )}

          {/* Guardian Shield FX */}
          {emotion === "guardian" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.5, 2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 border border-primary/30 rounded-full"
            />
          )}
        </motion.div>

        {/* Realistic Ground Shadow */}
        <motion.div 
          animate={{
            scaleX: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-16 h-4 bg-black/40 rounded-[100%] blur-xl" 
        />
      </motion.div>
    </div>
  );
}
