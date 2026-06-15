"use client";
// components/sections/Contact.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { CONTACT } from "@/content/content";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company name is required"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(20, "Brief must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

const inputClass = cn(
  "w-full bg-bg border border-border rounded-xl px-4 py-3.5 font-body text-primary text-sm placeholder:text-secondary",
  "focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
);

const labelClass = "block font-body font-medium text-secondary text-xs uppercase tracking-wider mb-2";
const errorClass = "mt-1.5 text-red-400 text-xs font-body";

export function Contact({ calendlyUrl }: { calendlyUrl: string }) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");

      toast.success("Message sent! I'll get back to you within 24 hours.", {
        duration: 5000,
        style: {
          background: "#151515",
          color: "#F2F2F2",
          border: "1px solid #C8FF00",
          borderRadius: "12px",
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
        },
      });
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.", {
        style: {
          background: "#151515",
          color: "#F2F2F2",
          border: "1px solid #ff4444",
          borderRadius: "12px",
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-accent" />
              <span className="font-body text-accent text-sm font-medium tracking-widest uppercase">
                Contact
              </span>
            </div>
            <h2 className="font-display font-black text-[clamp(36px,5vw,60px)] text-primary tracking-tight mb-4 leading-tight">
              {CONTACT.headline}
            </h2>
            <p className="font-body text-secondary text-lg leading-relaxed mb-12">
              {CONTACT.subline}
            </p>

            {/* Divider + Calendly */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-start">
                <span className="pr-4 bg-bg font-body text-secondary text-sm">
                  Prefer to talk directly?
                </span>
              </div>
            </div>

            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="contact-book-call"
              className="inline-flex items-center gap-2 font-body text-primary text-sm border border-border bg-surface hover:border-accent/30 hover:bg-accent/5 rounded-xl px-5 py-3 transition-colors"
            >
              📅 Book a Free 15-Min Call on Calendly →
            </a>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form
              id="contact-form"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 bg-surface border border-border rounded-2xl p-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className={labelClass}>Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your full name"
                    className={cn(inputClass, errors.name && "border-red-500/50")}
                    {...register("name")}
                  />
                  {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className={labelClass}>Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@company.com"
                    className={cn(inputClass, errors.email && "border-red-500/50")}
                    {...register("email")}
                  />
                  {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                </div>
              </div>

              {/* Company */}
              <div>
                <label htmlFor="contact-company" className={labelClass}>Company</label>
                <input
                  id="contact-company"
                  type="text"
                  placeholder="Your brand or company name"
                  className={cn(inputClass, errors.company && "border-red-500/50")}
                  {...register("company")}
                />
                {errors.company && <p className={errorClass}>{errors.company.message}</p>}
              </div>

              {/* Budget */}
              <div>
                <label htmlFor="contact-budget" className={labelClass}>Budget Range</label>
                <select
                  id="contact-budget"
                  className={cn(inputClass, "cursor-pointer", errors.budget && "border-red-500/50")}
                  {...register("budget")}
                >
                  <option value="">Select your budget</option>
                  {CONTACT.budgetOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors.budget && <p className={errorClass}>{errors.budget.message}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className={labelClass}>Project Brief</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Tell me about your brand, your audience, and what you need..."
                  className={cn(inputClass, "resize-none", errors.message && "border-red-500/50")}
                  {...register("message")}
                />
                {errors.message && <p className={errorClass}>{errors.message.message}</p>}
              </div>

              <Button
                type="submit"
                variant="filled"
                size="lg"
                className="w-full"
                loading={loading}
              >
                {loading ? "Sending..." : "Send My Brief →"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
