/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
  const { board, columns, createRealTask, moveTask, createColumn, updateColumn, updateBoard } = useBoard(id);

  // State
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newColor, setNewColor] = useState("");

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCreatingColumn, setIsCreatingColumn] = useState(false);
  const [isEditingColumn, setIsEditingColumn] = useState(false);
  const [editingColumn, setEditingColumn] = useState<ColumnWithTasks | null>(null);
  const [editingColumnTitle, setEditingColumnTitle] = useState("");

  const [filters, setFilters] = useState({
    priority: [] as string[],
    assignee: [] as string[],
    dueDate: null as string | null,
  });

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const gradientColor = board ? gradientMap[board.color] || "bg-gray-100" : "bg-gray-100";

  // Handlers
  const handleFilterChange = (type: "priority" | "assignee" | "dueDate", value: string | string[] | null) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const clearFilters = () => {
    setFilters({ priority: [], assignee: [], dueDate: null });
  };

  const handleUpdateBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !board) return;
    await updateBoard(board.id, { title: newTitle.trim(), color: newColor || board.color });
    setIsEditingTitle(false);
  };

  const handleCreateTask = async (taskData: any) => {
    const targetColumn = columns[0];
    if (!targetColumn) return;
    await createRealTask(targetColumn.id, taskData);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id as string;
    const task = columns.flatMap((col) => col.tasks).find((t) => t.id === taskId);
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
        col.tasks.some((task) => task.id === taskId)
      );
      if (sourceColumn && sourceColumn.id !== targetColumn.id) {
        await moveTask(taskId, targetColumn.id, targetColumn.tasks.length);
      }
    } else {
      const sourceColumn = columns.find((col) =>
        col.tasks.some((task) => task.id === taskId)
      );
      const targetColumn = columns.find((col) =>
        col.tasks.some((task) => task.id === overId)
      );

      if (sourceColumn && targetColumn) {
        const oldIndex = sourceColumn.tasks.findIndex((task) => task.id === taskId);
        const newIndex = targetColumn.tasks.findIndex((task) => task.id === overId);
        if (oldIndex !== newIndex) {
          await moveTask(taskId, targetColumn.id, newIndex);
        }
      }
    }
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
      const matchesPriority = filters.priority.length === 0 || filters.priority.includes(task.priority);
      const matchesAssignee = filters.assignee.length === 0 || (task.assignee && filters.assignee.includes(task.assignee));
      const matchesDueDate = !filters.dueDate || task.due_date === filters.dueDate;
      return matchesPriority && matchesAssignee && matchesDueDate;
    }),
  }));

  return (
    <>
      <div className={`min-h-screen bg-linear-to-br from-gray-100 via-gray-100 ${gradientColor}`}>
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
          filterCount={
            Object.values(filters).reduce((count, v) =>
              count + (Array.isArray(v) ? v.length : v !== null ? 1 : 0), 0
            )
          }
        />

        <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Total Tasks: </span>
              {columns.reduce((sum, col) => sum + col.tasks.length, 0)}
            </div>

            <TaskCreateDialog
              onSubmit={handleCreateTask}
              trigger={
                <Button className="bg-green-600 hover:bg-green-400 text-white hover:text-green-800">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              }
            />
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={rectIntersection}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <div className="flex flex-col lg:flex-row lg:space-x-4 lg:overflow-x-auto lg:pb-6 space-y-6 lg:space-y-0">
              {filteredColumns.map((column) => (
                <DroppableColumn
                  key={column.id}
                  column={column}
                  onEditColumn={handleEditColumn}
                  onCreateTask={handleCreateTask}
                />
              ))}

              <div className="w-full lg:shrink-0 lg:w-80">
                <Button
                  variant="outline"
                  className="w-full h-full min-h-[160px] text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-white border-3 border-gray-300 border-dashed hover:border-gray-400"
                  onClick={() => setIsCreatingColumn(true)}
                >
                  <Plus className="mr-2" />
                  Add another list
                </Button>
              </div>

              <DragOverlay>
                {activeTask && <TaskOverlay task={activeTask} />}
              </DragOverlay>
            </div>
          </DndContext>
        </main>
      </div>

      {/* Dialogs */}
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
    </>
  );
}