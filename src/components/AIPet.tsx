"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { Sparkles, MessageSquareHeart } from "lucide-react";

type Emotion = "happy" | "curious" | "sleepy" | "excited" | "thinking";

export function AIPet() {
  const { language } = useLanguage();
  const [position, setPosition] = useState({ x: 20, y: 80 });
  const [emotion, setEmotion] = useState<Emotion>("happy");
  const [message, setMessage] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const messages = {
    en: {
      happy: ["I love this page!", "Everything looks so clean!", "Heeeey!", "I'm having fun!"],
      curious: ["What's over there?", "Are you building something?", "Ooh, a button!", "Scanning for bugs..."],
      sleepy: ["Zzz...", "Is it nap time yet?", "Dreaming of code...", "I'm a bit tired."],
      excited: ["Let's gooo!", "Wow!", "This is amazing!", "I'm so fast!"],
      thinking: ["Hmm...", "Let me see...", "Analyzing...", "Interesting..."],
    },
    id: {
      happy: ["Suka banget halaman ini!", "Semuanya rapi ya!", "Halo halo!", "Aku lagi senang!"],
      curious: ["Itu apa ya?", "Lagi bikin apa?", "Wah, ada tombol!", "Lagi cari bug..."],
      sleepy: ["Zzz...", "Udah waktunya tidur?", "Mimpiin kode...", "Aku agak ngantuk."],
      excited: ["Gaspol!", "Wih!", "Keren banget!", "Aku cepat sekali!"],
      thinking: ["Hmm...", "Coba kulihat...", "Lagi analisa...", "Menarik..."],
    },
  };

  const getRandomMovement = useCallback(() => {
    const maxX = 85; // % of screen
    const minX = 5;
    const maxY = 85;
    const minY = 15;
    
    return {
      x: Math.random() * (maxX - minX) + minX,
      y: Math.random() * (maxY - minY) + minY,
    };
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
      if (Math.random() > 0.3) { // 70% chance to move
        setPosition(getRandomMovement());
      }
      if (Math.random() > 0.6) { // 40% chance to react
        triggerReaction();
      }
    }, 6000);

    return () => clearInterval(moveInterval);
  }, [getRandomMovement, triggerReaction]);

  const getEyes = () => {
    switch (emotion) {
      case "happy":
        return (
          <div className="flex gap-2">
            <motion.div animate={{ scaleY: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="w-1.5 h-1.5 bg-white rounded-full" />
            <motion.div animate={{ scaleY: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        );
      case "sleepy":
        return (
          <div className="flex gap-2">
            <div className="w-1.5 h-0.5 bg-white/60 rounded-full" />
            <div className="w-1.5 h-0.5 bg-white/60 rounded-full" />
          </div>
        );
      case "excited":
        return (
          <div className="flex gap-2">
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1.5 h-1.5 bg-white rounded-full" />
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        );
      case "curious":
        return (
          <div className="flex gap-2">
            <motion.div animate={{ x: [-1, 1, -1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-white rounded-full" />
            <motion.div animate={{ x: [-1, 1, -1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        );
      case "thinking":
        return (
          <div className="flex gap-2">
            <motion.div animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1.5 h-1.5 border-t border-white rounded-full" />
            <motion.div animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1.5 h-1.5 border-t border-white rounded-full" />
          </div>
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
        className="absolute w-12 h-12 pointer-events-auto cursor-pointer group"
        onClick={triggerReaction}
      >
        {/* Speech Bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: -45, scale: 1 }}
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

        {/* Pet Body */}
        <motion.div
          animate={{
            y: [0, -4, 0],
            rotate: emotion === "excited" ? [0, 5, -5, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`relative w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center overflow-hidden transition-colors duration-500 ${
            emotion === "excited" ? "bg-primary/30" : "bg-white/10"
          }`}
        >
          {/* Subtle glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50" />
          
          {/* Eyes */}
          <div className="relative z-10">
            {getEyes()}
          </div>

          {/* Blush */}
          {(emotion === "happy" || emotion === "excited") && (
            <div className="absolute bottom-3 flex gap-4 opacity-40">
              <div className="w-2 h-1 bg-pink-500/50 rounded-full blur-[2px]" />
              <div className="w-2 h-1 bg-pink-500/50 rounded-full blur-[2px]" />
            </div>
          )}

          {/* Sparkle effect when excited */}
          {emotion === "excited" && (
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="w-3 h-3 text-yellow-400" />
            </motion.div>
          )}
        </motion.div>

        {/* Shadow */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-black/20 rounded-full blur-[2px] scale-x-125" />
      </motion.div>
    </div>
  );
}
