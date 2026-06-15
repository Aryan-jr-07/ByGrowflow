// app/layout.tsx
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "ByGrowflow — Short-Form Video Editing for International Brands",
  description:
    "ByGrowflow is a professional short-form video editing service specializing in YouTube Shorts, Instagram Reels, and TikToks for brands in the US, UK, Canada, and Australia. Fast turnaround. Cinematic quality.",
  keywords: [
    "video editing",
    "reels editing",
    "shorts editor",
    "tiktok editing",
    "brand video",
    "short form content",
    "ByGrowflow",
  ],
  authors: [{ name: "ByGrowflow" }],
  creator: "ByGrowflow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bygrowflow.com",
    siteName: "ByGrowflow",
    title: "ByGrowflow — Short-Form Video Editing for International Brands",
    description:
      "Professional short-form video editing. YouTube Shorts, Instagram Reels, TikToks. 48hr turnaround. 50+ brands served.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ByGrowflow — Short-Form Video Editing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ByGrowflow — Short-Form Video Editing",
    description: "Professional short-form video editing for international brands.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
