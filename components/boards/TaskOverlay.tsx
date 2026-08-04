"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Task } from "@/supabase/models";
import { CalendarDays, User, GripVertical } from "lucide-react";

function getPriorityStyle(priority: "low" | "medium" | "high"): string {
  switch (priority) {
    case "high":
      return "bg-destructive/10 text-destructive dark:bg-destructive/20";
    case "medium":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
    case "low":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    default:
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
  }
}

export default function TaskOverlay({ task }: { task: Task }) {
  return (
    <div className="z-100 pointer-events-none select-none w-full max-w-[calc(100%-8px)] mx-auto">
      <Card className="border-primary/40 bg-accent/40 rotate-[2deg] scale-[1.02] shadow-2xl backdrop-blur-sm">
        <CardContent className="p-3.5 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-foreground text-sm tracking-tight leading-snug flex-1 min-w-0">
              {task.title}
            </h4>
            <div className="h-5 w-5 rounded-md flex items-center justify-center text-muted-foreground/70 shrink-0">
              <GripVertical className="h-3.5 w-3.5" />
            </div>
          </div>

          {task.description && (
            <p className="text-xs font-medium text-muted-foreground/90 line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}

          <div className="pt-2 border-t border-border/40 flex items-center justify-between gap-3 mt-1">
            <div className="flex items-center gap-2 min-w-0 text-[11px] font-medium text-muted-foreground/70">
              {task.assignee && (
                <div className="flex items-center gap-1 min-w-0 bg-muted/60 px-1.5 py-0.5 rounded-sm">
                  <User className="h-3 w-3 opacity-60 shrink-0" />
                  <span className="truncate">{task.assignee}</span>
                </div>
              )}
              {task.due_date && (
                <div className="flex items-center gap-1 min-w-0">
                  <CalendarDays className="h-3 w-3 opacity-60 shrink-0" />
                  <span className="truncate">
                    {new Date(task.due_date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>

            <div
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border border-transparent/10 shrink-0 ${getPriorityStyle(task.priority)}`}
            >
              {task.priority || "medium"}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}