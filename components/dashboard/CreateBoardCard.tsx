'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface CreateBoardCardProps {
  onClick: () => void;
}

export default function CreateBoardCard({ onClick }: CreateBoardCardProps) {
  return (
    <Card
      className="group py-20 sm:py-20 lg:py-12 transition-all duration-500 cursor-pointer bg-white/5 backdrop-blur-md hover:bg-white hover:shadow-lg text-gray-500 hover:text-green-700 border-2 border-dashed hover:border-green-600"
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center justify-center h-full gap-3">
        <Plus className="size-10" />
        <span className="text-sm font-medium">Create new board</span>
      </CardContent>
    </Card>
  );
}