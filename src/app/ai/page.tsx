"use client";

import { motion } from "framer-motion";
import { AICompanion } from "@/components/AICompanion";

export default function AIPage() {
  return (
    <div className="container mx-auto px-6 py-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center mb-10 sm:mb-16"
      >
        <h1 className="heading-display text-4xl sm:text-5xl mb-4 sm:mb-6">AI Companion</h1>
        <p className="text-subtle text-sm sm:text-base">
          Bukan chatbot norak. Digital companion & interpreter untuk memahami cara berpikir Mulky.
        </p>
      </motion.div>

      <AICompanion />
    </div>
  );
}
