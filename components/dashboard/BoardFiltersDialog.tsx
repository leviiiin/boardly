/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCheck, Trash } from "lucide-react";

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
      <DialogContent className="w-[95vw] max-w-[425px] mx-auto">
        <DialogHeader>
          <DialogTitle>Filter Boards</DialogTitle>
          <p className="text-sm text-gray-600">
            Filter boards by title, date, or task count.
          </p>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Search */}
          <div className="space-y-2">
            <Label>Search</Label>
            <Input
              placeholder="Search board titles..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            />
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <Label>Date Range</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Start Date</Label>
                <Input
                  type="date"
                  value={filters.dateRange.start || ""}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      dateRange: { ...filters.dateRange, start: e.target.value || null },
                    })
                  }
                />
              </div>
              <div>
                <Label className="text-xs">End Date</Label>
                <Input
                  type="date"
                  value={filters.dateRange.end || ""}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      dateRange: { ...filters.dateRange, end: e.target.value || null },
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Task Count */}
          <div className="space-y-2">
            <Label>Task Count</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Minimum</Label>
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
                />
              </div>
              <div>
                <Label className="text-xs">Maximum</Label>
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
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={onClear}>
              <Trash className="mr-2" />
              Clear Filters
            </Button>
            <Button className="flex-1" onClick={() => onOpenChange(false)}>
              <CheckCheck className="mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}