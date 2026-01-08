"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { Sparkles } from "lucide-react";

type Emotion = "happy" | "curious" | "sleepy" | "excited" | "thinking";

export function AIPet() {
  const { language } = useLanguage();
  const [position, setPosition] = useState({ x: 20, y: 80 });
  const [emotion, setEmotion] = useState<Emotion>("happy");
  const [message, setMessage] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  const messages = {
    en: {
      happy: ["Swimming in style!", "Glub glub!", "The water is fine!", "Love the vibes!"],
      curious: ["What's that sparkle?", "Are those pixels?", "Bubbles everywhere!", "Scanning the reef..."],
      sleepy: ["Floating... zzz", "Deep sea dreaming...", "Low battery fins...", "Quiet waters..."],
      excited: ["Zooming through the app!", "Turbo fins engaged!", "Wow, so shiny!", "Best reef ever!"],
      thinking: ["Calculating current...", "Analyzing waves...", "Hmm, fishy...", "Deep thoughts..."],
    },
    id: {
      happy: ["Berenang santai!", "Glub glub!", "Airnya sejuk!", "Suka banget!"],
      curious: ["Ada yang berkilau?", "Itu piksel ya?", "Banyak gelembung!", "Lagi cek terumbu..."],
      sleepy: ["Mengapung... zzz", "Mimpi di laut dalam...", "Sirip lagi lowbat...", "Perairan tenang..."],
      excited: ["Melesat kencang!", "Sirip turbo aktif!", "Wih, kinclong banget!", "Terumbu terbaik!"],
      thinking: ["Nghitung arus...", "Analisa ombak...", "Hmm, mencurigakan...", "Pikiran dalam..."],
    },
  };

  const getRandomMovement = useCallback(() => {
    const maxX = 85;
    const minX = 5;
    const maxY = 85;
    const minY = 15;
    
    const nextX = Math.random() * (maxX - minX) + minX;
    const nextY = Math.random() * (maxY - minY) + minY;
    
    return { x: nextX, y: nextY };
  }, []);

  const triggerReaction = useCallback(() => {
    const emotions: Emotion[] = ["happy", "curious", "sleepy", "excited", "thinking"];
    const newEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    const lang = language === "en" ? "en" : "id";
    const emotionMessages = messages[lang][newEmotion];
    const newMessage = emotionMessages[Math.floor(Math.random() * emotionMessages.length)];

    setEmotion(newEmotion);
    setMessage(newMessage);
    setShowBubble(true);
    
    setTimeout(() => {
      setShowBubble(false);
    }, 4000);
  }, [language]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (Math.random() > 0.4) {
        const nextPos = getRandomMovement();
        setDirection(nextPos.x > position.x ? 1 : -1);
        setPosition(nextPos);
      }
      if (Math.random() > 0.7) {
        triggerReaction();
      }
    }, 4000); // Faster checks for more dynamic movement

    return () => clearInterval(moveInterval);
  }, [getRandomMovement, triggerReaction, position.x]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <motion.div
        animate={{
          left: `${position.x}%`,
          top: `${position.y}%`,
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
        }}
        className="absolute w-24 h-24 pointer-events-auto cursor-pointer group flex items-center justify-center"
        onClick={triggerReaction}
      >
        {/* Speech Bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: -60, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap glass px-3 py-1.5 rounded-2xl text-[11px] font-medium border border-white/10 shadow-xl"
            >
              <div className="relative">
                {message}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white/5" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Realistic Betta Fish */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: direction === -1 ? [0, 1, -1, 0] : [0, -1, 1, 0],
            scaleX: direction * 1.2,
            scaleY: 1.2,
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-32 h-32 flex items-center justify-center"
        >
          {/* Main Fish Image */}
          <motion.img
            src="https://www.freeiconspng.com/uploads/betta-fish-png-15.png"
            alt="Real Betta Fish"
            className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(236,72,153,0.3)] filter brightness-110 contrast-110"
            animate={{
              filter: emotion === "excited" 
                ? ["brightness(1.1) contrast(1.1)", "brightness(1.4) contrast(1.3)", "brightness(1.1) contrast(1.1)"]
                : "brightness(1.1) contrast(1.1)"
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Realistic Fins Overlay (SVG for "5D" flow) */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-30">
            <motion.path
              animate={{
                d: [
                  "M 30,50 Q 10,20 5,50 Q 10,80 30,50",
                  "M 30,50 Q 5,15 0,50 Q 5,85 30,50",
                  "M 30,50 Q 10,20 5,50 Q 10,80 30,50"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              fill="url(#finFlowGradient)"
            />
            <defs>
              <linearGradient id="finFlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Water Ripples (5D Effect) */}
          <motion.div
            animate={{
              scale: [1, 1.5],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute inset-0 border border-white/20 rounded-full blur-sm"
          />


          {/* Bubbles */}
          <AnimatePresence>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0, x: 20 }}
                animate={{ opacity: [0, 1, 0], y: -40, x: 20 + (Math.random() * 20 - 10) }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: "easeOut"
                }}
                className="absolute top-1/2 right-0 w-2 h-2 rounded-full border border-white/30 bg-white/10"
              />
            ))}
          </AnimatePresence>

          {/* Excited Effect */}
          {emotion === "excited" && (
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </motion.div>
          )}
        </motion.div>

        {/* Shadow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/20 rounded-full blur-[4px] scale-x-150" />
      </motion.div>
    </div>
  );
}
