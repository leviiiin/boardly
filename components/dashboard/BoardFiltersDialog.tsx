/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Check, Trash2, Search, Calendar, BarChart2 } from "lucide-react";

interface BoardFiltersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: any;
  onFiltersChange: (filters: any) => void;
  onClear: () => void;
}

export default function BoardFiltersDialog({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  onClear,
}: BoardFiltersDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md mx-auto rounded-xl p-5 gap-0">
        <DialogHeader className="pb-4 border-b border-border/40">
          <DialogTitle>Filter Boards</DialogTitle>
          <DialogDescription>
            Filter boards by title, date, or task count.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label className="inline-flex items-center gap-1.5 text-muted-foreground/90">
              <Search className="h-3.5 w-3.5 opacity-60" />
              Search
            </Label>
            <Input
              placeholder="Search board titles..."
              value={filters.search}
              onChange={(e) =>
                onFiltersChange({ ...filters, search: e.target.value })
              }
              className="h-9.5 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label className="inline-flex items-center gap-1.5 text-muted-foreground/90">
              <Calendar className="h-3.5 w-3.5 opacity-60" />
              Date Range
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 block">
                  Start Date
                </span>
                <Input
                  type="date"
                  value={filters.dateRange.start || ""}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      dateRange: {
                        ...filters.dateRange,
                        start: e.target.value || null,
                      },
                    })
                  }
                  className="h-9 text-xs cursor-pointer rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 block">
                  End Date
                </span>
                <Input
                  type="date"
                  value={filters.dateRange.end || ""}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      dateRange: {
                        ...filters.dateRange,
                        end: e.target.value || null,
                      },
                    })
                  }
                  className="h-9 text-xs cursor-pointer rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="inline-flex items-center gap-1.5 text-muted-foreground/90">
              <BarChart2 className="h-3.5 w-3.5 opacity-60" />
              Task Count
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 block">
                  Minimum
                </span>
                <Input
                  type="number"
                  min="0"
                  placeholder="Min tasks"
                  value={filters.taskCount.min || ""}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      taskCount: {
                        ...filters.taskCount,
                        min: e.target.value ? Number(e.target.value) : null,
                      },
                    })
                  }
                  className="h-9 rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 block">
                  Maximum
                </span>
                <Input
                  type="number"
                  min="0"
                  placeholder="Max tasks"
                  value={filters.taskCount.max || ""}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      taskCount: {
                        ...filters.taskCount,
                        max: e.target.value ? Number(e.target.value) : null,
                      },
                    })
                  }
                  className="h-9 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-3 border-t border-border/40 gap-2 sm:gap-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 font-medium rounded-lg"
          >
            <Trash2 className="h-4 w-4" />
            Clear Filters
          </Button>
          <Button
            size="sm"
            onClick={() => onOpenChange(false)}
            className="h-9 font-semibold"
          >
            <Check className="h-4 w-4" />
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
