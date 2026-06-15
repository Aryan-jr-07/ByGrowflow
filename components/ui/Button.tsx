"use client";
// components/ui/Button.tsx
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline" | "ghost" | "text";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "filled", size = "md", loading, children, disabled, ...props }, ref) => {
    const base =
      "relative inline-flex items-center justify-center font-body font-semibold tracking-tight rounded-xl transition-all duration-200 cursor-pointer select-none whitespace-nowrap";

    const variants = {
      filled:
        "bg-accent text-bg hover:bg-accent/90 active:scale-95 shadow-[0_0_24px_rgba(200,255,0,0.25)]",
      outline:
        "bg-transparent text-accent border border-accent/60 hover:border-accent hover:bg-accent/5 active:scale-95",
      ghost:
        "bg-white/5 text-primary hover:bg-white/10 active:scale-95 border border-white/10",
      text: "bg-transparent text-primary hover:text-accent underline-offset-4 hover:underline active:scale-95 p-0",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        whileHover={!isDisabled ? { scale: variant === "text" ? 1 : 1.02 } : {}}
        whileTap={!isDisabled ? { scale: 0.97 } : {}}
        className={cn(
          base,
          variants[variant],
          variant !== "text" ? sizes[size] : "",
          isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        disabled={isDisabled}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
              <path
                d="M4 12a8 8 0 018-8"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="opacity-75"
              />
            </svg>
            {children}
          </span>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
