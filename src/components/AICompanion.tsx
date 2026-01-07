"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, Sparkles } from "lucide-react";
import { GlassCard } from "./GlassCard";

const INITIAL_MESSAGE = {
  role: "assistant",
  content: "Aku adalah AI Companion Mulky. Aku tidak menjual apa pun. Aku menjelaskan cara berpikir, proyek, dan arah hidup Mulky dengan jujur. Apa yang ingin kamu ketahui?",
};

const KNOWLEDGE_BASE = [
  {
    keywords: ["siapa", "mulky", "identitas"],
    response: "Mulky adalah seorang pembangun sistem, bukan pembuat kebisingan. Ia fokus pada logika keputusan, pasar FX, dan pengembangan agen AI dengan pendekatan jangka panjang."
  },
  {
    keywords: ["proyek", "kerjaan", "ngapain"],
    response: "Saat ini Mulky sedang mengeksplorasi Quantitative Trading dan Decision Logic. Proyek-proyeknya bisa kamu lihat di bagian Projects, yang dibagi menjadi Live, In Progress, dan Konseptual."
  },
  {
    keywords: ["aceh", "asal"],
    response: "Mulky berasal dari Aceh. Filosofi 'Aceh Subtle'—tenang di luar, keras di dalam—menjadi landasan karyanya: futuristic restraint."
  },
  {
    keywords: ["tujuan", "visi"],
    response: "Visi Mulky adalah membangun 'gravity field' di mana orang yang tepat akan datang dengan sendirinya melalui karya yang deliberatif, bukan melalui validasi sosial yang ramai."
  }
];

export function AICompanion() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      let responseContent = "Aku butuh waktu untuk merenungkan itu. Secara umum, Mulky selalu mengedepankan sistem dan logika jangka panjang daripada tren sesaat.";
      
      const lowerInput = input.toLowerCase();
      for (const entry of KNOWLEDGE_BASE) {
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
    <div className="w-full max-w-2xl mx-auto flex flex-col h-[600px]">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border border-white/10 ${m.role === "user" ? "bg-white/5" : "bg-primary/20"}`}>
                  {m.role === "user" ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-primary" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "glass-dark" : "glass"}`}>
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
            placeholder="Tanyakan tentang sistem atau visi Mulky..."
            className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-sm placeholder:text-white/20"
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
