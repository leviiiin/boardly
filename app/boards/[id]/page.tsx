/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Plus, KanbanSquare } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { useBoard } from "@/hooks/useBoards";
import { ColumnWithTasks, Task } from "@/supabase/models";

import DroppableColumn from "@/components/boards/DroppableColumn";
import TaskOverlay from "@/components/boards/TaskOverlay";
import TaskCreateDialog from "@/components/boards/TaskCreateDialog";

import BoardEditDialog from "@/components/boards/dialogs/BoardEditDialog";
import ColumnCreateDialog from "@/components/boards/dialogs/ColumnCreateDialog";
import ColumnEditDialog from "@/components/boards/dialogs/ColumnEditDialog";
import TaskFiltersDialog from "@/components/boards/dialogs/TaskFiltersDialog";

import { gradientMap } from "@/utils/utils";

export default function BoardPage() {
  const { id } = useParams<{ id: string }>();
  const {
    board,
    columns,
    createRealTask,
    moveTask,
    createColumn,
    updateColumn,
    updateBoard,
  } = useBoard(id);

  // State
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newColor, setNewColor] = useState("");

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCreatingColumn, setIsCreatingColumn] = useState(false);
  const [isEditingColumn, setIsEditingColumn] = useState(false);
  const [editingColumn, setEditingColumn] = useState<ColumnWithTasks | null>(
    null,
  );
  const [editingColumnTitle, setEditingColumnTitle] = useState("");

  const [filters, setFilters] = useState({
    priority: [] as string[],
    assignee: [] as string[],
    dueDate: null as string | null,
  });

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const gradientColor = board
    ? gradientMap[board.color] || "from-slate-50 to-slate-100"
    : "from-slate-50 to-slate-100";

  // Handlers
  const handleFilterChange = (
    type: "priority" | "assignee" | "dueDate",
    value: string | string[] | null,
  ) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const clearFilters = () => {
    setFilters({ priority: [], assignee: [], dueDate: null });
  };

  const handleUpdateBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !board) return;
    await updateBoard(board.id, {
      title: newTitle.trim(),
      color: newColor || board.color,
    });
    setIsEditingTitle(false);
  };

  const handleCreateTask = async (taskData: any) => {
    const targetColumn = columns[0];
    if (!targetColumn) return;
    await createRealTask(targetColumn.id, taskData);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id as string;
    const task = columns
      .flatMap((col) => col.tasks)
      .find((t) => t.id === taskId);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const overId = over.id as string;

    const targetColumn = columns.find((col) => col.id === overId);

    if (targetColumn) {
      const sourceColumn = columns.find((col) =>
        col.tasks.some((task) => task.id === taskId),
      );
      if (sourceColumn && sourceColumn.id !== targetColumn.id) {
        await moveTask(taskId, targetColumn.id, targetColumn.tasks.length);
      }
    } else {
      const sourceColumn = columns.find((col) =>
        col.tasks.some((task) => task.id === taskId),
      );
      const targetColumn = columns.find((col) =>
        col.tasks.some((task) => task.id === overId),
      );

      if (sourceColumn && targetColumn) {
        const oldIndex = sourceColumn.tasks.findIndex(
          (task) => task.id === taskId,
        );
        const newIndex = targetColumn.tasks.findIndex(
          (task) => task.id === overId,
        );
        if (oldIndex !== newIndex) {
          await moveTask(taskId, targetColumn.id, newIndex);
        }
      }
    }
    setActiveTask(null);
  };

  const handleCreateColumn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingColumnTitle.trim()) return;
    await createColumn(editingColumnTitle.trim());
    setEditingColumnTitle("");
    setIsCreatingColumn(false);
  };

  const handleUpdateColumn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingColumnTitle.trim() || !editingColumn) return;
    await updateColumn(editingColumn.id, editingColumnTitle.trim());
    setEditingColumnTitle("");
    setIsEditingColumn(false);
    setEditingColumn(null);
  };

  const handleEditColumn = (column: ColumnWithTasks) => {
    setEditingColumn(column);
    setEditingColumnTitle(column.title);
    setIsEditingColumn(true);
  };

  // Filtered Columns
  const filteredColumns = columns.map((col) => ({
    ...col,
    tasks: col.tasks.filter((task) => {
      const matchesPriority =
        filters.priority.length === 0 ||
        filters.priority.includes(task.priority);
      const matchesAssignee =
        filters.assignee.length === 0 ||
        (task.assignee && filters.assignee.includes(task.assignee));
      const matchesDueDate =
        !filters.dueDate || task.due_date === filters.dueDate;
      return matchesPriority && matchesAssignee && matchesDueDate;
    }),
  }));

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${gradientColor} transition-all duration-300`}
    >
      <Navbar
        page="board"
        boardTitle={board?.title}
        boardColor={board?.color}
        onEditBoard={() => {
          setNewTitle(board?.title ?? "");
          setNewColor(board?.color ?? "");
          setIsEditingTitle(true);
        }}
        onFilterClick={() => setIsFilterOpen(true)}
        isFilterOpen={isFilterOpen}
        filterCount={Object.values(filters).reduce(
          (count, v) =>
            count + (Array.isArray(v) ? v.length : v !== null ? 1 : 0),
          0,
        )}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
        {/* Meta Header */}
        <div className="flex items-center justify-between gap-4 mb-6 bg-card/60 backdrop-blur-md border border-border/40 p-3.5 rounded-xl shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-tight text-muted-foreground/90">
            <KanbanSquare className="h-4 w-4 text-primary opacity-80" />
            <span className="bg-muted px-2 py-0.5 rounded-md text-foreground font-bold">
              {columns.reduce((sum, col) => sum + col.tasks.length, 0)}
            </span>
            <span>total tasks distribution</span>
          </div>

          <TaskCreateDialog
            onSubmit={handleCreateTask}
            trigger={
              <Button
                size="sm"
                className="h-8.5 font-semibold px-4 shadow-sm shadow-primary/10"
              >
                <Plus className="h-4 w-4 stroke-[2.5]" />
                Add Task
              </Button>
            }
          />
        </div>

        {/* Workspace Canvas */}
        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex flex-col lg:flex-row items-stretch lg:overflow-x-auto gap-4 pb-4 select-none max-h-[calc(100vh-11rem)] overflow-y-auto lg:overflow-y-hidden">
            {filteredColumns.map((column) => (
              <DroppableColumn
                key={column.id}
                column={column}
                onEditColumn={handleEditColumn}
                onCreateTask={handleCreateTask}
              />
            ))}

            <div className="w-full lg:w-72 lg:shrink-0 h-auto">
              <Button
                variant="outline"
                className="w-full h-full min-h-[120px] rounded-xl border-2 border-dashed border-border/80 bg-card/40 hover:bg-card hover:border-primary/40 text-muted-foreground/80 hover:text-primary transition-all duration-150 shadow-none font-semibold text-xs tracking-tight justify-center gap-1.5 active:scale-[0.99]"
                onClick={() => {
                  setEditingColumnTitle("");
                  setIsCreatingColumn(true);
                }}
              >
                <Plus className="h-4 w-4 stroke-[2.5]" />
                Add another stage
              </Button>
            </div>
          </div>

          <DragOverlay adjustScale={false}>
            {activeTask ? <TaskOverlay task={activeTask} /> : null}
          </DragOverlay>
        </DndContext>
      </main>

      {/* Structural Management Layer */}
      <BoardEditDialog
        open={isEditingTitle}
        onOpenChange={setIsEditingTitle}
        title={newTitle}
        color={newColor}
        onTitleChange={setNewTitle}
        onColorChange={setNewColor}
        onSave={handleUpdateBoard}
      />

      <ColumnCreateDialog
        open={isCreatingColumn}
        onOpenChange={setIsCreatingColumn}
        title={editingColumnTitle}
        onTitleChange={setEditingColumnTitle}
        onSubmit={handleCreateColumn}
      />

      <ColumnEditDialog
        open={isEditingColumn}
        onOpenChange={setIsEditingColumn}
        title={editingColumnTitle}
        onTitleChange={setEditingColumnTitle}
        onSubmit={handleUpdateColumn}
        onCancel={() => {
          setIsEditingColumn(false);
          setEditingColumn(null);
          setEditingColumnTitle("");
        }}
      />

      <TaskFiltersDialog
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
      />
    </div>
  );
}
