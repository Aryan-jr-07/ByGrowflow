// app/admin/settings/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface SettingsForm {
  calendly_url: string;
  pricing_visible: string;
  stat_brands: string;
  stat_videos: string;
  stat_countries: string;
  stat_turnaround: string;
}

const inputClass =
  "w-full bg-bg border border-border rounded-xl px-4 py-3.5 font-body text-primary text-sm placeholder:text-secondary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors";
const labelClass =
  "block font-body font-medium text-secondary text-xs uppercase tracking-wider mb-2";
const toastStyle = { background: "#151515", color: "#F2F2F2", borderRadius: "12px" };

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset } = useForm<SettingsForm>();

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        reset(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (data: SettingsForm) => {
    setSaving(true);
    try {
      const settings = Object.entries(data).map(([key, value]) => ({ key, value }));
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      if (!res.ok) throw new Error();
      toast.success("Settings saved!", {
        style: { ...toastStyle, border: "1px solid #C8FF00" },
      });
    } catch {
      toast.error("Failed to save", { style: { ...toastStyle, border: "1px solid #ff4444" } });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 bg-surface border border-border rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-black text-2xl text-primary">Settings</h1>
        <p className="font-body text-secondary text-sm mt-1">
          Manage your site configuration without touching code.
        </p>
      </div>

      <form id="settings-form" onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
        {/* Calendly */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-border rounded-2xl p-6"
        >
          <h2 className="font-display font-bold text-primary text-base mb-1">Calendly</h2>
          <p className="font-body text-secondary text-xs mb-5">
            Update your booking link. This will reflect on the public site and contact section immediately.
          </p>
          <div>
            <label htmlFor="settings-calendly" className={labelClass}>Calendly URL</label>
            <input
              id="settings-calendly"
              type="url"
              placeholder="https://calendly.com/your-link"
              className={inputClass}
              {...register("calendly_url")}
            />
          </div>
        </motion.div>

        {/* Pricing Visibility */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-surface border border-border rounded-2xl p-6"
        >
          <h2 className="font-display font-bold text-primary text-base mb-1">Pricing Section</h2>
          <p className="font-body text-secondary text-xs mb-5">
            Toggle the pricing section visibility on the public site.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="pricing-visible"
                value="true"
                {...register("pricing_visible")}
                className="accent-[#C8FF00]"
              />
              <label htmlFor="pricing-visible" className="font-body text-primary text-sm cursor-pointer">
                Visible
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="pricing-hidden"
                value="false"
                {...register("pricing_visible")}
                className="accent-[#C8FF00]"
              />
              <label htmlFor="pricing-hidden" className="font-body text-primary text-sm cursor-pointer">
                Hidden
              </label>
            </div>
          </div>
        </motion.div>

        {/* Homepage Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-border rounded-2xl p-6"
        >
          <h2 className="font-display font-bold text-primary text-base mb-1">Homepage Stats</h2>
          <p className="font-body text-secondary text-xs mb-5">
            Update the numbers displayed in the stats section on the home page.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="stat-brands" className={labelClass}>Brands Worked With</label>
              <input id="stat-brands" className={inputClass} placeholder="50+" {...register("stat_brands")} />
            </div>
            <div>
              <label htmlFor="stat-videos" className={labelClass}>Videos Delivered</label>
              <input id="stat-videos" className={inputClass} placeholder="200+" {...register("stat_videos")} />
            </div>
            <div>
              <label htmlFor="stat-countries" className={labelClass}>Countries Served</label>
              <input id="stat-countries" className={inputClass} placeholder="4" {...register("stat_countries")} />
            </div>
            <div>
              <label htmlFor="stat-turnaround" className={labelClass}>Avg. Turnaround</label>
              <input id="stat-turnaround" className={inputClass} placeholder="48hr" {...register("stat_turnaround")} />
            </div>
          </div>
        </motion.div>

        <Button
          id="save-settings-btn"
          type="submit"
          variant="filled"
          size="lg"
          loading={saving}
          className="w-full sm:w-auto"
        >
          {saving ? "Saving..." : "Save All Settings →"}
        </Button>
      </form>
    </div>
  );
}
