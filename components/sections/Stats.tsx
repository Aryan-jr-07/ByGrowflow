"use client";
// components/sections/Stats.tsx
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  value: string;
  label: string;
}

function AnimatedStat({ value, label, delay }: StatItem & { delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState("0");

  useEffect(() => {
    if (!inView) return;
    // Extract numeric portion
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
    const suffix = value.replace(/[0-9.]/g, "");
    if (isNaN(numeric)) { setDisplayed(value); return; }

    const duration = 1500;
    const steps = 40;
    const increment = numeric / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, numeric);
      setDisplayed(
        `${Number.isInteger(numeric) ? Math.round(current) : current.toFixed(1)}${suffix}`
      );
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="font-display font-black text-[clamp(40px,6vw,72px)] text-accent leading-none mb-2">
        {inView ? displayed : "0"}
      </div>
      <div className="font-body text-secondary text-sm tracking-wide uppercase">{label}</div>
    </motion.div>
  );
}

interface StatsProps {
  stats: StatItem[];
}

export function Stats({ stats }: StatsProps) {
  return (
    <section id="stats" className="section-padding border-y border-border" style={{ background: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <AnimatedStat key={i} {...stat} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
