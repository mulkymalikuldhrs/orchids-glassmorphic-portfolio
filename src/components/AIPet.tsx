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
      if (Math.random() > 0.3) {
        const nextPos = getRandomMovement();
        setDirection(nextPos.x > position.x ? 1 : -1);
        setPosition(nextPos);
      }
      if (Math.random() > 0.6) {
        triggerReaction();
      }
    }, 6000);

    return () => clearInterval(moveInterval);
  }, [getRandomMovement, triggerReaction, position.x]);

  const getEyes = () => {
    switch (emotion) {
      case "happy":
        return (
          <g transform="translate(45, 25)">
            <motion.circle animate={{ scaleY: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 3 }} r="2" fill="black" />
          </g>
        );
      case "sleepy":
        return (
          <g transform="translate(45, 25)">
            <line x1="-2" y1="0" x2="2" y2="0" stroke="black" strokeWidth="1" />
          </g>
        );
      case "excited":
        return (
          <g transform="translate(45, 25)">
            <motion.circle animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} r="2.5" fill="black" />
          </g>
        );
      case "curious":
        return (
          <g transform="translate(45, 25)">
            <motion.circle animate={{ x: [-0.5, 0.5, -0.5] }} transition={{ repeat: Infinity, duration: 1 }} r="2" fill="black" />
          </g>
        );
      case "thinking":
        return (
          <g transform="translate(45, 25)">
            <motion.path 
              animate={{ rotate: [0, 360] }} 
              transition={{ repeat: Infinity, duration: 2 }} 
              d="M -2,0 A 2,2 0 1,1 2,0" 
              fill="none" 
              stroke="black" 
              strokeWidth="1" 
            />
          </g>
        );
    }
  };

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

        {/* Betta Fish SVG */}
        <motion.div
          animate={{
            y: [0, -5, 0],
            rotate: direction === -1 ? [0, 2, -2, 0] : [0, -2, 2, 0],
            scaleX: direction,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-20 h-20"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
            {/* Back Fin (Tail) */}
            <motion.path
              animate={{
                d: [
                  "M 30,50 Q 0,20 0,50 Q 0,80 30,50",
                  "M 30,50 Q -5,10 0,50 Q -5,90 30,50",
                  "M 30,50 Q 0,20 0,50 Q 0,80 30,50"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              fill="url(#finGradient)"
              className="opacity-80"
            />
            
            {/* Top Fin */}
            <motion.path
              animate={{
                d: [
                  "M 40,40 Q 50,10 70,40",
                  "M 40,40 Q 55,5 75,40",
                  "M 40,40 Q 50,10 70,40"
                ]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              fill="url(#finGradient)"
              className="opacity-70"
            />

            {/* Bottom Fin */}
            <motion.path
              animate={{
                d: [
                  "M 40,60 Q 50,90 70,60",
                  "M 40,60 Q 55,95 75,60",
                  "M 40,60 Q 50,90 70,60"
                ]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              fill="url(#finGradient)"
              className="opacity-70"
            />

            {/* Body */}
            <path
              d="M 30,50 C 40,35 70,35 80,50 C 70,65 40,65 30,50"
              fill="url(#bodyGradient)"
              stroke="white"
              strokeWidth="0.5"
              className="glass"
            />

            {/* Pectoral Fin (Side) */}
            <motion.path
              animate={{
                rotate: [-10, 20, -10]
              }}
              style={{ transformOrigin: "50px 55px" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              d="M 50,55 Q 40,65 50,70"
              fill="white"
              fillOpacity="0.4"
            />

            {/* Eyes */}
            {getEyes()}

            {/* Definitions */}
            <defs>
              <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="finGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>

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
