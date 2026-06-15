// components/admin/StatCard.tsx
"use client";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: "lime" | "blue" | "purple" | "orange";
}

const COLORS = {
  lime: { bg: "bg-accent/10", border: "border-accent/20", icon: "text-accent", value: "text-accent" },
  blue: { bg: "bg-blue-500/10", border: "border-blue-500/20", icon: "text-blue-400", value: "text-blue-400" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", icon: "text-purple-400", value: "text-purple-400" },
  orange: { bg: "bg-orange-500/10", border: "border-orange-500/20", icon: "text-orange-400", value: "text-orange-400" },
};

export function StatCard({ title, value, icon: Icon, trend, trendUp, color = "lime" }: StatCardProps) {
  const c = COLORS[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-surface border border-border rounded-2xl p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
          <Icon size={18} className={c.icon} />
        </div>
        {trend && (
          <span
            className={`font-body text-xs px-2 py-1 rounded-full border ${
              trendUp
                ? "text-accent bg-accent/10 border-accent/20"
                : "text-red-400 bg-red-400/10 border-red-400/20"
            }`}
          >
            {trendUp ? "↑" : "↓"} {trend}
          </span>
        )}
      </div>
      <div className={`font-display font-black text-3xl ${c.value} mb-1`}>{value}</div>
      <div className="font-body text-secondary text-sm">{title}</div>
    </motion.div>
  );
}
