"use client";
// components/layout/Navbar.tsx
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, BRAND_NAME } from "@/content/content";
import { cn } from "@/lib/utils";

export function Navbar({ calendlyUrl }: { calendlyUrl: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "glass border-b border-border py-3"
            : "bg-transparent py-5"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            id="navbar-logo"
          >
            <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="font-display font-black text-bg text-sm">B</span>
            </div>
            <span className="font-display font-bold text-primary group-hover:text-white transition-colors text-lg tracking-tight">
              {BRAND_NAME}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                id={`nav-link-${link.label.toLowerCase()}`}
                onClick={() => scrollTo(link.href)}
                className="text-secondary hover:text-primary transition-colors font-body text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              id="nav-book-call"
              variant="outline"
              size="sm"
              onClick={() => scrollTo("#book-a-call")}
            >
              Book a Call
            </Button>
            <Button
              id="nav-start-project"
              variant="filled"
              size="sm"
              onClick={() => scrollTo("#contact")}
            >
              Start a Project
            </Button>
          </div>

          {/* Mobile Right */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl border border-border text-secondary hover:text-primary hover:border-border transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-72 bg-bg border-l border-border z-40 md:hidden flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                <span className="font-display font-bold text-primary">{BRAND_NAME}</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg text-secondary hover:text-primary hover:bg-white/5 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex flex-col px-6 py-6 gap-4 flex-1">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="text-secondary hover:text-primary transition-colors font-body text-base font-medium text-left py-2"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              <div className="flex flex-col gap-3 px-6 pb-8">
                <Button variant="outline" size="md" className="w-full" onClick={() => scrollTo("#book-a-call")}>
                  Book a Call
                </Button>
                <Button variant="filled" size="md" className="w-full" onClick={() => scrollTo("#contact")}>
                  Start a Project
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
