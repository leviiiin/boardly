import { Card, CardContent } from "@/components/ui/card";
import { ChartColumn, Rocket, Smile, Trello } from "lucide-react";
import { Board } from "@/supabase/models";

interface DashboardStatsProps {
  boards: Board[];
  date: string;
  time: string;
}

export default function DashboardStats({ boards, date, time }: DashboardStatsProps) {
  const recentBoards = boards.filter((board) => {
    const updatedAt = new Date(board.updated_at);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return updatedAt > oneWeekAgo;
  }).length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Boards</p>
              <p className="text-3xl font-bold mt-2">{boards.length}</p>
            </div>
            <div className="h-12 w-12 bg-lime-100 rounded-xl flex items-center justify-center">
              <Trello className="text-green-700 h-7 w-7" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Recent Activity</p>
              <p className="text-3xl font-bold mt-2">{recentBoards}</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <ChartColumn className="text-purple-700 h-7 w-7" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Projects</p>
              <p className="text-3xl font-bold mt-2">{recentBoards}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Rocket className="text-blue-600 h-7 w-7" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{date}</p>
              <p className="text-3xl font-bold mt-2">{time}</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Smile className="text-orange-600 h-7 w-7" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}