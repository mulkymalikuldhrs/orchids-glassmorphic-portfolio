
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Instagram, Github, Globe, MapPin } from 'lucide-react';

export function BusinessCard() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Card dimensions (standard business card ratio or slightly larger for quality)
      const width = 1050; // 3.5 * 300 dpi
      const height = 600; // 2 * 300 dpi
      canvas.width = width;
      canvas.height = height;

      // 1. Background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(1, '#050505');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Decorative elements (simulating the glassmorphism glows)
      ctx.beginPath();
      ctx.arc(width, 0, 300, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 150, 255, 0.1)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, height, 200, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 100, 255, 0.05)';
      ctx.fill();

      // 3. Border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, width - 20, height - 20);

      // 4. Name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 64px sans-serif';
      ctx.fillText('Mulky Malikul Dhaher', 60, 120);

      // 5. Title
      ctx.fillStyle = '#00a3ff'; // Primary color
      ctx.font = 'italic 24px sans-serif';
      ctx.letterSpacing = '4px';
      ctx.fillText('MAINTENANCE ENGINEER • SYSTEM BUILDER', 60, 170);

      // 6. Contact Info
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '28px sans-serif';
      ctx.fillText('mulkymalikuldhr@mail.com', 100, 300);
      ctx.fillText('mulkymalikuldhr.dev', 100, 360);
      ctx.fillText('Lhokseumawe, Aceh', 100, 420);

      // Simulating icons (dots)
      ctx.fillStyle = '#00a3ff';
      ctx.beginPath(); ctx.arc(75, 290, 6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(75, 350, 6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(75, 410, 6, 0, Math.PI * 2); ctx.fill();

      // 7. Footer
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      ctx.moveTo(60, 480);
      ctx.lineTo(width - 60, 480);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = 'italic 22px sans-serif';
      ctx.fillText('"Aceh Subtle: Tenang, keras di dalam."', 60, 530);

      ctx.font = '22px sans-serif';
      ctx.fillText('github.com/mulkymalikuldhrs', width - 350, 530);

      // 8. Download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `BusinessCard-MulkyMalikulDhaher.png`;
      link.href = dataUrl;
      link.click();

    } catch (err) {
      console.error('Download failed', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <div className="flex flex-col items-center text-center mb-4">
        <h2 className="text-2xl font-light tracking-tight mb-2 text-white/90">Digital Business Card</h2>
        <p className="text-sm text-white/40 font-light max-w-xs italic">
          Professional identity card for print and sharing.
        </p>
      </div>

      {/* The Visual Card (Preview) */}
      <div 
        className="relative w-[350px] h-[200px] sm:w-[400px] sm:h-[230px] glass-dark rounded-xl overflow-hidden border border-white/10 p-6 flex flex-col justify-between shadow-2xl"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.8) 100%)' }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] -mr-16 -mt-16 rounded-full" />
        
        <div className="relative z-10">
          <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white mb-1">
            Mulky Malikul Dhaher
          </h3>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-primary font-semibold">
            Maintenance Engineer • System Builder
          </p>
        </div>

        <div className="relative z-10 flex flex-col gap-2 mt-4">
          <div className="flex items-center gap-2 text-white/60">
            <Mail className="w-3 h-3" />
            <span className="text-[10px] sm:text-xs font-light">mulkymalikuldhr@mail.com</span>
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <Globe className="w-3 h-3" />
            <span className="text-[10px] sm:text-xs font-light">mulkymalikuldhr.dev</span>
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <MapPin className="w-3 h-3" />
            <span className="text-[10px] sm:text-xs font-light">Lhokseumawe, Aceh</span>
          </div>
        </div>

        <div className="relative z-10 flex justify-between items-end border-t border-white/5 pt-3">
          <div className="text-[9px] sm:text-[10px] text-white/30 italic font-light">
            "Aceh Subtle: Tenang, keras di dalam."
          </div>
          <div className="flex gap-3 text-white/40">
            <Github className="w-3 h-3" />
            <Instagram className="w-3 h-3" />
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDownload}
        disabled={isDownloading}
        className="flex items-center gap-3 px-8 py-3 glass rounded-full hover:bg-white/10 transition-all text-sm font-light text-white/80"
      >
        <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
        {isDownloading ? 'Processing...' : 'Download for Print'}
      </motion.button>
    </div>
  );
}
