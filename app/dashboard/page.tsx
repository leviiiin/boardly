/* app/dashboard/page.tsx */
'use client';

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Filter, Grid3x3, List, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/utils";

import useBoards from "@/hooks/useBoards";
import useDate from "@/hooks/useDate";
import { useUser } from "@clerk/nextjs";

import DashboardStats from "@/components/dashboard/DashboardStats";
import BoardCard from "@/components/dashboard/BoardCard";
import CreateBoardCard from "@/components/dashboard/CreateBoardCard";
import BoardFiltersDialog from "@/components/dashboard/BoardFiltersDialog";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const { createBoard, boards, loading, error } = useBoards();
  const { date, time } = useDate();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    dateRange: { start: null as string | null, end: null as string | null },
    taskCount: { min: null as number | null, max: null as number | null },
  });

  const handleCreateBoard = async () => {
    await createBoard({
      title: "New Board",
      description: "Board description",
    });
  };

  const filteredBoards = boards.filter((board) => {
    const matchesSearch = board.title.toLowerCase().includes(filters.search.toLowerCase());

    const matchesDateRange =
      (!filters.dateRange.start || new Date(board.created_at) >= new Date(filters.dateRange.start)) &&
      (!filters.dateRange.end || new Date(board.created_at) <= new Date(filters.dateRange.end));

    return matchesSearch && matchesDateRange;
  });

  const clearFilters = () => {
    setFilters({
      search: "",
      dateRange: { start: null, end: null },
      taskCount: { min: null, max: null },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-100 to-green-300">
      <Navbar page="dashboard" />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-700">
            Welcome back,{" "}
            {isLoaded && (user?.firstName ?? user?.emailAddresses[0]?.emailAddress?.split("@")[0])}
            <span className="inline-block ml-3">
              👋
            </span>
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="text-xl text-gray-500">Loading your boards...</div>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-600">Error loading boards</div>
        ) : (
          <>
            <DashboardStats boards={boards} date={date} time={time} />

            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-700">Your Boards</h2>
                <p className="text-gray-600">Manage your projects and tasks</p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex border rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setIsFilterOpen(true)}
                  className={isFilterOpen ? "bg-gray-800 text-white" : ""}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>

                <Button onClick={handleCreateBoard}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Board
                </Button>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search boards..."
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>

            {/* Boards Grid / List */}
            {boards.length === 0 ? (
              <div className="text-center py-20 text-gray-500 text-xl">
                No boards yet. Create your first one!
              </div>
            ) : (
              <div className={cn(
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "flex flex-col gap-4"
              )}>
                {filteredBoards.map((board) => (
                  <BoardCard key={board.id} board={board} />
                ))}

                <CreateBoardCard onClick={handleCreateBoard} />
              </div>
            )}
          </>
        )}
      </main>

      {/* Filter Dialog */}
      <BoardFiltersDialog
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        filters={filters}
        onFiltersChange={setFilters}
        onClear={clearFilters}
      />
    </div>
  );
}