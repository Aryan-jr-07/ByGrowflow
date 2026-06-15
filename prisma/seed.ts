// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ── Admin User ──────────────────────────────────────────────
  const email = process.env.ADMIN_EMAIL || "admin@bygrowflow.com";
  const plainPassword = process.env.ADMIN_PASSWORD_PLAIN || "ChangeMeStrong123!";
  const passwordHash = await bcrypt.hash(plainPassword, 12);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash, role: "admin" },
  });
  console.log(`✅ Admin user: ${email}`);

  // ── Site Settings ───────────────────────────────────────────
  const settings = [
    { key: "calendly_url", value: "https://calendly.com/bygrowflow/discovery" },
    { key: "pricing_visible", value: "true" },
    { key: "stat_brands", value: "50+" },
    { key: "stat_videos", value: "200+" },
    { key: "stat_countries", value: "4" },
    { key: "stat_turnaround", value: "48hr" },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
  console.log("✅ Site settings seeded");

  // ── Sample Projects ─────────────────────────────────────────
  const projects = [
    {
      title: "NovaSkin Brand Reels",
      platform: "Reel",
      thumbnailUrl: "/portfolio/nova.jpg",
      videoUrl: "#",
      clientName: "NovaSkin",
      featured: true,
      order: 1,
    },
    {
      title: "FitPulse Shorts Series",
      platform: "Short",
      thumbnailUrl: "/portfolio/fitpulse.jpg",
      videoUrl: "#",
      clientName: "FitPulse",
      featured: true,
      order: 2,
    },
    {
      title: "Aurra Lifestyle TikTok",
      platform: "TikTok",
      thumbnailUrl: "/portfolio/aurra.jpg",
      videoUrl: "#",
      clientName: "Aurra",
      featured: false,
      order: 3,
    },
    {
      title: "Grounded Coffee — Origin Story",
      platform: "Reel",
      thumbnailUrl: "/portfolio/grounded.jpg",
      videoUrl: "#",
      clientName: "Grounded Coffee",
      featured: true,
      order: 4,
    },
    {
      title: "WaveWear Launch Campaign",
      platform: "Short",
      thumbnailUrl: "/portfolio/wavewear.jpg",
      videoUrl: "#",
      clientName: "WaveWear",
      featured: false,
      order: 5,
    },
    {
      title: "SolarTech Explainer Shorts",
      platform: "Short",
      thumbnailUrl: "/portfolio/solartech.jpg",
      videoUrl: "#",
      clientName: "SolarTech",
      featured: false,
      order: 6,
    },
  ];

  for (const project of projects) {
    const existing = await prisma.project.findFirst({
      where: { title: project.title },
    });
    if (!existing) {
      await prisma.project.create({ data: project });
    }
  }
  console.log("✅ Sample projects seeded");

  console.log("🎉 Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
