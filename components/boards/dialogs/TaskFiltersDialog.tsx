"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCheck, Trash } from "lucide-react";

const priorityLevels = ["low", "medium", "high"];

interface TaskFiltersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: {
    priority: string[];
    assignee: string[];
    dueDate: string | null;
  };
  onFilterChange: (type: "priority" | "assignee" | "dueDate", value: string | string[] | null) => void;
  onClearFilters: () => void;
}

export default function TaskFiltersDialog({
  open,
  onOpenChange,
  filters,
  onFilterChange,
  onClearFilters,
}: TaskFiltersDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[430px] mx-auto">
        <DialogHeader>
          <DialogTitle>Filter Tasks</DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-8">
          <div>
            <Label>Priority</Label>
            <div className="flex flex-wrap gap-2 mt-3">
              {priorityLevels.map((priority) => (
                <Button
                  key={priority}
                  variant="outline"
                  onClick={() => {
                    const newPriorities = filters.priority.includes(priority)
                      ? filters.priority.filter((p) => p !== priority)
                      : [...filters.priority, priority];
                    onFilterChange("priority", newPriorities);
                  }}
                  className={filters.priority.includes(priority) ? "bg-green-100 border-green-500 text-green-700" : ""}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label>Due Date</Label>
            <Input
              type="date"
              value={filters.dueDate || ""}
              onChange={(e) => onFilterChange("dueDate", e.target.value || null)}
              className="mt-2"
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button variant="outline" onClick={() => { onClearFilters(); onOpenChange(false); }}>
              <Trash className="mr-2" /> Clear
            </Button>
            <Button onClick={() => onOpenChange(false)}>
              <CheckCheck className="mr-2" /> Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}