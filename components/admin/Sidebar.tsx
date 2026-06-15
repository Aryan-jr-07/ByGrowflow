// components/admin/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Inbox,
  FolderOpen,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND_NAME } from "@/content/content";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar w-64 min-h-screen flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="font-display font-black text-[#0D0D0D] text-sm">B</span>
          </div>
          <div>
            <p className="font-display font-bold text-primary text-sm leading-none">{BRAND_NAME}</p>
            <p className="font-body text-secondary text-xs mt-0.5">Admin</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              id={`sidebar-${item.label.toLowerCase()}`}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm font-medium transition-all",
                active
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "text-secondary hover:text-primary hover:bg-white/5"
              )}
            >
              <Icon size={16} className={active ? "text-accent" : ""} />
              {item.label}
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-accent"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-border space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm font-medium text-secondary hover:text-primary hover:bg-white/5 transition-all"
        >
          <ExternalLink size={16} />
          View Site
        </Link>
        <button
          id="sidebar-logout"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm font-medium text-secondary hover:text-red-400 hover:bg-red-400/5 transition-all w-full"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
