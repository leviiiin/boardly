import { Card, CardContent } from "@/components/ui/card";
import { ChartColumn, Rocket, Smile, Trello } from "lucide-react";
import { Board } from "@/supabase/models";

interface DashboardStatsProps {
  boards: Board[];
  date: string;
  time: string;
}

export default function DashboardStats({
  boards,
  date,
  time,
}: DashboardStatsProps) {
  const recentBoards = boards.filter((board) => {
    const updatedAt = new Date(board.updated_at);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return updatedAt > oneWeekAgo;
  }).length;

  const totalTasks = boards.reduce((sum, board) => sum + ((board as Board & { taskCount?: number }).taskCount ?? 0), 0);

  const stats = [
    {
      label: "Total Boards",
      value: boards.length,
      icon: Trello,
      iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBorder: "border-emerald-500/10",
    },
    {
      label: "Recent Activity",
      value: recentBoards,
      icon: ChartColumn,
      iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBorder: "border-purple-500/10",
    },
    {
      label: "Active Projects",
      value: recentBoards,
      icon: Rocket,
      iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBorder: "border-blue-500/10",
    },
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: Smile,
      iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBorder: "border-amber-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, i) => (
        <Card
          key={stat.label}
          className="border border-border/50 bg-card shadow-xs hover:shadow-md transition-all duration-300 hover-lift group"
          style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'both' }}
        >
          <CardContent className="p-4 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold tracking-tight text-muted-foreground/90">
                {stat.label}
              </p>
              <p className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                {stat.value}
              </p>
            </div>
            <div className={`h-10 w-10 ${stat.iconBg} rounded-xl flex items-center justify-center ${stat.iconBorder} border shrink-0 transition-transform duration-200 group-hover:scale-110`}>
              <stat.icon className={`${stat.iconColor} h-5 w-5 stroke-[2.5]`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}