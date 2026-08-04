"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface CreateBoardCardProps {
  onClick: () => void;
}

export default function CreateBoardCard({ onClick }: CreateBoardCardProps) {
  return (
    <Card
      className="group h-full min-h-[160px] border-2 border-dashed border-border/60 bg-card/40 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 cursor-pointer shadow-none hover-lift active:scale-[0.98]"
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center justify-center h-full py-8 text-muted-foreground/80 group-hover:text-primary transition-colors gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card border border-border/40 shadow-sm group-hover:border-primary/20 group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
          <Plus className="h-5 w-5 stroke-[2.5]" />
        </div>
        <span className="text-xs font-semibold tracking-tight">
          Create new board
        </span>
      </CardContent>
    </Card>
  );
}