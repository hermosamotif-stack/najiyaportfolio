import { motion } from "framer-motion";
import { FolderOpen, Eye, FileEdit, TrendingUp } from "lucide-react";
import type { Project } from "@/lib/projects";

interface StatsCardsProps {
  projects: Project[];
}

// Mini sparkline SVG component
const MiniChart = ({ data, color }: { data: number[]; color: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
      <polygon
        points={`0,${h} ${points} ${w},${h}`}
        fill={`url(#grad-${color})`}
      />
    </svg>
  );
};

const StatsCards = ({ projects }: StatsCardsProps) => {
  const totalViews = projects.reduce((sum, p) => sum + p.views, 0);
  const drafts = projects.filter((p) => p.status === "draft").length;
  const published = projects.filter((p) => p.status === "published").length;

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      icon: FolderOpen,
      chart: [2, 3, 4, 3, 5, 6, projects.length],
      chartColor: "hsl(220, 80%, 50%)",
    },
    {
      label: "Total Views",
      value: totalViews.toLocaleString(),
      icon: Eye,
      chart: [120, 180, 240, 200, 310, 280, totalViews / 3],
      chartColor: "hsl(160, 70%, 50%)",
    },
    {
      label: "Published",
      value: published,
      icon: TrendingUp,
      chart: [1, 2, 2, 3, 3, 4, published],
      chartColor: "hsl(280, 70%, 60%)",
    },
    {
      label: "Drafts",
      value: drafts,
      icon: FileEdit,
      chart: [0, 1, 1, 2, 1, 1, drafts],
      chartColor: "hsl(40, 80%, 55%)",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="glass rounded-xl p-4 hover:glow-border transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-3">
            <stat.icon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            <MiniChart data={stat.chart} color={stat.chartColor} />
          </div>
          <p className="text-2xl font-display font-bold">{stat.value}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;
