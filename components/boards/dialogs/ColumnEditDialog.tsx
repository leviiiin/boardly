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
import { Check, Edit3 } from "lucide-react";

interface ColumnEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  onTitleChange: (title: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function ColumnEditDialog({
  open,
  onOpenChange,
  title,
  onTitleChange,
  onSubmit,
  onCancel,
}: ColumnEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md mx-auto rounded-xl p-5 gap-0">
        <DialogHeader className="pb-4 border-b border-border/40">
          <DialogTitle>Edit Column</DialogTitle>
          <DialogDescription>
            Modify the current title of your kanban workflow stage.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-5 py-4">
          <div className="space-y-1.5">
            <Label className="inline-flex items-center gap-1.5 text-foreground/90">
              <Edit3 className="h-3.5 w-3.5 opacity-60" />
              Column Title
            </Label>
            <Input
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Enter new column title..."
              required
              className="h-9.5 rounded-lg"
            />
          </div>

          <DialogFooter className="pt-3 border-t border-border/40 gap-2 sm:gap-0">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-9 font-medium"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="h-9 font-semibold px-4 shadow-sm shadow-primary/10"
            >
              <Check className="h-4 w-4" /> Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
