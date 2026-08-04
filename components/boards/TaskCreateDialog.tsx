"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, User, AlertCircle, Calendar } from "lucide-react";

const priorityLevels = ["low", "medium", "high"] as const;

type TaskData = {
  title: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
  priority: "low" | "medium" | "high";
};

interface TaskCreateDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit: (taskData: TaskData) => Promise<void>;
  trigger?: React.ReactNode;
}

export default function TaskCreateDialog({
  open,
  onOpenChange,
  onSubmit,
  trigger,
}: TaskCreateDialogProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const taskData: TaskData = {
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || undefined,
      assignee: (formData.get("assignee") as string) || undefined,
      dueDate: (formData.get("dueDate") as string) || undefined,
      priority:
        (formData.get("priority") as "low" | "medium" | "high") || "medium",
    };

    if (taskData.title.trim()) {
      await onSubmit(taskData);
      e.currentTarget.reset();
      onOpenChange?.(false);
    }
  };

  const defaultTrigger = (
    <Button
      variant="ghost"
      size="sm"
      className="w-full justify-start text-xs font-semibold text-muted-foreground/80 hover:text-primary hover:bg-primary/5 gap-1.5 h-8.5 rounded-lg border border-dashed border-border/60 mt-1"
    >
      <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
      Add a task
    </Button>
  );

  const content = (
    <DialogContent className="w-[95vw] max-w-md mx-auto rounded-xl p-5 gap-0">
      <DialogHeader className="pb-4 border-b border-border/40">
        <DialogTitle>Create New Task</DialogTitle>
        <DialogDescription>
          Add a new card to your column with specific details.
        </DialogDescription>
      </DialogHeader>

      <form className="space-y-4 py-4" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <Label className="text-foreground/90">
            Title
            <span className="text-destructive font-bold ml-0.5">*</span>
          </Label>
          <Input
            type="text"
            name="title"
            placeholder="What needs to be done?"
            required
            className="h-9.5 rounded-lg"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-foreground/90">Description</Label>
          <Textarea
            name="description"
            placeholder="Add a more detailed description..."
            className="min-h-24 resize-none rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="inline-flex items-center gap-1.5 text-foreground/90">
              <User className="h-3.5 w-3.5 opacity-60" />
              Assignee
            </Label>
            <Input
              type="text"
              name="assignee"
              placeholder="Username or Email"
              className="h-9.5 text-xs rounded-lg"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="inline-flex items-center gap-1.5 text-foreground/90">
              <AlertCircle className="h-3.5 w-3.5 opacity-60" />
              Priority
            </Label>
            <Select name="priority" defaultValue="medium">
              <SelectTrigger className="w-full h-9.5 text-xs bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorityLevels.map((priority) => (
                  <SelectItem
                    key={priority}
                    value={priority}
                    className="text-xs"
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="inline-flex items-center gap-1.5 text-foreground/90">
            <Calendar className="h-3.5 w-3.5 opacity-60" />
            Due Date
          </Label>
            <Input
              type="date"
              name="dueDate"
              className="h-9.5 text-xs cursor-pointer rounded-lg"
            />
        </div>

        <div className="pt-3 border-t border-border/40 flex justify-end">
          <DialogClose asChild>
            <Button
              type="submit"
              size="sm"
              className="h-9 font-semibold px-5 shadow-sm shadow-primary/10"
            >
              Create Task
            </Button>
          </DialogClose>
        </div>
      </form>
    </DialogContent>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>{defaultTrigger}</DialogTrigger>
      )}
      {content}
    </Dialog>
  );
}
