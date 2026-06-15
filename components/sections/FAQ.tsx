"use client";
// components/sections/FAQ.tsx
import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/Accordion";
import { FAQ_ITEMS } from "@/content/content";

export function FAQ() {
  return (
    <section id="faq" className="section-padding border-t border-border" style={{ background: "#0a0a0a" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="font-body text-accent text-sm font-medium tracking-widest uppercase">
              FAQ
            </span>
            <div className="h-px w-8 bg-accent" />
          </div>
          <h2 className="font-display font-black text-[clamp(36px,5vw,64px)] text-primary tracking-tight">
            Got Questions?
          </h2>
          <p className="font-body text-secondary mt-3 text-base">
            Here are the answers to what people ask most.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Accordion items={FAQ_ITEMS} />
        </motion.div>
      </div>
    </section>
  );
}
