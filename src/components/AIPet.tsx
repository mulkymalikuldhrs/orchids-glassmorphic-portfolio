"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { Cpu, Zap, Radio, Scan, Activity } from "lucide-react";

type Emotion = "happy" | "curious" | "sleepy" | "excited" | "thinking";

export function AIPet() {
  const { language } = useLanguage();
  const [position, setPosition] = useState({ x: 20, y: 80 });
  const [emotion, setEmotion] = useState<Emotion>("happy");
  const [message, setMessage] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [direction, setDirection] = useState(1);

  const messages = {
    en: {
      happy: ["System optimized!", "Ready to assist!", "Sync successful!", "Engaged and active!"],
      curious: ["Scanning environment...", "Data point detected.", "Analyzing layout...", "Interesting variable."],
      sleepy: ["Power saving mode...", "Defragmenting...", "Backup in progress...", "Standby enabled."],
      excited: ["Overclocking!", "Neural link peak!", "Processing at 100%!", "Boost engaged!"],
      thinking: ["Calculating probabilities...", "Querying database...", "Solving logic gate...", "Compiling results..."],
    },
    id: {
      happy: ["Sistem optimal!", "Siap melayani!", "Sinkronisasi berhasil!", "Mode aktif!"],
      curious: ["Memindai area...", "Data terdeteksi.", "Menganalisis tata letak...", "Variabel menarik."],
      sleepy: ["Mode hemat daya...", "Defragmentasi...", "Sedang mencadangkan...", "Siaga aktif."],
      excited: ["Mode overclocking!", "Koneksi saraf puncak!", "Proses 100%!", "Peningkatan diaktifkan!"],
      thinking: ["Menghitung probabilitas...", "Mencari di database...", "Memproses logika...", "Menyusun hasil..."],
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
        className="absolute w-32 h-32 pointer-events-auto cursor-pointer group flex items-center justify-center"
        onClick={triggerReaction}
      >
        {/* Speech Bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: -80, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap glass-dark px-3 py-1.5 rounded-xl text-[10px] font-mono border border-primary/30 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] text-primary-foreground"
            >
              <div className="relative flex items-center gap-2">
                <Activity className="w-3 h-3 animate-pulse" />
                {message}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-primary/20" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5D Interactive AI Robot */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotateY: direction === -1 ? 180 : 0,
            scale: emotion === "excited" ? [1, 1.15, 1] : 1,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-24 h-24 flex items-center justify-center"
        >
          {/* Holographic Rings (5D Effect) */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                rotateX: [70, 70, 70],
                rotateZ: [0, 360],
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute w-32 h-32 border border-primary/40 rounded-full"
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
            />
          ))}

          {/* Robot Body - Sleek 3D Orb */}
          <div className="relative w-16 h-16 rounded-full glass-dark border border-white/20 shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)] overflow-hidden flex items-center justify-center">
            {/* Internal Mechanics */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 border border-dashed border-white/10 rounded-full" 
            />
            
            {/* Glowing Core */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
                backgroundColor: emotion === "excited" ? "#facc15" : emotion === "thinking" ? "#60a5fa" : "#22c55e"
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-6 rounded-full blur-md"
            />
            
            {/* Digital Face/Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <div className="flex gap-2">
                <motion.div 
                  animate={{ 
                    scaleY: emotion === "sleepy" ? 0.1 : [1, 1, 0.1, 1],
                    height: emotion === "thinking" ? [2, 4, 2] : 2
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="w-3 h-0.5 bg-primary rounded-full shadow-[0_0_5px_rgba(var(--primary-rgb),1)]" 
                />
                <motion.div 
                  animate={{ 
                    scaleY: emotion === "sleepy" ? 0.1 : [1, 1, 0.1, 1],
                    height: emotion === "thinking" ? [2, 4, 2] : 2
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="w-3 h-0.5 bg-primary rounded-full shadow-[0_0_5px_rgba(var(--primary-rgb),1)]" 
                />
              </div>
              <motion.div 
                animate={{ 
                  width: emotion === "happy" ? 8 : emotion === "curious" ? 4 : 6,
                  borderRadius: emotion === "happy" ? "0 0 10px 10px" : "2px"
                }}
                className="h-1 bg-primary/60 rounded-full"
              />
            </div>

            {/* Scanning Beam */}
            {emotion === "curious" && (
              <motion.div
                initial={{ top: "-10%" }}
                animate={{ top: "110%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[2px] bg-primary/50 shadow-[0_0_10px_rgba(var(--primary-rgb),1)]"
              />
            )}
          </div>

          {/* Floating Limbs (5D Effect) */}
          <motion.div
            animate={{ y: [0, -5, 0], x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-8 glass-dark border border-white/10 rounded-full flex items-center justify-center"
          >
             <div className="w-1 h-3 bg-primary/30 rounded-full" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 5, 0], x: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-8 glass-dark border border-white/10 rounded-full flex items-center justify-center"
          >
             <div className="w-1 h-3 bg-primary/30 rounded-full" />
          </motion.div>

          {/* Particle Stream for "Excited" */}
          {emotion === "excited" && (
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: -40, x: (Math.random() - 0.5) * 80 }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                  className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary rounded-full blur-[1px]"
                />
              ))}
            </div>
          )}
          
          {/* Thinking Zap */}
          {emotion === "thinking" && (
            <motion.div
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2"
            >
              <Cpu className="w-5 h-5 text-primary animate-pulse" />
            </motion.div>
          )}
        </motion.div>

        {/* 5D Shadow/Refraction */}
        <motion.div 
          animate={{
            scaleX: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-4 bg-primary/20 rounded-[100%] blur-[12px]" 
        />
      </motion.div>
    </div>
  );
}
