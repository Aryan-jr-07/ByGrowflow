"use client";
// components/ui/Badge.tsx
import { cn } from "@/lib/utils";

const PLATFORM_COLORS: Record<string, string> = {
  Reel: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Short: "bg-red-500/10 text-red-400 border-red-500/20",
  TikTok: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  YouTube: "bg-red-600/10 text-red-500 border-red-600/20",
};

interface BadgeProps {
  label: string;
  className?: string;
}

export function Badge({ label, className }: BadgeProps) {
  const colorClass =
    PLATFORM_COLORS[label] || "bg-accent/10 text-accent border-accent/20";
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border font-body tracking-wide",
        colorClass,
        className
      )}
    >
      {label}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    New: "bg-accent/10 text-accent border-accent/20",
    "In Progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Closed: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border font-body",
        colors[status] || colors["New"]
      )}
    >
      {status}
    </span>
  );
}
