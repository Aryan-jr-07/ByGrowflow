"use client";
// components/ui/CalendlyEmbed.tsx
import dynamic from "next/dynamic";

const InlineWidget = dynamic(
  () => import("react-calendly").then((mod) => mod.InlineWidget),
  { ssr: false, loading: () => <CalendlyLoading /> }
);

const PopupWidget = dynamic(
  () => import("react-calendly").then((mod) => mod.PopupWidget),
  { ssr: false, loading: () => null }
);

function CalendlyLoading() {
  return (
    <div className="h-[650px] w-full bg-surface rounded-2xl border border-border animate-pulse flex items-center justify-center">
      <p className="text-secondary text-sm font-body">Loading calendar...</p>
    </div>
  );
}

interface CalendlyProps {
  url: string;
}

export function CalendlyInline({ url }: CalendlyProps) {
  return (
    <div className="rounded-2xl overflow-hidden border border-border">
      <InlineWidget
        url={url}
        styles={{ height: "650px", minWidth: "320px" }}
        pageSettings={{
          backgroundColor: "0D0D0D",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "C8FF00",
          textColor: "F2F2F2",
        }}
      />
    </div>
  );
}

export function CalendlyPopup({ url, text = "Book a Call" }: CalendlyProps & { text?: string }) {
  if (typeof document === "undefined") return null;
  return (
    <PopupWidget
      url={url}
      text={text}
      color="#C8FF00"
      textColor="#0D0D0D"
      branding={false}
      rootElement={document.body}
    />
  );
}
