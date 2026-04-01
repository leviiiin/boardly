"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Task } from "@/supabase/models";
import { CalendarDays, User } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableTaskProps {
  task: Task;
}

function getPriorityColor(priority: "low" | "medium" | "high"): string {
  switch (priority) {
    case "high": return "bg-red-500";
    case "medium": return "bg-amber-500";
    case "low": return "bg-lime-500";
    default: return "bg-amber-500";
  }
}

export default function SortableTask({ task }: SortableTaskProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="cursor-pointer border-2 hover:border-gray-300 hover:shadow-md transition-all duration-300">
        <CardContent className="p-3 sm:p-4">
          <div>
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-medium text-gray-800 text-sm leading-tight flex-1 min-w-0 pr-2">
                {task.title}
              </h4>
            </div>

            <p className="text-xs text-gray-600 line-clamp-2 mb-1">
              {task.description || "No description."}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
                {task.assignee && (
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <User className="h-3 w-3" />
                    <span className="truncate">{task.assignee}</span>
                  </div>
                )}
                {task.due_date && (
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <CalendarDays className="h-3 w-3" />
                    <span className="truncate">{task.due_date}</span>
                  </div>
                )}
              </div>
              <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}