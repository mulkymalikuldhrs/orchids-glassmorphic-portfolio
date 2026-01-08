"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitHubProjectCard } from "@/components/GitHubProjectCard";
import { useLanguage } from "@/hooks/useLanguage";
import { Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
}

export default function ProjectsPage() {
  const { t, language } = useLanguage();
  const { playClick, playHover } = useSoundEffects();
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<string | null>(null);

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/github");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setRepos(data.repos);
      setLastFetched(data.fetchedAt);
    } catch (err) {
      setError(language === "en" ? "Failed to load repositories" : "Gagal memuat repositori");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <div className="container mx-auto px-6 py-20 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <h1 className="heading-display text-4xl sm:text-5xl mb-4 sm:mb-6">{t.projects.title}</h1>
          <p className="text-subtle text-sm sm:text-base mb-4">
            {language === "en"
              ? "Live GitHub repositories. Auto-synced and always up to date."
              : "Repositori GitHub langsung. Sinkronisasi otomatis dan selalu terbaru."}
          </p>
          
          {/* Contributor Invitation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8 p-4 glass-vision border-primary/20 rounded-2xl bg-primary/5"
          >
            <h2 className="text-primary text-sm font-semibold mb-1 uppercase tracking-widest">
              {language === "en" ? "Contributors Welcome" : "Selamat Datang Kontributor"}
            </h2>
            <p className="text-xs text-white/60 leading-relaxed">
              {language === "en" 
                ? "I am actively looking for collaborators and contributors for my open-source projects. Whether you are fixing bugs, adding features, or improving documentation, your help is highly valued."
                : "Saya aktif mencari kolaborator dan kontributor untuk proyek sumber terbuka saya. Baik Anda memperbaiki bug, menambah fitur, atau meningkatkan dokumentasi, bantuan Anda sangat berharga."}
            </p>
          </motion.div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                playClick();
                fetchRepos();
              }}
              onMouseEnter={playHover}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 glass rounded-full text-xs hover:bg-white/10 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>{language === "en" ? "Refresh" : "Segarkan"}</span>
            </button>
            {lastFetched && (
              <span className="text-[10px] text-white/30 uppercase tracking-wider">
                {language === "en" ? "Synced" : "Disinkronkan"}{" "}
                {new Date(lastFetched).toLocaleTimeString()}
              </span>
            )}
          </div>
        </motion.div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
          <p className="text-sm text-white/40">
            {language === "en" ? "Fetching repositories..." : "Mengambil repositori..."}
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <AlertCircle className="w-8 h-8 text-red-400/50" />
          <p className="text-sm text-white/40">{error}</p>
          <button
            onClick={() => {
              playClick();
              fetchRepos();
            }}
            className="px-4 py-2 glass rounded-full text-xs hover:bg-white/10 transition-all"
          >
            {language === "en" ? "Try Again" : "Coba Lagi"}
          </button>
        </div>
      ) : repos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <p className="text-sm text-white/40">
            {language === "en" ? "No repositories found" : "Tidak ada repositori ditemukan"}
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <span className="text-xs text-white/30 uppercase tracking-widest">
              {repos.length} {language === "en" ? "repositories" : "repositori"}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo, index) => (
              <GitHubProjectCard
                key={repo.id}
                name={repo.name}
                description={repo.description}
                url={repo.url}
                homepage={repo.homepage}
                language={repo.language}
                stars={repo.stars}
                forks={repo.forks}
                topics={repo.topics}
                updatedAt={repo.updatedAt}
                delay={index * 0.05}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
