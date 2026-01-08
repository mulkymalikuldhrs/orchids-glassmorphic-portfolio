"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, ChevronRight, X, Minus, Square } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface CommandResponse {
  type: "text" | "error" | "success" | "list";
  content: string | string[];
}

export function Terminal() {
  const { t, language } = useLanguage();
  const { playClick, playHover } = useSoundEffects();
  const [history, setHistory] = useState<{ cmd: string; resp: CommandResponse }[]>([
    { cmd: "system --boot", resp: { type: "success", content: language === 'en' ? "MULKY_OS_KERNEL Loaded." : "KERNEL_MULKY_OS Dimuat." } }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

    const commands: Record<string, (args: string[]) => CommandResponse> = {
      help: () => ({
        type: "list",
        content: language === 'en' 
          ? ["ls - list directory", "cat [file] - read file", "projects - show portfolio", "clear - clear terminal", "whoami - system info", "contact - get contact info", "date - current time", "uname - OS details", "pwd - current path", "hostname - system name"]
          : ["ls - daftar direktori", "cat [file] - baca file", "projects - tampilkan portofolio", "clear - hapus terminal", "whoami - info sistem", "contact - info kontak", "date - waktu sistem", "uname - detail OS", "pwd - lokasi saat ini", "hostname - nama sistem"]
      }),
      ls: (args) => {
        if (args.includes("-l")) {
          return {
            type: "list",
            content: [
              "drwxr-xr-x  2  mulky  staff   64B  Oct 12  projects",
              "-rw-r--r--  1  mulky  staff  1.2K  Oct 12  about.md",
              "-rw-r--r--  1  mulky  staff  4.5K  Oct 12  resume.pdf",
              "-rwxr-xr-x  1  mulky  staff   89B  Oct 12  contact.sh",
              "-rw-------  1  mulky  staff  128B  Oct 12  brain.core"
            ]
          };
        }
        return {
          type: "text",
          content: "about.md  projects/  resume.pdf  contact.sh  brain.core"
        };
      },
      whoami: () => ({
        type: "text",
        content: language === 'en'
          ? "MULKY_OS v1.0.4-L | Kernel: Aceh-Subtle-v2 | User: Guest"
          : "MULKY_OS v1.0.4-L | Kernel: Aceh-Subtle-v2 | Pengguna: Tamu"
      }),
      clear: () => {
        setHistory([]);
        return { type: "text", content: "" };
      },
      projects: () => ({
        type: "list",
        content: ["- Mulky AI (This)", "- Betta Core Ecosystem", "- Glassmorphic Portfolio", "- Stripe Integration Demo"]
      }),
      contact: () => ({
        type: "list",
        content: ["Email: mulkymalikuldhr@mail.com", "GitHub: github.com/mulkymalikuldhrs", "IG: @mulkymalikuldhr"]
      }),
      cat: (args) => {
        const file = args[0];
        if (!file) return { type: "error", content: "Usage: cat [file]" };
        if (file === "about.md") return { type: "text", content: "Mulky is a developer focused on minimalist, high-impact digital experiences. Born in Aceh, based in the cloud." };
        if (file === "brain.core") return { type: "text", content: "[ENCRYPTED_DATA] - Betta_Core thoughts circulating..." };
        return { type: "error", content: `File not found: ${file}` };
      },
      date: () => ({
        type: "text",
        content: new Date().toString()
      }),
      uname: () => ({
        type: "text",
        content: "MulkyOS 1.0.4-Aceh-Subtle-v2 x86_64"
      }),
      pwd: () => ({
        type: "text",
        content: "/home/mulky/portfolio"
      }),
      hostname: () => ({
        type: "text",
        content: "mulky-workspace"
      }),
      echo: (args) => ({
        type: "text",
        content: args.join(" ")
      }),
      logs: () => ({
        type: "list",
        content: [
          "[INFO] Booting Mulky_OS Aceh-Subtle-v2...",
          "[OK] Betta_Core initialized.",
          "[OK] Glassmorphic UI Engine active.",
          "[WARN] High traffic detected from Instagram referral.",
          "[INFO] Memory cleanup complete. 2.4GB free."
        ]
      })
    };


  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    playClick();
    const [cmd, ...args] = input.trim().toLowerCase().split(" ");
    const response = commands[cmd] ? commands[cmd](args) : { 
      type: "error", 
      content: language === 'en' ? `Command not found: ${cmd}. Type 'help' for options.` : `Perintah tidak ditemukan: ${cmd}. Ketik 'help' untuk bantuan.` 
    };

    if (cmd !== "clear") {
      setHistory([...history, { cmd: input, resp: response }]);
    }
    setInput("");
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl font-mono text-sm">
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-primary" />
          <span className="text-[10px] uppercase tracking-widest text-white/40">Mulky_System_Terminal</span>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-white/5" />
          <div className="w-3 h-3 rounded-full bg-white/5" />
          <div className="w-3 h-3 rounded-full bg-white/5" />
        </div>
      </div>

      {/* Content */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="text-primary/60 mb-4">
          Welcome to Mulky AI System Kernel. Type &apos;help&apos; to begin.
        </div>
        
        {history.map((entry, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-2 text-white/40">
              <ChevronRight className="w-3 h-3" />
              <span>{entry.cmd}</span>
            </div>
            {entry.resp.type === "list" ? (
              <div className="pl-5 space-y-0.5">
                {(entry.resp.content as string[]).map((item, j) => (
                  <div key={j} className="text-white/70">{item}</div>
                ))}
              </div>
            ) : (
              <div className={`pl-5 ${entry.resp.type === "error" ? "text-red-400" : "text-white/70"}`}>
                {entry.resp.content}
              </div>
            )}
          </div>
        ))}

        <form onSubmit={handleCommand} className="flex items-center gap-2 mt-4">
          <ChevronRight className="w-3 h-3 text-primary animate-pulse" />
          <input
            ref={inputRef}
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white/90 placeholder:text-white/5"
            placeholder="..."
          />
        </form>
      </div>
    </div>
  );
}
