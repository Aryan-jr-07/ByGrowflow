"use client";
// components/sections/Showreel.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { SHOWREEL } from "@/content/content";

export function Showreel() {
  const [open, setOpen] = useState(false);

  return (
    <section id="showreel" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px w-8 bg-accent" />
          <span className="font-body text-accent text-sm font-medium tracking-widest uppercase">
            {SHOWREEL.label}
          </span>
        </motion.div>

        {/* Video Thumbnail — full bleed inside container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative group cursor-pointer rounded-2xl overflow-hidden border border-border glow-lime-hover w-full"
          onClick={() => setOpen(true)}
          role="button"
          aria-label="Play showreel video"
          id="showreel-player"
        >
          <div className="aspect-video w-full bg-gradient-to-br from-surface via-bg to-bg relative overflow-hidden">
            {/* Film-strip decoration */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(200,255,0,0.1) 0px, rgba(200,255,0,0.1) 2px, transparent 2px, transparent 60px)",
              }}
            />

            {/* Brand watermark */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <p className="font-display font-black text-[clamp(32px,6vw,96px)] text-primary/[0.07] tracking-tighter uppercase select-none">
                ByGrowflow
              </p>
              <p className="font-body text-secondary/60 text-sm">Showreel 2024</p>
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-20 h-20 rounded-full bg-accent shadow-[0_0_40px_rgba(200,255,0,0.4)] group-hover:shadow-[0_0_60px_rgba(200,255,0,0.6)] transition-shadow duration-300"
              >
                <Play size={28} fill="#0D0D0D" className="ml-1 text-bg" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <Modal isOpen={open} onClose={() => setOpen(false)} size="xl">
        <div className="aspect-video w-full">
          {open && (
            <iframe
              src={`https://www.youtube.com/embed/${SHOWREEL.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="ByGrowflow Showreel 2024"
            />
          )}
        </div>
      </Modal>
    </section>
  );
}
