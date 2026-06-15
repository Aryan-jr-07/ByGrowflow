// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "New":
      return "text-[#C8FF00] bg-[#C8FF00]/10 border-[#C8FF00]/20";
    case "In Progress":
      return "text-blue-400 bg-blue-400/10 border-blue-400/20";
    case "Closed":
      return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    default:
      return "text-gray-400 bg-gray-400/10 border-gray-400/20";
  }
}
