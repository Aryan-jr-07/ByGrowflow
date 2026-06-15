// components/admin/DashboardChart.tsx
"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  date: string;
  inquiries: number;
}

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1F1F1F] border border-border rounded-xl px-4 py-3">
        <p className="font-body text-secondary text-xs mb-1">{label}</p>
        <p className="font-display font-bold text-accent text-base">{payload[0].value}</p>
        <p className="font-body text-secondary text-xs">inquiries</p>
      </div>
    );
  }
  return null;
};

export function DashboardChart({ data }: { data: ChartData[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fill: "#555", fontSize: 11, fontFamily: "Inter" }}
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fill: "#555", fontSize: 11, fontFamily: "Inter" }}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="inquiries"
          stroke="#C8FF00"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 5, fill: "#C8FF00", stroke: "#0D0D0D", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
