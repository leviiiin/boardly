"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
      priority: (formData.get("priority") as "low" | "medium" | "high") || "medium",
    };

    if (taskData.title.trim()) {
      await onSubmit(taskData);
      e.currentTarget.reset();
      onOpenChange?.(false);
    }
  };

  const content = (
    <DialogContent className="w-[95vw] max-w-[430px] mx-auto">
      <DialogHeader>
        <DialogTitle>Create New Task</DialogTitle>
      </DialogHeader>

      <form className="mt-1 space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label>Title <span className="text-red-700 text-xl">*</span></Label>
          <Input
            type="text"
            name="title"
            className="mt-2"
            placeholder="Enter task title"
            required
          />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            name="description"
            rows={3}
            className="mt-2"
            placeholder="Enter task description"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap max-[426px]:flex-col max-[426px]:items-start max-[426px]:gap-6">
          <div className="flex-1">
            <Label>Assignee</Label>
            <Input
              type="text"
              name="assignee"
              className="mt-2"
              placeholder="Who should do this?"
            />
          </div>

          <div className="flex-1">
            <Label className="mb-2">Priority</Label>
            <Select name="priority" defaultValue="medium">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorityLevels.map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Due Date</Label>
          <Input
            type="date"
            name="dueDate"
            className="mt-2 cursor-pointer"
          />
        </div>

        <div className="flex justify-end">
          <DialogClose asChild>
            <Button type="submit" className="min-w-35 max-[376px]:w-full">
              Create Task
            </Button>
          </DialogClose>
        </div>
      </form>
    </DialogContent>
  );

  if (trigger) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        {content}
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {content}
    </Dialog>
  );
}