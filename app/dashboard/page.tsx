/* app/dashboard/page.tsx */
"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Filter,
  Grid3x3,
  List,
  Plus,
  Search,
  FolderKanban,
  AlertCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/utils";

import useBoards from "@/hooks/useBoards";
import useDate from "@/hooks/useDate";
import { useUser } from "@clerk/nextjs";

import DashboardStats from "@/components/dashboard/DashboardStats";
import BoardCard from "@/components/dashboard/BoardCard";
import CreateBoardCard from "@/components/dashboard/CreateBoardCard";
import BoardFiltersDialog from "@/components/dashboard/BoardFiltersDialog";
import { Loader } from "@/components/ui/loader";

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
    const matchesSearch = board.title
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    const matchesDateRange =
      (!filters.dateRange.start ||
        new Date(board.created_at) >= new Date(filters.dateRange.start)) &&
      (!filters.dateRange.end ||
        new Date(board.created_at) <= new Date(filters.dateRange.end));

    return matchesSearch && matchesDateRange;
  });

  const activeFiltersCount = Object.values(filters).reduce((count, v) => {
    if (v && typeof v === "object") {
      return count + Object.values(v).filter(Boolean).length;
    }
    return count + (v ? 1 : 0);
  }, 0);

  const clearFilters = () => {
    setFilters({
      search: "",
      dateRange: { start: null, end: null },
      taskCount: { min: null, max: null },
    });
  };

  return (
    <div className="min-h-screen bg-background antialiased selection:bg-primary/20 selection:text-primary">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-foreground/3 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <Navbar page="dashboard" />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-10 bg-card/60 backdrop-blur-xl border border-border/40 p-6 rounded-2xl shadow-sm shadow-glow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
                Welcome back,{" "}
                <span className="text-primary">
                  {isLoaded &&
                    (user?.firstName ??
                      user?.emailAddresses[0]?.emailAddress?.split("@")[0])}
                </span>
                <span className="animate-bounce">👋</span>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {date} — {time}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              <span>{boards.length} active board{boards.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="relative min-h-[400px] w-full flex items-center justify-center">
            <Loader />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center gap-3 min-h-[400px] bg-card/40 rounded-2xl border border-destructive/20 border-dashed p-6 text-center">
            <AlertCircle className="h-10 w-10 text-destructive stroke-[1.5]" />
            <div className="text-sm font-semibold text-destructive">
              Error loading projects canvas
            </div>
            <p className="text-xs text-muted-foreground max-w-xs">
              Failed to establish secure handshake with task management
              database.
            </p>
          </div>
        ) : (
          <>
            <DashboardStats boards={boards} date={date} time={time} />

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 mt-8">
              <div className="space-y-0.5">
                <h2 className="text-lg font-bold tracking-tight text-foreground inline-flex items-center gap-2">
                  <FolderKanban className="h-4 w-4 text-primary opacity-80" />
                  Your Project Boards
                </h2>
                <p className="text-xs font-medium text-muted-foreground/90">
                  Manage, slice and structuralize your engineering workflows.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 sm:justify-end">
                <div className="relative w-full sm:w-60 order-last sm:order-none mt-2 sm:mt-0">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
                  <input
                    type="text"
                    placeholder="Quick search boards..."
                    className="h-9 w-full rounded-lg border border-input/80 bg-card pl-9 pr-4 text-sm shadow-xs outline-none transition-all duration-200 focus:border-primary focus:ring-[3px] focus:ring-primary/10 placeholder:text-muted-foreground/60"
                    value={filters.search}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center bg-card border border-border/80 rounded-lg p-0.5 shadow-xs shrink-0">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-7 w-7 rounded-md"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-7 w-7 rounded-md"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <Button
                  variant={
                    isFilterOpen || activeFiltersCount > 0
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => setIsFilterOpen(true)}
                  className="h-9 font-medium text-xs gap-1.5 shadow-xs"
                >
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filter</span>
                  {activeFiltersCount > 0 && (
                    <span className="h-4.5 px-1.5 min-w-4.5 inline-flex items-center justify-center rounded-md bg-primary text-[10px] font-bold text-primary-foreground animate-scale-in">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>

                <Button
                  size="sm"
                  onClick={handleCreateBoard}
                  className="h-9 font-semibold text-xs gap-1.5 shadow-sm shadow-primary/10 hover:shadow-md hover:shadow-primary/15 transition-shadow"
                >
                  <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                  Create Board
                </Button>
              </div>
            </div>

            {boards.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[240px] bg-muted/20 rounded-2xl border-2 border-dashed border-border/60 p-6 text-center">
                <FolderKanban className="h-8 w-8 text-muted-foreground/40 mb-2 stroke-[1.5]" />
                <div className="text-sm font-semibold text-foreground/80">
                  No workspace canvases found
                </div>
                <p className="text-xs text-muted-foreground/70 mb-4 max-w-xs">
                  Initialize a new board to populate your team workflow
                  architecture matrix.
                </p>
                <Button
                  size="sm"
                  onClick={handleCreateBoard}
                  className="h-9 font-semibold text-xs"
                >
                  <Plus className="h-3.5 w-3.5 stroke-[2.5]" /> Create First
                  Board
                </Button>
              </div>
            ) : (
              <div
                className={cn(
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    : "flex flex-col gap-3",
                )}
              >
                {filteredBoards.map((board, i) => (
                  <div
                    key={board.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'both' }}
                  >
                    <BoardCard board={board} />
                  </div>
                ))}

                <div className="animate-fade-in-up" style={{ animationDelay: `${boards.length * 0.05}s`, animationFillMode: 'both' }}>
                  <CreateBoardCard onClick={handleCreateBoard} />
                </div>
              </div>
            )}
          </>
        )}
      </main>

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