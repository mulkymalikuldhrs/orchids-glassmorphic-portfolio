"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Sparkles, Terminal, Brain, Zap, MessageSquare } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface Message {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export function AICompanion() {
  const { t, language } = useLanguage();
  const { playClick, playHover } = useSoundEffects();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: t.ai.initialMessage,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingStep, setThinkingStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [streamingText, setStreamingText] = useState("");

  const thinkingSteps = language === 'en' 
    ? ["Accessing logic nodes...", "Retrieving system context...", "Synthesizing response..."]
    : ["Mengakses node logika...", "Mengambil konteks sistem...", "Mensintesis respons..."];

  // Update initial message when language changes
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === "assistant") {
      setMessages([
        {
          role: "assistant",
          content: t.ai.initialMessage,
        },
      ]);
    }
  }, [t.ai.initialMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping, thinkingStep, streamingText]);

  const streamResponse = useCallback((text: string) => {
    setStreamingText("");
    let currentText = "";
    const words = text.split(" ");
    let i = 0;

    const interval = setInterval(() => {
      if (i < words.length) {
        currentText += (i === 0 ? "" : " ") + words[i];
        setStreamingText(currentText);
        i++;
      } else {
        clearInterval(interval);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: text },
        ]);
        setStreamingText("");
        setIsTyping(false);
        setThinkingStep(0);
      }
    }, 50);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    playClick();
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    // Simulated multi-step thinking
    for (let step = 0; step < thinkingSteps.length; step++) {
      setThinkingStep(step + 1);
      await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 500));
    }

    let responseContent = t.ai.defaultResponse;
    const lowerInput = currentInput.toLowerCase();
    const knowledgeBase = t.ai.knowledge || [];

    // Simple context awareness: if they say "tell me more" or similar
    const isFollowUp = ["more", "detail", "explain", "lanjut", "jelaskan", "lagi"].some(k => lowerInput.includes(k));
    
    if (isFollowUp && messages.length > 1) {
      const lastAssistantMsg = [...messages].reverse().find(m => m.role === "assistant");
      if (lastAssistantMsg) {
        responseContent = language === 'en' 
          ? `Regarding "${lastAssistantMsg.content.substring(0, 30)}...", Mulky's approach is always rooted in the 'Aceh Subtle' philosophy: maximum impact with minimal noise. It's about building systems that last, not just features that trend.`
          : `Terkait "${lastAssistantMsg.content.substring(0, 30)}...", pendekatan Mulky selalu berakar pada filosofi 'Aceh Subtle': dampak maksimal dengan kebisingan minimal. Ini tentang membangun sistem yang bertahan lama, bukan sekadar fitur yang sedang tren.`;
      }
    } else {
      for (const entry of knowledgeBase) {
        if (entry.keywords.some((k) => lowerInput.includes(k))) {
          responseContent = entry.response;
          break;
        }
      }
    }

    streamResponse(responseContent);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col h-[600px] sm:h-[700px] relative">
      {/* Header Info */}
      <div className="flex items-center justify-between px-4 py-3 mb-4 glass rounded-2xl border border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0a0a0a] animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-medium">Mulky v1.0.4-L</h3>
            <p className="text-[10px] text-emerald-500/80 uppercase tracking-widest font-mono">System Active</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide mask-fade-top"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-3 max-w-[90%] sm:max-w-[85%] ${
                  m.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0 flex items-center justify-center border border-white/10 ${
                    m.role === "user" ? "bg-white/5" : "bg-primary/10"
                  }`}
                >
                  {m.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div
                  className={`relative p-4 rounded-2xl text-sm sm:text-base leading-relaxed ${
                    m.role === "user"
                      ? "glass-dark border-primary/10"
                      : "glass border-white/5"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Thinking / Streaming Indicator */}
          {(isTyping || streamingText) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex gap-3 flex-row max-w-[85%]">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-primary/10">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                </div>
                <div className="space-y-2">
                  {thinkingStep > 0 && !streamingText && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit">
                      <Terminal className="w-3 h-3 text-primary/60" />
                      <span className="text-[10px] font-mono text-white/40 italic">
                        {thinkingSteps[thinkingStep - 1]}
                      </span>
                    </div>
                  )}
                  <div className="p-4 rounded-2xl glass min-h-[50px] flex items-center">
                    {streamingText ? (
                      <span className="text-sm sm:text-base leading-relaxed">
                        {streamingText}
                        <span className="inline-block w-1.5 h-4 ml-1 bg-primary animate-pulse" />
                      </span>
                    ) : (
                      <div className="flex gap-1.5 items-center px-2">
                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4">
        <div className="relative glass rounded-3xl p-2.5 flex items-center gap-2 border border-white/10 group focus-within:border-primary/30 transition-all duration-500 shadow-2xl">
          <div className="absolute -left-12 hidden lg:flex flex-col gap-2 opacity-20 group-focus-within:opacity-50 transition-opacity">
            <Zap className="w-5 h-5" />
            <MessageSquare className="w-5 h-5" />
          </div>
          
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            onMouseEnter={playHover}
            placeholder={t.ai.placeholder}
            className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-sm sm:text-base placeholder:text-white/10"
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            onMouseEnter={playHover}
            className="p-3 bg-primary/20 hover:bg-primary/30 text-primary rounded-2xl transition-all duration-300 disabled:opacity-20 disabled:grayscale"
            aria-label={t.ai.inputLabel}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[10px] text-center mt-4 text-white/20 uppercase tracking-[0.2em]">
          {t.ai.disclaimer}
        </p>
      </div>
    </div>
  );
}
