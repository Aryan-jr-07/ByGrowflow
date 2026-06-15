"use client";
// components/ui/Accordion.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            "border rounded-xl overflow-hidden transition-colors duration-300",
            openIndex === i
              ? "border-accent/30 bg-accent/[0.03]"
              : "border-border bg-surface hover:border-border"
          )}
        >
          <button
            id={`faq-${i}`}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex items-center justify-between w-full px-6 py-5 text-left group"
            aria-expanded={openIndex === i}
          >
            <span
              className={cn(
                "font-display font-semibold text-base transition-colors",
                openIndex === i ? "text-accent" : "text-primary group-hover:text-white"
              )}
            >
              {item.question}
            </span>
            <span
              className={cn(
                "flex-shrink-0 ml-4 p-1.5 rounded-full border transition-all duration-300",
                openIndex === i
                  ? "bg-accent text-bg border-accent"
                  : "bg-transparent text-secondary border-border group-hover:border-border/60"
              )}
            >
              {openIndex === i ? <Minus size={14} /> : <Plus size={14} />}
            </span>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-5 text-secondary font-body text-sm leading-relaxed">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
