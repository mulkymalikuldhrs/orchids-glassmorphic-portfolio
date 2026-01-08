"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";
import { Waves, Droplets } from "lucide-react";

type BettaState = "idle" | "curious" | "alert" | "resting";

interface AIPetProps {
  isHero?: boolean;
}

export function AIPet({ isHero = false }: AIPetProps) {
  const pathname = usePathname();
  const [position, setPosition] = useState({ x: 80, y: 70 });
  const [state, setState] = useState<BettaState>("idle");
  const [message, setMessage] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [direction, setDirection] = useState(1);
  const lastInteractionTime = useRef(Date.now());

  // Hide global pet on home page since we have a hero version there
  if (!isHero && pathname === "/") {
    return null;
  }

  // 3D Tilt Logic for Hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), springConfig);

  const triggerBubble = useCallback(async (context: string = "idle") => {
    // Probability check: 30% chance to speak
    if (Math.random() > 0.3) return;

    try {
      // Simulate thinking delay (3-10 seconds as requested)
      const delay = 3000 + Math.random() * 7000;
      
      const response = await fetch("/api/betta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context }),
      });
      
      const data = await response.json();
      
      setTimeout(() => {
        setMessage(data.text);
        if (data.state) setState(data.state as BettaState);
        setShowBubble(true);
        
        // Auto hide bubble
        setTimeout(() => {
          setShowBubble(false);
        }, 5000);
      }, delay);
    } catch (error) {
      console.error("Betta failed to think:", error);
    }
  }, []);

  const getRandomMovement = useCallback(() => {
    const maxX = 85;
    const minX = 15;
    const maxY = 80;
    const minY = 20;
    return { 
      x: Math.random() * (maxX - minX) + minX, 
      y: Math.random() * (maxY - minY) + minY 
    };
  }, []);

  // Main Loop
  useEffect(() => {
    const loop = setInterval(() => {
      const now = Date.now();
      const idleTime = now - lastInteractionTime.current;

      // Random movement logic
      if (!isHero && Math.random() > 0.4) {
        const nextPos = getRandomMovement();
        setDirection(nextPos.x > position.x ? 1 : -1);
        setPosition(nextPos);
      }

      // Random bubble logic (respecting the 45-180s range via probability)
      // Check every 15s, if we hit 15% chance, it roughly averages to 100s
      if (Math.random() > 0.85) {
        triggerBubble(idleTime > 60000 ? "idle" : "moving");
      }

      // State handling
      if (idleTime > 60000 && state !== "resting") {
        setState("resting");
      }

    }, 15000); // Pulse every 15s

    return () => clearInterval(loop);
  }, [isHero, position.x, state, triggerBubble, getRandomMovement]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
    
    lastInteractionTime.current = Date.now();
    
    // Proximity reaction: curious
    if (Math.abs(x) < 150 && Math.abs(y) < 150 && state !== "curious") {
      setState("curious");
      if (Math.random() > 0.9) triggerBubble("hover"); // Rare reaction to hover
    }
  };

  const containerClasses = isHero 
    ? "relative w-80 h-80 mb-12 flex items-center justify-center pointer-events-auto"
    : `fixed inset-0 pointer-events-none z-[9999]`;

  const fishClasses = isHero
    ? "w-64 h-64 cursor-default"
    : "absolute w-48 h-48 pointer-events-auto cursor-default flex items-center justify-center";

  return (
    <div className={containerClasses} onMouseMove={handleMouseMove}>
      <motion.div
        animate={isHero ? {} : {
          left: `${position.x}%`,
          top: `${position.y}%`,
        }}
        style={{
          rotateX: isHero ? rotateX : 0,
          rotateY: isHero ? rotateY : 0,
          perspective: 1000,
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
        }}
        className={fishClasses}
      >
        {/* Thought Bubble - Minimalist Drift */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, y: 20, x: "-50%" }}
              animate={{ opacity: 1, y: isHero ? -120 : -80, x: "-50%" }}
              exit={{ opacity: 0, y: -20, x: "-50%" }}
              className="absolute left-1/2 whitespace-normal w-48 text-center"
            >
              <p className="text-[12px] sm:text-[14px] text-white/60 font-light italic tracking-wide leading-relaxed">
                {message}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BETTA_CORE Visual Implementation */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotateZ: direction === -1 ? [0, -5, 0] : [0, 5, 0],
            scale: state === "resting" ? 0.95 : 1,
          }}
          transition={{
            duration: state === "resting" ? 8 : 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Flip based on direction */}
          <div style={{ transform: `scaleX(${direction})`, transition: 'transform 2s ease-in-out' }} className="relative">
            
            {/* Fins - Flowing Glassmorphism */}
            {/* Top Fin */}
            <motion.div
              animate={{
                rotateX: [10, 30, 10],
                skewX: [0, 5, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 left-8 w-24 h-16 bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-md rounded-full border-t border-l border-white/10 origin-bottom"
              style={{ clipPath: "ellipse(50% 100% at 50% 100%)" }}
            />

            {/* Bottom Fin */}
            <motion.div
              animate={{
                rotateX: [-10, -30, -10],
                skewX: [0, -5, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 left-10 w-28 h-20 bg-gradient-to-tr from-primary/5 to-transparent backdrop-blur-sm rounded-full border-b border-l border-white/5 origin-top"
              style={{ clipPath: "ellipse(50% 100% at 50% 0%)" }}
            />

            {/* Tail Fin - Large & Fluid */}
            <motion.div
              animate={{
                rotateY: [15, -15, 15],
                scaleX: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-20 top-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-primary/20 via-primary/5 to-transparent backdrop-blur-xl rounded-full border-r border-white/10 origin-right"
              style={{ clipPath: "polygon(100% 50%, 0% 0%, 20% 50%, 0% 100%)" }}
            />

            {/* Main Body - Sleek Teardrop */}
            <div className="relative w-32 h-14 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-2xl rounded-full border border-white/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] flex items-center px-4 overflow-hidden">
              {/* Inner details / scales */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.2)_0%,transparent_50%)]" />
              
              {/* Eye - Minimalist Dot */}
              <motion.div 
                animate={{
                  scale: state === "alert" ? 1.2 : 1,
                  opacity: state === "resting" ? 0.3 : 0.8,
                }}
                className="ml-auto w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" 
              />
            </div>

            {/* Side Fin (Pectoral) */}
            <motion.div
              animate={{
                rotateY: [0, 45, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-8 top-1/2 w-8 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full origin-left"
            />
          </div>

          {/* Ambient Particles (Bubbles) */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, x: 0, opacity: 0 }}
                animate={{ 
                  y: -100, 
                  x: [0, 10, -10, 0],
                  opacity: [0, 0.4, 0] 
                }}
                transition={{ 
                  duration: 4 + i, 
                  repeat: Infinity, 
                  delay: i * 2,
                  ease: "easeOut"
                }}
                className="absolute left-1/2 w-1 h-1 rounded-full border border-white/30"
              />
            ))}
          </div>
        </motion.div>

        {/* Subtle Caustic Light Shadow */}
        <motion.div 
          animate={{
            scaleX: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-32 h-4 bg-primary/10 blur-2xl rounded-full" 
        />
      </motion.div>
    </div>
  );
}
