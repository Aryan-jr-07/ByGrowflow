// app/admin/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Inbox, FolderOpen, TrendingUp, CheckCircle2, ExternalLink } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { DashboardChart } from "@/components/admin/DashboardChart";

async function getDashboardData() {
  try {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [totalInquiries, newThisWeek, totalProjects, completedProjects, recentInquiries] =
      await Promise.all([
        prisma.inquiry.count(),
        prisma.inquiry.count({ where: { createdAt: { gte: weekAgo } } }),
        prisma.project.count(),
        prisma.project.count({ where: { featured: true } }),
        prisma.inquiry.findMany({
          where: { createdAt: { gte: thirtyDaysAgo } },
          orderBy: { createdAt: "asc" },
          select: { createdAt: true },
        }),
      ]);

    // Build chart data (inquiries per day for last 30 days)
    const dayMap: Record<string, number> = {};
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      dayMap[key] = 0;
    }
    recentInquiries.forEach((inq: { createdAt: Date }) => {
      const key = new Date(inq.createdAt).toISOString().split("T")[0];
      if (key in dayMap) dayMap[key]++;
    });

    const chartData = Object.entries(dayMap).map(([date, count]) => ({
      date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      inquiries: count,
    }));

    return { totalInquiries, newThisWeek, totalProjects, completedProjects, chartData };
  } catch {
    return {
      totalInquiries: 0,
      newThisWeek: 0,
      totalProjects: 0,
      completedProjects: 0,
      chartData: [],
    };
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const { totalInquiries, newThisWeek, totalProjects, completedProjects, chartData } =
    await getDashboardData();

  const calendlySetting = await prisma.siteSetting.findUnique({ where: { key: "calendly_url" } }).catch(() => null);
  const calendlyUrl = calendlySetting?.value || "https://calendly.com";

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-black text-2xl text-primary">Dashboard</h1>
        <p className="font-body text-secondary text-sm mt-1">
          Welcome back, {session?.user?.email}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard title="Total Inquiries" value={totalInquiries} icon={Inbox} color="lime" />
        <StatCard title="New This Week" value={newThisWeek} icon={TrendingUp} color="blue" trend={`${newThisWeek} new`} trendUp={newThisWeek > 0} />
        <StatCard title="Total Projects" value={totalProjects} icon={FolderOpen} color="purple" />
        <StatCard title="Featured Projects" value={completedProjects} icon={CheckCircle2} color="orange" />
      </div>

      {/* Chart + Calendly */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-2xl p-6">
          <h2 className="font-display font-bold text-primary text-base mb-1">
            Inquiries (Last 30 Days)
          </h2>
          <p className="font-body text-secondary text-xs mb-6">Daily inquiry volume</p>
          <DashboardChart data={chartData} />
        </div>

        {/* Upcoming Calls Card */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="font-display font-bold text-primary text-base mb-1">
            Upcoming Calls
          </h2>
          <p className="font-body text-secondary text-xs mb-6">
            Manage your discovery calls on Calendly
          </p>
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-5 text-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📅</span>
            </div>
            <p className="font-body text-secondary text-sm mb-4">
              Open your Calendly dashboard to see scheduled calls and upcoming meetings.
            </p>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="dashboard-calendly-link"
              className="inline-flex items-center gap-2 font-body text-accent text-sm font-medium border border-accent/30 bg-accent/5 hover:bg-accent/10 rounded-xl px-4 py-2.5 transition-colors"
            >
              Open Calendly <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
