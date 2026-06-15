"use client";
// components/sections/Testimonials.tsx
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/content/content";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Testimonials() {
  return (
    <section id="testimonials" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="font-body text-accent text-sm font-medium tracking-widest uppercase">
              Client Stories
            </span>
            <div className="h-px w-8 bg-accent" />
          </div>
          <h2 className="font-display font-black text-[clamp(36px,5vw,64px)] text-primary tracking-tight">
            Results That Speak
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              className="relative bg-surface border border-border rounded-2xl p-8 glow-lime-hover hover:scale-[1.02] transition-transform duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 flex-shrink-0">
                <Quote size={18} className="text-accent" />
              </div>

              {/* Quote text */}
              <blockquote className="font-body text-primary/70 text-sm leading-relaxed mb-6 italic flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-display font-bold text-accent text-sm">
                    {t.name[0]}
                  </span>
                </div>
                <div>
                  <p className="font-display font-bold text-sm text-primary">
                    {t.name}
                  </p>
                  <p className="font-body text-secondary text-xs">
                    {t.company} · {t.country}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
