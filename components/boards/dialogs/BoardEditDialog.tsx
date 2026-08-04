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
import { Check, Palette, Type } from "lucide-react";
import { colors } from "@/utils/utils";

interface BoardEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  color: string;
  onTitleChange: (title: string) => void;
  onColorChange: (color: string) => void;
  onSave: (e: React.FormEvent) => void;
}

export default function BoardEditDialog({
  open,
  onOpenChange,
  title,
  color,
  onTitleChange,
  onColorChange,
  onSave,
}: BoardEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md mx-auto rounded-xl p-5 gap-0">
        <DialogHeader className="pb-4 border-b border-border/40">
          <DialogTitle>Edit Board</DialogTitle>
          <DialogDescription>
            Modify your project board title and visual theme identity.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSave} className="space-y-5 py-4">
          <div className="space-y-1.5">
            <Label className="inline-flex items-center gap-1.5 text-foreground/90">
              <Type className="h-3.5 w-3.5 opacity-60" />
              Board Title
            </Label>
            <Input
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Enter new board title..."
              required
              className="h-9.5 rounded-lg"
            />
          </div>

          <div className="space-y-2.5">
            <Label className="inline-flex items-center gap-1.5 text-foreground/90">
              <Palette className="h-3.5 w-3.5 opacity-60" />
              Board Color
            </Label>
            <div className="grid grid-cols-6 gap-3.5 sm:gap-4 max-xs:grid-cols-4 justify-items-center">
              {colors.map((c) => {
                const isSelected = c === color;
                return (
                  <button
                    key={c}
                    type="button"
                    className={`${c} h-8 w-8 rounded-lg cursor-pointer transition-all relative border border-black/10 dark:border-white/10 shadow-xs active:scale-90 hover:scale-105 ${
                      isSelected
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : ""
                    }`}
                    onClick={() => onColorChange(c)}
                  >
                    {isSelected && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/10 dark:bg-white/10 rounded-lg">
                        <Check className="h-3.5 w-3.5 text-white mix-blend-difference stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <DialogFooter className="pt-3 border-t border-border/40 gap-2 sm:gap-0">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-9 font-medium"
              onClick={() => onOpenChange(false)}
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
