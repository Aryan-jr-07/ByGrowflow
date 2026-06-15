"use client";
// components/sections/BookACall.tsx
import { motion } from "framer-motion";
import { CalendlyInline } from "@/components/ui/CalendlyEmbed";
import { BOOK_A_CALL } from "@/content/content";

export function BookACall({ calendlyUrl }: { calendlyUrl: string }) {
  return (
    <section id="book-a-call" className="section-padding border-y border-border" style={{ background: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-accent" />
              <span className="font-body text-accent text-sm font-medium tracking-widest uppercase">
                Book a Call
              </span>
            </div>
            <h2 className="font-display font-black text-[clamp(32px,4.5vw,56px)] text-primary tracking-tight mb-4 leading-tight">
              {BOOK_A_CALL.headline}
            </h2>
            <p className="font-body text-secondary text-lg leading-relaxed mb-8">
              {BOOK_A_CALL.subline}
            </p>

            {/* What to expect */}
            <div className="space-y-4">
              {[
                { title: "Tell me about your brand", desc: "Your audience, goals, and current content strategy." },
                { title: "I'll share my approach", desc: "How I'd edit for your niche and what results to expect." },
                { title: "We align on next steps", desc: "Clear deliverables, timeline, and pricing — no pressure." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <span className="font-display font-bold text-accent text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-display font-semibold text-primary text-sm mb-0.5">{item.title}</p>
                    <p className="font-body text-secondary text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Calendly */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <CalendlyInline url={calendlyUrl} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
