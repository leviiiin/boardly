'use client';

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Board } from "@/supabase/models";
import { isNew } from "@/utils/utils";
import Link from "next/link";

interface BoardCardProps {
  board: Board & { taskCount?: number };
}

export default function BoardCard({ board }: BoardCardProps) {
  return (
    <Link href={`/boards/${board.id}`}>
      <Card className="transition-all duration-500 cursor-pointer group bg-white/5 backdrop-blur-md hover:bg-white hover:shadow-lg h-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className={`w-5 h-5 ${board.color || 'bg-gray-400'} rounded`} />
            {isNew(board.created_at) && <Badge variant="new">New</Badge>}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CardTitle className="text-2xl text-gray-700 line-clamp-2">{board.title}</CardTitle>
          <CardDescription className="text-lg mt-1 line-clamp-2">
            {board.description || "No description"}
          </CardDescription>

          <div className="flex flex-col mt-4 text-sm text-gray-500">
            <span>Created: {new Date(board.created_at).toLocaleDateString()}</span>
            <span>Updated: {new Date(board.updated_at).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}