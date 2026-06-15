"use client";
// components/sections/Services.tsx
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Film, Layers, Sparkles, ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/content/content";

const ICON_MAP: Record<string, React.ElementType> = {
  Film,
  Layers,
  Sparkles,
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header — two-col on md+: left has label+headline, right has description */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-accent" />
              <span className="font-body text-accent text-sm font-medium tracking-widest uppercase">
                What I Do
              </span>
            </div>
            <h2 className="font-display font-black text-[clamp(36px,5vw,64px)] text-primary tracking-tight leading-[1.05]">
              Services Built for{" "}
              <span className="accent-gradient-text">Social-First Brands</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-body text-secondary text-base max-w-xs leading-relaxed md:text-right md:pb-1"
          >
            Every edit is crafted for the platform, the audience, and the
            algorithm. No generic cuts.
          </motion.p>
        </div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {SERVICES.map((service, i) => {
            const Icon = ICON_MAP[service.icon];
            return (
              <motion.div
                key={i}
                variants={cardVariant}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group relative bg-surface border border-border rounded-2xl p-8 overflow-hidden cursor-default glow-lime-hover flex flex-col"
              >
                {/* Hover bg */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-transparent transition-all duration-500 rounded-2xl" />

                {/* Tag */}
                <div className="h-[29px] flex items-center mb-6">
                  {service.tag && (
                    <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-body font-medium tracking-wide">
                      {service.tag}
                    </div>
                  )}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-border/60 group-hover:bg-accent/10 border border-border group-hover:border-accent/20 flex items-center justify-center mb-6 transition-colors duration-300 relative z-10">
                  {Icon && (
                    <Icon
                      size={20}
                      className="text-secondary group-hover:text-accent transition-colors duration-300"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-xl text-primary mb-3 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-body text-secondary text-sm leading-relaxed flex-1">
                    {service.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center gap-2 text-secondary group-hover:text-accent transition-colors duration-300">
                    <span className="font-body text-xs font-medium tracking-wide uppercase">
                      Learn more
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
