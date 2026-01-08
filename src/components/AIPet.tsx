"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { Sparkles, Zap } from "lucide-react";

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
      happy: ["Drawing my way through!", "Stick to the plan!", "Feeling sketchy!", "I'm line-tastic!"],
      curious: ["Is that a pencil?", "Tracing new paths...", "Sketching this out...", "What's the draft?"],
      sleepy: ["Eraser time... zzz", "Out of ink...", "Fading away...", "Nap on the margin..."],
      excited: ["High-speed sketching!", "Vector power!", "Full render mode!", "Line-weight maximized!"],
      thinking: ["Connecting dots...", "Redrawing logic...", "Hmm, let me sketch...", "Calculating strokes..."],
    },
    id: {
      happy: ["Lagi asik nge-sketch!", "Tetap pada garis!", "Gaya stickman!", "Lancar jaya!"],
      curious: ["Ada coretan baru?", "Lagi nyari pola...", "Bentuk apa ini?", "Cek sketsa dulu..."],
      sleepy: ["Waktunya dihapus... zzz", "Tinta mau abis...", "Pudar pelan-pelan...", "Tidur di pojokan..."],
      excited: ["Ngebut coret-coret!", "Kekuatan vektor!", "Mode render penuh!", "Garis tebal-tipis!"],
      thinking: ["Hubungin titik-titik...", "Gambar ulang logika...", "Hmm, bentar dipikir...", "Nghitung coretan..."],
    },
  };

  const getRandomMovement = useCallback(() => {
    const maxX = 85;
    const minX = 5;
    const maxY = 80;
    const minY = 20;
    
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
    }, 5000);

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
          duration: 4,
          ease: "easeInOut",
        }}
        className="absolute w-24 h-32 pointer-events-auto cursor-pointer group flex items-center justify-center"
        onClick={triggerReaction}
      >
        {/* Speech Bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: -70, scale: 1 }}
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

        {/* Realistic 3D Stickman */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: direction === -1 ? [0, 2, -2, 0] : [0, -2, 2, 0],
            scaleX: direction,
            scale: emotion === "excited" ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full h-full flex flex-col items-center justify-center"
        >
          {/* Head - Realistic Glass Sphere */}
          <motion.div 
            className="w-8 h-8 rounded-full relative z-20 mb-[-4px] overflow-hidden"
            style={{
              background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0.1) 100%)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "inset 0 0 10px rgba(255,255,255,0.2), 0 5px 15px rgba(0,0,0,0.2)"
            }}
          >
            {/* Eyes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1.5">
              <motion.div 
                animate={{ scaleY: emotion === "sleepy" ? 0.1 : [1, 1, 0.1, 1] }}
                transition={{ repeat: Infinity, duration: 3, times: [0, 0.9, 0.95, 1] }}
                className="w-1.5 h-1.5 rounded-full bg-white/80" 
              />
              <motion.div 
                animate={{ scaleY: emotion === "sleepy" ? 0.1 : [1, 1, 0.1, 1] }}
                transition={{ repeat: Infinity, duration: 3, times: [0, 0.9, 0.95, 1] }}
                className="w-1.5 h-1.5 rounded-full bg-white/80" 
              />
            </div>
            {/* Glossy Highlight */}
            <div className="absolute top-1 left-1.5 w-2 h-2 rounded-full bg-white/30 blur-[1px]" />
          </motion.div>

          {/* Body and Limbs - Tube style */}
          <svg viewBox="0 0 40 60" className="w-16 h-24 filter drop-shadow(0 5px 10px rgba(0,0,0,0.3))">
            <defs>
              <linearGradient id="stickGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
              </linearGradient>
            </defs>

            {/* Body */}
            <line x1="20" y1="5" x2="20" y2="35" stroke="url(#stickGradient)" strokeWidth="4" strokeLinecap="round" />

            {/* Arms */}
            <motion.line 
              animate={{ 
                x2: emotion === "happy" ? [2, 5, 2] : 5, 
                y2: emotion === "happy" ? [15, 10, 15] : 25 
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              x1="20" y1="12" x2="5" y2="25" stroke="url(#stickGradient)" strokeWidth="3.5" strokeLinecap="round" 
            />
            <motion.line 
              animate={{ 
                x2: emotion === "happy" ? [38, 35, 38] : 35, 
                y2: emotion === "happy" ? [15, 10, 15] : 25 
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              x1="20" y1="12" x2="35" y2="25" stroke="url(#stickGradient)" strokeWidth="3.5" strokeLinecap="round" 
            />

            {/* Legs */}
            <motion.line 
              animate={{ 
                y2: emotion === "excited" ? [55, 45, 55] : 55,
                x2: emotion === "excited" ? [10, 8, 10] : 10
              }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              x1="20" y1="35" x2="10" y2="55" stroke="url(#stickGradient)" strokeWidth="3.5" strokeLinecap="round" 
            />
            <motion.line 
              animate={{ 
                y2: emotion === "excited" ? [55, 45, 55] : 55,
                x2: emotion === "excited" ? [30, 32, 30] : 30
              }}
              transition={{ repeat: Infinity, duration: 0.5, delay: 0.25 }}
              x1="20" y1="35" x2="30" y2="55" stroke="url(#stickGradient)" strokeWidth="3.5" strokeLinecap="round" 
            />
          </svg>

          {/* Particles when excited */}
          {emotion === "excited" && (
            <div className="absolute inset-0">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0.5], y: -50, x: (Math.random() - 0.5) * 60 }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary/40 rounded-full blur-[1px]"
                />
              ))}
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="absolute -top-4 -right-4"
              >
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </motion.div>
            </div>
          )}

          {/* Zap Effect for Thinking */}
          {emotion === "thinking" && (
            <motion.div
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute -top-6 left-1/2 -translate-x-1/2"
            >
              <Zap className="w-4 h-4 text-blue-400 fill-blue-400/20" />
            </motion.div>
          )}
        </motion.div>

        {/* Realistic Ground Shadow */}
        <motion.div 
          animate={{
            scaleX: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-3 bg-black/40 rounded-[100%] blur-[6px]" 
        />
      </motion.div>
    </div>
  );
}
