"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Trash2, AlertCircle, Calendar } from "lucide-react";

const priorityLevels = ["low", "medium", "high"];

interface TaskFiltersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: {
    priority: string[];
    assignee: string[];
    dueDate: string | null;
  };
  onFilterChange: (
    type: "priority" | "assignee" | "dueDate",
    value: string | string[] | null,
  ) => void;
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
      <DialogContent className="w-[95vw] max-w-md mx-auto rounded-xl p-5 gap-0">
        <DialogHeader className="pb-4 border-b border-border/40">
          <DialogTitle>Filter Tasks</DialogTitle>
          <DialogDescription>
            Isolate cards by priority level or specific timeline completion
            deadlines.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label className="inline-flex items-center gap-1.5 text-foreground/90">
              <AlertCircle className="h-3.5 w-3.5 opacity-60" />
              Priority Level
            </Label>
            <div className="flex flex-wrap gap-2">
              {priorityLevels.map((priority) => {
                const isSelected = filters.priority.includes(priority);
                return (
                    <Button
                    key={priority}
                    type="button"
                    size="sm"
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => {
                      const newPriorities = filters.priority.includes(priority)
                        ? filters.priority.filter((p) => p !== priority)
                        : [...filters.priority, priority];
                      onFilterChange("priority", newPriorities);
                    }}
                    className={`h-8 rounded-lg text-xs font-semibold px-3 ${
                      isSelected
                        ? "shadow-sm shadow-primary/10"
                        : "text-muted-foreground/90"
                    }`}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="inline-flex items-center gap-1.5 text-foreground/90">
              <Calendar className="h-3.5 w-3.5 opacity-60" />
              Due Date
            </Label>
            <Input
              type="date"
              value={filters.dueDate || ""}
              onChange={(e) =>
                onFilterChange("dueDate", e.target.value || null)
              }
              className="h-9.5 text-xs cursor-pointer rounded-lg"
            />
          </div>
        </div>

        <DialogFooter className="pt-3 border-t border-border/40 gap-2 sm:gap-0">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              onClearFilters();
              onOpenChange(false);
            }}
            className="h-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 font-medium"
          >
            <Trash2 className="h-4 w-4" /> Clear
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="h-9 font-semibold px-4 shadow-sm shadow-primary/10"
          >
            <Check className="h-4 w-4" /> Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
