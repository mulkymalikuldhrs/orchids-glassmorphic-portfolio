"use client";

import { ExternalLink, Github, Star, GitFork, Code2 } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface GitHubProjectProps {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
  delay?: number;
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  PHP: "#4F5D95",
  Ruby: "#701516",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#239120",
  Shell: "#89e051",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
};

export function GitHubProjectCard({
  name,
  description,
  url,
  homepage,
  language,
  stars,
  forks,
  topics,
  updatedAt,
  delay = 0,
}: GitHubProjectProps) {
  const { playClick, playHover } = useSoundEffects();
  const formattedDate = new Date(updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <GlassCard
      delay={delay}
      className="group relative flex flex-col h-full border-white/5 hover:border-white/10 transition-colors"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 glass-dark rounded-2xl">
          <Github className="w-5 h-5 text-primary" />
        </div>
        {language && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: languageColors[language] || "#888" }}
            />
            <span className="text-[10px] uppercase tracking-widest text-white/50">
              {language}
            </span>
          </div>
        )}
      </div>

      <h3 className="heading-display text-xl sm:text-2xl mb-3 truncate">{name}</h3>
      <p className="text-sm text-subtle mb-4 leading-relaxed flex-grow line-clamp-3">
        {description || "No description provided."}
      </p>

      {topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="px-2 py-0.5 text-[10px] rounded-full bg-primary/10 text-primary/70 border border-primary/20"
            >
              {topic}
            </span>
          ))}
          {topics.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 text-white/40">
              +{topics.length - 4}
            </span>
          )}
        </div>
      )}

            <div className="flex items-center gap-4 text-white/40 text-xs mb-6">
              <div className="flex items-center gap-1.5" title="Stars">
                <Star className="w-3.5 h-3.5" />
                <span>{stars}</span>
              </div>
              <div className="flex items-center gap-1.5" title="Forks">
                <GitFork className="w-3.5 h-3.5" />
                <span>{forks}</span>
              </div>
              <div className="flex items-center gap-1.5 ml-auto text-emerald-400 group-hover:scale-110 transition-transform cursor-help" title="Contributors are warmly welcomed!">
                <Code2 className="w-3 h-3" />
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold">Welcoming Contributors</span>
              </div>
            </div>


      <div className="mt-auto pt-4 border-t border-white/5 flex gap-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClick}
          onMouseEnter={playHover}
          className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors"
        >
          <Github className="w-4 h-4" />
          <span>Repository</span>
        </a>
        {homepage && (
          <a
            href={homepage}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            onMouseEnter={playHover}
            className="flex items-center gap-2 text-xs text-white/40 hover:text-primary transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </GlassCard>
  );
}
