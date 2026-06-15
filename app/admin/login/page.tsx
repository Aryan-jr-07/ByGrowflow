// app/admin/login/page.tsx
"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BRAND_NAME } from "@/content/content";
import type { Metadata } from "next";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.replace("/admin/dashboard");
    } else {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,255,0,0.03)_0%,transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent mb-4">
            <Lock size={22} className="text-[#0D0D0D]" />
          </div>
          <h1 className="font-display font-black text-2xl text-primary">
            {BRAND_NAME}
          </h1>
          <p className="font-body text-secondary text-sm mt-1">Admin Dashboard</p>
        </div>

        {/* Form card */}
        <div className="bg-surface border border-border rounded-2xl p-8">
          <form id="admin-login-form" onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block font-body font-medium text-secondary text-xs uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@bygrowflow.com"
                className="w-full bg-bg border border-border rounded-xl px-4 py-3.5 font-body text-primary text-sm placeholder:text-secondary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="block font-body font-medium text-secondary text-xs uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3.5 pr-12 font-body text-primary text-sm placeholder:text-secondary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-secondary transition-colors"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm font-body"
              >
                {error}
              </motion.p>
            )}

            <Button
              id="login-submit"
              type="submit"
              variant="filled"
              size="lg"
              className="w-full"
              loading={loading}
            >
              {loading ? "Signing in..." : "Sign In →"}
            </Button>
          </form>
        </div>

        <p className="text-center text-secondary text-xs font-body mt-6">
          This area is restricted to admin users only.
        </p>
      </motion.div>
    </div>
  );
}
