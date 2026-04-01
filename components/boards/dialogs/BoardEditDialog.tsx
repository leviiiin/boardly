"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCheck } from "lucide-react";
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
      <DialogContent className="w-[95vw] max-w-[430px] mx-auto">
        <DialogHeader>
          <DialogTitle>Edit Board</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSave} className="space-y-6 mt-4">
          <div>
            <Label>Board Title</Label>
            <Input
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Enter new board title..."
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label>Board Color</Label>
            <div className="grid grid-cols-6 gap-4 mt-4 max-sm:grid-cols-4">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`${c} w-9 h-9 rounded-full cursor-pointer transition-all ${c === color ? "ring-2 ring-offset-2 ring-gray-800" : ""
                    }`}
                  onClick={() => onColorChange(c)}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              <CheckCheck className="mr-2" /> Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}