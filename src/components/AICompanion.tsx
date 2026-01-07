"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, Sparkles } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { useLanguage } from "@/hooks/useLanguage";

export function AICompanion() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: t.ai.initialMessage,
  }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update initial message when language changes
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === "assistant") {
      setMessages([{
        role: "assistant",
        content: t.ai.initialMessage,
      }]);
    }
  }, [t.ai.initialMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulated "deliberate" thinking
    setTimeout(() => {
      let responseContent = t.ai.defaultResponse;
      
      const lowerInput = input.toLowerCase();
      const knowledgeBase = t.ai.knowledge || [];
      
      for (const entry of knowledgeBase) {
        if (entry.keywords.some(k => lowerInput.includes(k))) {
          responseContent = entry.response;
          break;
        }
      }

      setMessages((prev) => [...prev, { role: "assistant", content: responseContent }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col h-[500px] sm:h-[600px]">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 sm:space-y-6 scrollbar-hide"
      >
        <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: "transform, opacity" }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
              <div className={`flex gap-2 sm:gap-3 max-w-[85%] sm:max-w-[80%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 flex items-center justify-center border border-white/10 ${m.role === "user" ? "bg-white/5" : "bg-primary/20"}`}>
                  {m.role === "user" ? <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />}
                </div>
                <div className={`p-3 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${m.role === "user" ? "glass-dark" : "glass"}`}>
                  {m.content}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex gap-3 flex-row">
                <div className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 bg-primary/20">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div className="p-4 rounded-2xl glass flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 mt-4">
        <div className="relative glass rounded-2xl p-2 flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={t.ai.placeholder}
            className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-sm placeholder:text-white/20"
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors disabled:opacity-50"
            aria-label={t.ai.inputLabel}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
