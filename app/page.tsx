// app/page.tsx
import { prisma } from "@/lib/prisma";
import { CALENDLY_URL, DEFAULT_STATS, PORTFOLIO_PROJECTS } from "@/content/content";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Showreel } from "@/components/sections/Showreel";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Portfolio } from "@/components/sections/Portfolio";
import { Pricing } from "@/components/sections/Pricing";
import { BookACall } from "@/components/sections/BookACall";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

async function getSiteData() {
  try {
    const [settings, projects] = await Promise.all([
      prisma.siteSetting.findMany(),
      prisma.project.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] }),
    ]);

    const settingMap = Object.fromEntries(settings.map((s: { key: string; value: string }) => [s.key, s.value]));

    return {
      calendlyUrl: settingMap.calendly_url || CALENDLY_URL,
      pricingVisible: settingMap.pricing_visible !== "false",
      stats: [
        { value: settingMap.stat_brands || DEFAULT_STATS[0].value, label: DEFAULT_STATS[0].label },
        { value: settingMap.stat_videos || DEFAULT_STATS[1].value, label: DEFAULT_STATS[1].label },
        { value: settingMap.stat_countries || DEFAULT_STATS[2].value, label: DEFAULT_STATS[2].label },
        { value: settingMap.stat_turnaround || DEFAULT_STATS[3].value, label: DEFAULT_STATS[3].label },
      ],
      projects: projects.length > 0 ? projects : PORTFOLIO_PROJECTS,
    };
  } catch {
    // DB not configured yet — use content defaults
    return {
      calendlyUrl: CALENDLY_URL,
      pricingVisible: true,
      stats: DEFAULT_STATS,
      projects: PORTFOLIO_PROJECTS,
    };
  }
}

export default async function HomePage() {
  const { calendlyUrl, pricingVisible, stats, projects } = await getSiteData();

  return (
    <>
      <Navbar calendlyUrl={calendlyUrl} />
      <main>
        <Hero />
        <Showreel />
        <Services />
        <Stats stats={stats} />
        <Portfolio projects={projects} />
        <Pricing visible={pricingVisible} />
        <BookACall calendlyUrl={calendlyUrl} />
        <Testimonials />
        <FAQ />
        <Contact calendlyUrl={calendlyUrl} />
      </main>
      <Footer />
    </>
  );
}
