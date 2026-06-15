"use client";
// components/sections/Hero.tsx
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Ticker } from "@/components/ui/Ticker";
import { HERO } from "@/content/content";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,255,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Gradient blobs */}
      <div className="absolute top-1/3 -left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-8 flex-1 flex flex-col justify-center">
        <motion.div
          className="max-w-5xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Eyebrow */}
          <motion.div variants={item} className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-accent" />
            <span className="font-body text-accent text-sm font-medium tracking-widest uppercase">
              Short-Form Video Editor
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-display font-black text-[clamp(52px,8vw,120px)] leading-[0.95] tracking-tight text-primary mb-6 whitespace-pre-line"
          >
            {HERO.headline}
          </motion.h1>

          {/* Subline */}
          <motion.p
            variants={item}
            className="font-body text-secondary text-lg md:text-xl max-w-xl leading-relaxed mb-10"
          >
            {HERO.subline}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-4">
            <Button
              id="hero-see-work"
              variant="filled"
              size="lg"
              onClick={() => scrollTo("portfolio")}
            >
              {HERO.ctaPrimary}
            </Button>
            <button
              id="hero-book-call"
              onClick={() => scrollTo("book-a-call")}
              className="flex items-center gap-2 font-body text-secondary hover:text-primary transition-colors text-base group"
            >
              {HERO.ctaSecondary}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <Ticker items={HERO.tickerItems} />
      </motion.div>
    </section>
  );
}
