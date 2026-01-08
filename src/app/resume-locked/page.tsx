"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, MessageCircle, Download, ExternalLink, CreditCard, Loader2, CheckCircle, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";

const ACCESS_TOKEN_KEY = "resume_access_token";

function PaymentForm({ 
  onSuccess, 
  accessToken 
}: { 
  onSuccess: () => void; 
  accessToken: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !isReady) return;

    setIsProcessing(true);
    setError(null);

    const { error: submitError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (submitError) {
      setError(submitError.message || "Payment failed");
      setIsProcessing(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      const confirmRes = await fetch("/api/confirm-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          paymentIntentId: paymentIntent.id,
          accessToken
        }),
      });

      if (confirmRes.ok) {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        onSuccess();
      } else {
        setError("Failed to confirm payment. Please contact support.");
      }
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl overflow-hidden bg-white/[0.02] border border-white/10 p-4 max-h-[300px] overflow-y-auto">
        <PaymentElement 
          onReady={() => setIsReady(true)}
          options={{
            layout: "tabs",
          }}
        />
      </div>
      
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-xs text-center"
        >
          {error}
        </motion.p>
      )}
      
      <button
        type="submit"
        disabled={!stripe || !elements || isProcessing || !isReady}
        className="w-full py-4 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 hover:from-emerald-500/30 hover:to-emerald-600/30 border border-emerald-500/30 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processing...</span>
          </>
        ) : !isReady ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4" />
            <span>Pay $1.00</span>
          </>
        )}
      </button>
    </form>
  );
}

