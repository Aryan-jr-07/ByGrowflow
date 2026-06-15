// content/content.ts
// ============================================================
// ByGrowflow — Centralized Content & Copy
// All strings, data, and configuration lives here.
// ============================================================

export const BRAND_NAME = "ByGrowflow";
export const BRAND_TAGLINE = "Short-Form Video That Moves.";

// Calendly — overridable from SiteSetting DB (admin dashboard)
export const CALENDLY_URL = "https://calendly.com/bygrowflow/discovery";

// ---- Navbar ------------------------------------------------
export const NAV_LINKS = [
  { label: "Work", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

// ---- Hero --------------------------------------------------
export const HERO = {
  headline: "Short-Form Video\nThat Moves.",
  subline:
    "I help international brands cut through the noise with high-converting Reels, Shorts, and TikToks. Cinematic edits. Fast turnaround. Zero fluff.",
  ctaPrimary: "See My Work",
  ctaSecondary: "Book a Free Discovery Call →",
  tickerItems: [
    "SHORT FORM",
    "REELS",
    "BRAND CONTENT",
    "YOUTUBE SHORTS",
    "TIKTOK",
    "MOTION GRAPHICS",
  ],
};

// ---- Showreel ----------------------------------------------
export const SHOWREEL = {
  label: "Showreel 2024",
  youtubeId: "dQw4w9WgXcQ", // Replace with real YouTube video ID
  thumbnail: "/showreel-thumb.jpg",
};

// ---- Services ----------------------------------------------
export const SERVICES = [
  {
    icon: "Film",
    title: "Reels & Shorts Editing",
    description:
      "Platform-native edits built for the algorithm — vertical format, punchy pacing, trending audio, and captions that hook within 3 seconds.",
    tag: "Most Popular",
  },
  {
    icon: "Layers",
    title: "Brand Video Production",
    description:
      "From raw footage to polished brand story. I handle the full post-production pipeline — colour, sound design, and seamless cuts.",
    tag: null,
  },
  {
    icon: "Sparkles",
    title: "Motion Graphics & Captions",
    description:
      "Kinetic text, animated logos, dynamic captions, and custom lower thirds. Every frame branded to perfection.",
    tag: null,
  },
];

// ---- Stats -------------------------------------------------
// These are also configurable from the admin dashboard via SiteSetting
export const DEFAULT_STATS = [
  { value: "50+", label: "Brands Worked With" },
  { value: "200+", label: "Videos Delivered" },
  { value: "4", label: "Countries Served" },
  { value: "48hr", label: "Average Turnaround" },
];

// ---- Portfolio ---------------------------------------------
export const PORTFOLIO_PROJECTS = [
  {
    id: "1",
    title: "NovaSkin Brand Reels",
    platform: "Reel",
    clientName: "NovaSkin",
    thumbnailUrl: "/portfolio/nova.jpg",
    videoUrl: "#",
    featured: true,
  },
  {
    id: "2",
    title: "FitPulse Shorts Series",
    platform: "Short",
    clientName: "FitPulse",
    thumbnailUrl: "/portfolio/fitpulse.jpg",
    videoUrl: "#",
    featured: true,
  },
  {
    id: "3",
    title: "Aurra Lifestyle TikTok",
    platform: "TikTok",
    clientName: "Aurra",
    thumbnailUrl: "/portfolio/aurra.jpg",
    videoUrl: "#",
    featured: false,
  },
  {
    id: "4",
    title: "Grounded Coffee — Origin Story",
    platform: "Reel",
    clientName: "Grounded Coffee",
    thumbnailUrl: "/portfolio/grounded.jpg",
    videoUrl: "#",
    featured: true,
  },
  {
    id: "5",
    title: "WaveWear Launch Campaign",
    platform: "Short",
    clientName: "WaveWear",
    thumbnailUrl: "/portfolio/wavewear.jpg",
    videoUrl: "#",
    featured: false,
  },
  {
    id: "6",
    title: "SolarTech Explainer Shorts",
    platform: "Short",
    clientName: "SolarTech",
    thumbnailUrl: "/portfolio/solartech.jpg",
    videoUrl: "#",
    featured: false,
  },
];

// ---- Pricing -----------------------------------------------
export type PricingBillingType = "monthly" | "project";

export const PRICING_TIERS = [
  {
    id: "starter",
    name: "Starter",
    badge: null,
    monthlyPrice: 499,
    projectPrice: 299,
    description: "Perfect for creators and small brands getting started with short-form content.",
    features: [
      "4 videos per month",
      "Reels / Shorts / TikTok format",
      "Basic captions & text overlays",
      "1 revision per video",
      "72hr delivery",
      "Source files included",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    id: "growth",
    name: "Growth",
    badge: "Most Popular",
    monthlyPrice: 999,
    projectPrice: 599,
    description: "For growing brands that need consistent, high-quality content to stay competitive.",
    features: [
      "10 videos per month",
      "Reels, Shorts, TikTok & YouTube",
      "Motion graphics & animated captions",
      "2 revisions per video",
      "48hr delivery",
      "Branded templates",
      "Monthly performance review",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    id: "brand",
    name: "Brand",
    badge: null,
    monthlyPrice: 1999,
    projectPrice: 1199,
    description: "Full-service post-production for established brands scaling their content engine.",
    features: [
      "Unlimited videos",
      "All formats + long-form",
      "Custom motion graphics & logo animations",
      "Unlimited revisions",
      "24hr priority delivery",
      "Dedicated Slack channel",
      "Weekly strategy calls",
      "Raw footage organisation",
    ],
    cta: "Let's Talk",
    highlighted: false,
  },
];

// ---- Testimonials ------------------------------------------
export const TESTIMONIALS = [
  {
    quote:
      "Our Instagram engagement tripled within 6 weeks of working with ByGrowflow. The edits are insanely cinematic — people always ask who makes our content.",
    name: "Jenna M.",
    company: "NovaSkin",
    country: "🇺🇸 United States",
  },
  {
    quote:
      "Fast, creative, and always on-brand. Turnaround is genuinely 48 hours. I've worked with bigger agencies that took two weeks. Never going back.",
    name: "Oliver T.",
    company: "WaveWear",
    country: "🇬🇧 United Kingdom",
  },
  {
    quote:
      "We needed someone who understood the Australian market and short-form trends. ByGrowflow delivered exactly that — and our TikTok went from 200 to 14k followers.",
    name: "Sophie R.",
    company: "Grounded Coffee",
    country: "🇦🇺 Australia",
  },
];

// ---- FAQ ---------------------------------------------------
export const FAQ_ITEMS = [
  {
    question: "How long does it take to get a video delivered?",
    answer:
      "Standard turnaround is 48 hours from the time I receive your footage and brief. Priority delivery (24hr) is available on the Brand plan or as an add-on.",
  },
  {
    question: "How many revisions are included?",
    answer:
      "Starter includes 1 revision per video, Growth includes 2, and Brand gets unlimited revisions. Revisions are typically turned around within 12 hours.",
  },
  {
    question: "What tools do you use for editing?",
    answer:
      "I work primarily in Adobe Premiere Pro and After Effects for motion graphics, with DaVinci Resolve for colour grading. All source files are organised and handed over at project completion.",
  },
  {
    question: "Do I need to send raw footage, or can you source content?",
    answer:
      "Both. You can send your own raw footage, or I can source licensed stock footage and music on your behalf as part of the project brief.",
  },
  {
    question: "How does payment work?",
    answer:
      "Monthly retainers are billed upfront at the start of each cycle. Project-based work requires a 50% deposit before work begins, with the remainder due on delivery. I accept Stripe, PayPal, and bank transfer.",
  },
  {
    question: "Do you sign NDAs or exclusivity agreements?",
    answer:
      "Absolutely. I'm happy to sign NDAs for sensitive projects and can discuss exclusivity arrangements on a case-by-case basis under the Brand plan.",
  },
];

// ---- Contact -----------------------------------------------
export const CONTACT = {
  headline: "Ready to Make Something Great?",
  subline:
    "Drop me a brief or just say hello. I'll get back to you within 24 hours.",
  budgetOptions: [
    "Under $500",
    "$500 – $1,000",
    "$1,000 – $2,500",
    "$2,500 – $5,000",
    "$5,000+",
    "Not sure yet",
  ],
};

// ---- Book a Call -------------------------------------------
export const BOOK_A_CALL = {
  headline: "Book a Free 15-Min Discovery Call",
  subline:
    "Tell me about your brand. I'll tell you what I can do for it.",
};

// ---- Footer ------------------------------------------------
export const FOOTER = {
  tagline: "Short-form video that moves brands forward.",
  madeWith: "Made with ☕ in India",
  socials: [
    { label: "Instagram", href: "https://instagram.com/bygrowflow", icon: "Instagram" },
    { label: "LinkedIn", href: "https://linkedin.com/company/bygrowflow", icon: "Linkedin" },
    { label: "YouTube", href: "https://youtube.com/@bygrowflow", icon: "Youtube" },
  ],
};
