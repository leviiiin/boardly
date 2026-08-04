"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Board } from "@/supabase/models";
import { isNew } from "@/utils/utils";
import { CalendarDays, FolderKanban, ArrowRight } from "lucide-react";
import Link from "next/link";

interface BoardCardProps {
  board: Board & { taskCount?: number };
}

export default function BoardCard({ board }: BoardCardProps) {
  return (
    <Link
      href={`/boards/${board.id}`}
      className="block h-full group focus:outline-hidden"
    >
      <Card className="relative overflow-hidden h-full border border-border/50 bg-card hover:bg-accent/5 hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-none hover-lift group-hover:border-glow">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent-foreground to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-3.5 h-3.5 ${board.color || "bg-muted-foreground/30"} rounded-sm shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-110`}
              />
              {board.taskCount !== undefined && (
                <span className="text-xs font-semibold tracking-tight text-muted-foreground">
                  {board.taskCount} {board.taskCount === 1 ? "task" : "tasks"}
                </span>
              )}
            </div>
            {isNew(board.created_at) && <Badge variant="new">New</Badge>}
          </div>
        </CardHeader>

        <CardContent className="flex flex-col justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-base font-bold tracking-tight text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-200">
              {board.title}
            </CardTitle>
            <CardDescription className="text-xs font-medium text-muted-foreground/90 line-clamp-2 leading-relaxed min-h-8">
              {board.description || "No description provided"}
            </CardDescription>
          </div>

          <div className="pt-3 border-t border-border/40 flex items-center justify-between gap-2 text-[11px] font-medium text-muted-foreground/70">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3 opacity-60" />
              <span>
                {new Date(board.created_at).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <ArrowRight className="h-3 w-3 text-primary" />
              <span className="text-primary">Open</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}