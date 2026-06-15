"use client";
// components/sections/Portfolio.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface Project {
  id: string;
  title: string;
  platform: string;
  thumbnailUrl?: string;
  videoUrl: string;
  clientName: string;
  featured?: boolean;
}

const PLATFORM_GRADIENTS: Record<string, string> = {
  Reel: "from-pink-900/40 via-surface to-bg",
  Short: "from-red-900/40 via-surface to-bg",
  TikTok: "from-purple-900/40 via-surface to-bg",
  YouTube: "from-red-800/40 via-surface to-bg",
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export function Portfolio({ projects }: { projects: Project[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="portfolio" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header — same pattern as Services for visual consistency */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-accent" />
              <span className="font-body text-accent text-sm font-medium tracking-widest uppercase">
                My Work
              </span>
            </div>
            <h2 className="font-display font-black text-[clamp(36px,5vw,64px)] text-primary tracking-tight leading-[1.05]">
              Content That{" "}
              <span className="accent-gradient-text">Actually Converts</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-secondary text-sm max-w-xs leading-relaxed md:text-right md:pb-1"
          >
            A selection of projects across Reels, Shorts, and TikTok for brands
            across the globe.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {projects.slice(0, 6).map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariant}
              className="group relative rounded-2xl overflow-hidden border border-border bg-surface aspect-[4/5] cursor-pointer glow-lime-hover"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  PLATFORM_GRADIENTS[project.platform] ??
                  "from-accent/5 via-surface to-bg"
                }`}
              />

              {/* Decorative platform text */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                <p className="font-display font-black text-[80px] text-white/[0.03] uppercase tracking-tight select-none">
                  {project.platform}
                </p>
              </div>

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-[0_0_30px_rgba(200,255,0,0.4)]">
                  <Play size={20} fill="#0D0D0D" className="ml-0.5" />
                </div>
                <span className="font-body text-white text-sm font-medium tracking-wide">
                  View Project
                </span>
              </motion.div>

              {/* Card footer */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <Badge label={project.platform} className="mb-2" />
                <h3 className="font-display font-bold text-base text-primary leading-tight">
                  {project.title}
                </h3>
                <p className="font-body text-secondary text-xs mt-1">
                  {project.clientName}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
