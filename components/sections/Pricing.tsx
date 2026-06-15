"use client";
// components/sections/Pricing.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PRICING_TIERS } from "@/content/content";

type Billing = "monthly" | "project";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export function Pricing({ visible = true }: { visible?: boolean }) {
  const [billing, setBilling] = useState<Billing>("monthly");

  if (!visible) return null;

  return (
    <section id="pricing" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="font-body text-accent text-sm font-medium tracking-widest uppercase">
              Pricing
            </span>
            <div className="h-px w-8 bg-accent" />
          </div>
          <h2 className="font-display font-black text-[clamp(36px,5vw,64px)] text-primary tracking-tight mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="font-body text-secondary text-base max-w-md mx-auto leading-relaxed">
            No hidden fees, no surprises. Choose the plan that fits your content
            needs.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <span
            className={`font-body text-sm transition-colors ${
              billing === "monthly" ? "text-primary" : "text-secondary"
            }`}
          >
            Monthly Retainer
          </span>

          <button
            id="pricing-toggle"
            onClick={() =>
              setBilling(billing === "monthly" ? "project" : "monthly")
            }
            className="relative w-12 h-6 rounded-full bg-border border border-border/60 transition-colors"
            aria-label="Toggle billing period"
          >
            <motion.div
              className="absolute top-0.5 w-5 h-5 rounded-full bg-accent shadow-sm"
              animate={{ left: billing === "monthly" ? "2px" : "calc(100% - 22px)" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </button>

          <span
            className={`font-body text-sm transition-colors ${
              billing === "project" ? "text-primary" : "text-secondary"
            }`}
          >
            Per Project
          </span>
        </motion.div>

        {/* Tier Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {PRICING_TIERS.map((tier) => (
            <motion.div
              key={tier.id}
              variants={cardVariant}
              className={`relative rounded-2xl p-8 border flex flex-col glow-lime-hover transition-colors ${
                tier.highlighted
                  ? "bg-[#0F1400] border-accent/40"
                  : "bg-surface border-border"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-bg text-xs font-body font-bold tracking-wide whitespace-nowrap">
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Name */}
              <h3 className="font-display font-bold text-xl text-primary mb-2">
                {tier.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-4">
                <span
                  className={`font-display font-black text-5xl tracking-tight ${
                    tier.highlighted ? "text-accent" : "text-primary"
                  }`}
                >
                  ${billing === "monthly" ? tier.monthlyPrice : tier.projectPrice}
                </span>
                <span className="font-body text-secondary text-sm">
                  /{billing === "monthly" ? "mo" : "project"}
                </span>
              </div>

              <p className="font-body text-secondary text-sm leading-relaxed mb-8">
                {tier.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        tier.highlighted
                          ? "bg-accent"
                          : "bg-border border border-border"
                      }`}
                    >
                      <Check
                        size={11}
                        className={tier.highlighted ? "text-bg" : "text-accent"}
                        strokeWidth={3}
                      />
                    </div>
                    <span className="font-body text-secondary text-sm leading-snug">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                id={`pricing-cta-${tier.id}`}
                variant={tier.highlighted ? "filled" : "outline"}
                size="md"
                className="w-full"
                onClick={() =>
                  scrollTo(tier.id === "brand" ? "book-a-call" : "contact")
                }
              >
                {tier.cta}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-secondary font-body text-xs mt-8"
        >
          All prices in USD. Monthly plans billed at the start of each cycle.
          50% deposit required for project-based work.
        </motion.p>
      </div>
    </section>
  );
}