export default function ResumeLockedPage() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const checkStoredAccess = useCallback(async () => {
    const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (storedToken) {
      const res = await fetch("/api/verify-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: storedToken }),
      });
      const data = await res.json();
      if (data.valid) {
        setIsUnlocked(true);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkStoredAccess();
  }, [checkStoredAccess]);

  const handleUnlock = () => {
    if (password === "mulkymalikuldhr") {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Halo Mulky, saya ingin meminta akses untuk melihat Curriculum Vitae Anda.");
    window.parent.postMessage({ 
      type: "OPEN_EXTERNAL_URL", 
      data: { url: `https://wa.me/6285322624048?text=${message}` } 
    }, "*");
  };

  const handleBuyAccess = async () => {
    setShowPayment(true);
    
    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "" }),
    });
    
    const data = await res.json();
    if (data.clientSecret) {
      setClientSecret(data.clientSecret);
      setAccessToken(data.accessToken);
    }
  };

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setIsUnlocked(true);
      setShowPayment(false);
      setPaymentSuccess(false);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-20 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-xs text-white/40 uppercase tracking-widest">Checking access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-20 min-h-screen flex items-center justify-center">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="locked"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="max-w-md w-full"
          >
            <GlassCard className="text-center p-8 sm:p-12">
              <AnimatePresence mode="wait">
                {paymentSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 mx-auto mb-6 flex items-center justify-center border border-emerald-500/30">
                      <CheckCircle className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h2 className="heading-display text-xl sm:text-2xl mb-2">Payment Successful!</h2>
                    <p className="text-xs text-white/50">Unlocking your access...</p>
                  </motion.div>
                ) : showPayment ? (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <button
                        onClick={() => {
                          setShowPayment(false);
                          setClientSecret(null);
                        }}
                        className="p-2 glass-dark rounded-lg border border-white/5 hover:bg-white/10 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <h2 className="heading-display text-lg">Buy Resume Access</h2>
                    </div>

                    <div className="glass-dark rounded-xl p-4 mb-6 border border-white/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-primary" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium">Resume Access</p>
                            <p className="text-[10px] text-white/40">Lifetime access to CV</p>
                          </div>
                        </div>
                        <p className="text-lg font-bold text-emerald-400">$1.00</p>
                      </div>
                    </div>

                    {clientSecret ? (
                      <Elements
                        stripe={stripePromise}
                        options={{
                          clientSecret,
                          appearance: {
                            theme: "night",
                            variables: {
                              colorPrimary: "#10b981",
                              colorBackground: "#0a0a0a",
                              colorText: "#ffffff",
                              colorDanger: "#ef4444",
                              fontFamily: "system-ui, sans-serif",
                              borderRadius: "12px",
                            },
                          },
                        }}
                      >
                        <PaymentForm 
                          onSuccess={handlePaymentSuccess} 
                          accessToken={accessToken || ""}
                        />
                      </Elements>
                    ) : (
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-6 h-6 animate-spin text-white/40" />
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="main"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full glass-dark mx-auto mb-6 sm:mb-8 flex items-center justify-center border border-white/10">
                      <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    
                    <h2 className="heading-display text-xl sm:text-2xl mb-4">Akses Terbatas</h2>
                    <p className="text-xs sm:text-sm text-subtle mb-8 sm:mb-10 leading-relaxed">
                      Ini adalah filter sosial, bukan keamanan teknis. Silakan minta akses melalui WhatsApp atau beli akses.
                    </p>

                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                          placeholder="Masukkan kata sandi..."
                          className={`w-full glass-dark rounded-xl px-4 py-3 text-sm border transition-colors outline-none ${
                            error ? "border-red-500/50 text-red-200" : "border-white/5 focus:border-primary/50"
                          }`}
                        />
                        {error && (
                          <p className="absolute -bottom-6 left-0 right-0 text-[10px] text-red-500 uppercase tracking-widest">
                            Kata sandi salah
                          </p>
                        )}
                      </div>

                      <button
                        onClick={handleUnlock}
                        className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-all"
                      >
                        Buka Akses
                      </button>

                      <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-white/5"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="px-4 text-[10px] text-white/30 uppercase tracking-widest bg-transparent">atau</span>
                        </div>
                      </div>

                      <button
                        onClick={handleBuyAccess}
                        className="w-full py-3 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 hover:from-emerald-500/30 hover:to-emerald-600/30 border border-emerald-500/30 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Beli Akses — $1.00</span>
                      </button>

                      <div className="pt-4 border-t border-white/5 mt-6 sm:mt-8">
                        <button
                          onClick={handleWhatsApp}
                          className="flex items-center justify-center gap-2 w-full text-[10px] sm:text-xs text-white/40 hover:text-white transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span>Minta Akses via WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl w-full"
          >
            <GlassCard className="p-8 sm:p-12">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-12 sm:mb-16">
                <div>
                  <h1 className="heading-display text-3xl sm:text-4xl mb-2">Curriculum Vitae</h1>
                  <div className="flex items-center gap-4">
                    <p className="text-primary text-[10px] sm:text-sm tracking-[0.2em] uppercase font-medium">Mulky Malikul Dhaher</p>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    <p className="text-white/40 text-[10px] sm:text-xs">Lhokseumawe, Aceh, Indonesia</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="p-3 glass-dark rounded-xl border border-white/5">
                    <Unlock className="w-5 h-5 text-green-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                  <section>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-8 pb-2 border-b border-white/5 font-bold">Experience</h3>
                    <div className="space-y-10">
                      <div className="relative pl-8 border-l border-white/10 group">
                        <div className="absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)] group-hover:scale-125 transition-transform" />
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                          <h4 className="font-semibold text-lg">Maintenance Technician & Panel Operator</h4>
                          <span className="text-[10px] text-white/30 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">2021 — Present</span>
                        </div>
                        <p className="text-xs text-primary/80 mb-4 font-medium uppercase tracking-wider">PT Yoga Wibawa Mandiri (Packing Plant Semen Padang)</p>
                        <ul className="text-sm text-white/50 font-light leading-relaxed space-y-2 list-disc list-outside ml-4">
                          <li>Conduct preventive and corrective machine maintenance, reducing equipment downtime by 25%.</li>
                          <li>Monitor and operate industrial control panels to ensure production continuity.</li>
                          <li>Perform diagnostics and timely repairs, improving operational efficiency by 10%.</li>
                        </ul>
                      </div>

                      <div className="relative pl-8 border-l border-white/10 group">
                        <div className="absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-primary/50 transition-colors" />
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                          <h4 className="font-semibold text-lg">Freight Administration</h4>
                          <span className="text-[10px] text-white/30 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">2016 — 2018</span>
                        </div>
                        <p className="text-xs text-white/40 mb-4 font-medium uppercase tracking-wider">PT Yoga Wibawa Mandiri</p>
                        <ul className="text-sm text-white/50 font-light leading-relaxed space-y-2 list-disc list-outside ml-4">
                          <li>Managed shipment documents, transport schedules, and daily material logs.</li>
                          <li>Increased tracking accuracy by 20% and reduced delivery times by 15% through system automation.</li>
                          <li>Negotiated carrier contracts, reducing freight costs by 10%.</li>
                        </ul>
                      </div>

                      <div className="relative pl-8 border-l border-white/10 group">
                        <div className="absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-primary/50 transition-colors" />
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                          <h4 className="font-semibold text-lg">Waiter</h4>
                          <span className="text-[10px] text-white/30 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">2016 — 2017</span>
                        </div>
                        <p className="text-xs text-white/40 mb-4 font-medium uppercase tracking-wider">Modern Corner — Klang, Malaysia</p>
                        <p className="text-sm text-white/50 font-light leading-relaxed">
                          Managed over 50 orders per shift while ensuring exceptional customer service in a high-pressure environment.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-8 pb-2 border-b border-white/5 font-bold">Education</h3>
                    <div className="space-y-8">
                      <div>
                        <h4 className="font-medium text-base">SMK Negeri 2 Lhokseumawe</h4>
                        <p className="text-xs text-white/40 mb-2">Multimedia (Teknik Informatika) · 2012 — 2015</p>
                        <p className="text-sm text-primary/60 font-medium">GPA: 85.2</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-base">Universitas Malikussaleh</h4>
                        <p className="text-xs text-white/40">Teknik Elektro · 2015 — 2016 (Completed basic courses)</p>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="space-y-12">
                  <section>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-6 pb-2 border-b border-white/5 font-bold">Primary Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Technical Maintenance", "Panel Operation", "Troubleshooting", "Admin & Documentation", "Community Support", "Content Writing"].map(s => (
                        <span key={s} className="px-3 py-1.5 glass-dark rounded-lg text-[10px] text-white/60 border border-white/5">
                          {s}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-6 pb-2 border-b border-white/5 font-bold">Digital Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Adobe Photoshop", "Adobe Premiere", "Adobe Illustrator", "Final Cut Pro", "Linux OS", "Networking", "Web3 Basics", "AI Implementation"].map(s => (
                        <span key={s} className="px-3 py-1.5 glass-dark rounded-lg text-[10px] text-primary/70 border border-primary/10">
                          {s}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-6 pb-2 border-b border-white/5 font-bold">Certifications</h3>
                    <div className="space-y-4">
                      <div className="p-3 glass-dark rounded-xl border border-white/5">
                        <p className="text-[11px] font-medium text-white/80">Ethical Hacking & Penetration Testing</p>
                        <p className="text-[9px] text-white/30 uppercase tracking-widest mt-1">2019</p>
                      </div>
                      <div className="p-3 glass-dark rounded-xl border border-white/5">
                        <p className="text-[11px] font-medium text-white/80">EF SET English Certificate</p>
                        <p className="text-[9px] text-white/30 uppercase tracking-widest mt-1">2020</p>
                      </div>
                    </div>
                  </section>

                  <div className="p-6 glass rounded-2xl border border-white/5 bg-white/[0.02]">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Interests</h4>
                    <p className="text-xs text-white/50 leading-relaxed font-light">
                      Web3, Crypto, AI, Multimedia, Industrial Systems, Self-Learning, Martial Arts.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-16 sm:mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">
                  Private Document · Mulky Malikul Dhaher
                </p>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-[10px] text-white/40 hover:text-white transition-colors uppercase tracking-widest">
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF Version</span>
                  </button>
                  <button className="flex items-center gap-2 text-[10px] text-white/40 hover:text-white transition-colors uppercase tracking-widest">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
