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
    case "To Do": return "bg-red-500";
    case "In Progress": return "bg-amber-500";
    case "Review": return "bg-teal-500";
    case "Done": return "bg-lime-500";
    default: return "bg-gray-500";
  }
}

export default function DroppableColumn({
  column,
  onEditColumn,
  onCreateTask,
}: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div ref={setNodeRef} className="w-full lg:shrink-0 lg:w-80">
      <div className={`bg-white rounded-lg shadow-sm border mt-1 ${isOver && "ring-2 ring-gray-400"}`}>
        {/* Column Header */}
        <div className="m-3 sm:m-4 mb-0 pb-3 sm:pb-4 border-b border-gray-300">
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center min-w-0">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                {column.title}
              </h3>
              <Badge className={`${getTaskLengthBadgeColor(column.title)} rounded-sm`}>
                {column.tasks.length}
              </Badge>
            </div>
            <Button variant="ghost" className="shrink-0" onClick={() => onEditColumn(column)}>
              <MoreHorizontal />
            </Button>
          </div>
        </div>

        {/* Column Content */}
        <div className="p-2">
          <div className="space-y-3 mt-4">
            {column.tasks.map((task) => (
              <SortableTask key={task.id} task={task} />
            ))}
          </div>

          <TaskCreateDialog onSubmit={onCreateTask} />
        </div>
      </div>
    </div>
  );
}