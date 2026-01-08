"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, CreditCard, Copy, Check, Info } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export function Donation() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const { playClick, playHover } = useSoundEffects();

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    playClick();
    setTimeout(() => setCopied(null), 2000);
  };

    const donationMethods = [
    {
      id: "visa",
      name: "Visa / Mastercard / Online",
      bank: "Bank Jago",
      number: "4889501088363267",
      holder: "Mulky Malikul Dhaher",
      icon: <CreditCard className="w-5 h-5" />,
      color: "from-[#FF4B2B] to-[#FF416C]",
      logo: "VISA / MASTERCARD"
    },
    {
      id: "bsi",
      name: "Bank Syariah Indonesia",
      bank: "BSI",
      number: "1055129734",
      holder: "Mulky Malikul Dhaher",
      icon: <Info className="w-5 h-5" />,
      color: "from-[#00A39E] to-[#006663]",
      logo: "BSI"
    }
  ];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { playClick(); setIsOpen(true); }}
          onMouseEnter={playHover}
          className="group relative flex items-center justify-center p-4 bg-primary rounded-full shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-500"
        >
          <Heart className="w-6 h-6 text-black fill-black group-hover:scale-110 transition-transform" />
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileHover={{ opacity: 1, x: 0 }}
             className="absolute right-full mr-4 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl whitespace-nowrap pointer-events-none"
          >
            <span className="text-xs font-medium tracking-widest uppercase">Support the Creator</span>
          </motion.div>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md glass-vision overflow-hidden rounded-[2.5rem] border-white/10"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="heading-display text-2xl sm:text-3xl mb-1">Support My Work</h2>
                    <p className="text-xs text-white/40 uppercase tracking-widest">Mulky Malikul Dhaher</p>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-3 glass rounded-2xl hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {donationMethods.map((method) => (
                    <div 
                      key={method.id}
                      className="group relative p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-500"
                    >
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${method.color} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity`} />
                      
                      <div className="relative flex items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-2xl bg-gradient-to-br ${method.color} text-white shadow-lg`}>
                            {method.icon}
                          </div>
                          <div>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest">{method.bank}</p>
                            <h3 className="font-semibold text-white">{method.name}</h3>
                          </div>
                        </div>
                        <div className="px-3 py-1 glass-dark rounded-lg text-[9px] font-bold tracking-tighter text-white/40 border border-white/5 uppercase">
                          {method.logo}
                        </div>
                      </div>

                      <div className="relative flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5 group-hover:bg-black/60 transition-colors">
                        <div className="overflow-hidden mr-4">
                          <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] mb-1">Account Number</p>
                          <p className="font-mono text-sm tracking-wider text-white truncate">{method.number}</p>
                        </div>
                        <button
                          onClick={() => handleCopy(method.number, method.id)}
                          className="flex-shrink-0 p-2.5 glass rounded-xl hover:bg-white/10 transition-colors"
                        >
                          {copied === method.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between px-1">
                         <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                           <p className="text-[10px] text-white/40 uppercase tracking-widest">{method.holder}</p>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                  <p className="text-[10px] text-white/30 leading-relaxed uppercase tracking-widest px-4">
                    Your contribution helps me keep building and maintaining open-source systems. Thank you!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
