"use client";
// components/ui/Ticker.tsx

interface TickerProps {
  items: string[];
  speed?: number;
}

export function Ticker({ items, speed = 25 }: TickerProps) {
  // Duplicate items for seamless looping
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-border bg-bg py-3.5">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#0D0D0D] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#0D0D0D] to-transparent z-10 pointer-events-none" />

      <div
        className="ticker-track"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6 font-display font-bold text-sm tracking-widest text-accent uppercase whitespace-nowrap"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-accent/50 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
