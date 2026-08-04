/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnWithTasks } from "@/supabase/models";
import { MoreHorizontal } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import TaskCreateDialog from "./TaskCreateDialog";
import SortableTask from "./SortableTask";

interface DroppableColumnProps {
  column: ColumnWithTasks;
  onEditColumn: (column: ColumnWithTasks) => void;
  onCreateTask: (taskData: any) => Promise<void>;
}

function getTaskLengthBadgeColor(title: string): string {
  switch (title) {
    case "To Do":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "In Progress":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    case "Review":
      return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20";
    case "Done":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

export default function DroppableColumn({
  column,
  onEditColumn,
  onCreateTask,
}: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div
      ref={setNodeRef}
      className="w-full lg:w-72 lg:shrink-0 flex flex-col h-full select-none"
    >
      <div
        className={`flex flex-col bg-card/60 backdrop-blur-sm dark:bg-card/40 rounded-xl border border-border/60 transition-all duration-200 h-full max-h-[calc(100vh-12rem)] ${isOver && "bg-primary/5 border-primary/30 ring-2 ring-primary/10 shadow-glow"}`}
      >
        <div className="px-4 py-3 flex items-center justify-between gap-2 shrink-0 border-b border-border/30">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
            <h3 className="font-bold text-foreground text-sm tracking-tight truncate">
              {column.title}
            </h3>
            <Badge
              variant="outline"
              className={`h-5 px-1.5 min-w-5 justify-center rounded-md text-[11px] font-bold ${getTaskLengthBadgeColor(column.title)}`}
            >
              {column.tasks.length}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-md text-muted-foreground/60 hover:text-foreground hover:bg-muted transition-all"
            onClick={() => onEditColumn(column)}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-2.5 pb-2 scrollbar-none">
          <div className="space-y-2.5 pt-2">
            {column.tasks.map((task) => (
              <SortableTask key={task.id} task={task} />
            ))}
          </div>
        </div>

        <div className="p-2 pt-0 shrink-0 border-t border-transparent">
          <TaskCreateDialog onSubmit={onCreateTask} />
        </div>
      </div>
    </div>
  );
}