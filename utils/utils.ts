import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isNew(createdAt: string) {
  const now = new Date().getTime();
  const createdDate = new Date(createdAt).getTime();
  const diffInHours = (now - createdDate) / (1000 * 60 * 60);

  return diffInHours < 24;
}

export const colors = [
  "bg-blue-600",
  "bg-green-600",
  "bg-yellow-500",
  "bg-red-500",
  "bg-purple-600",
  "bg-lime-500",
  "bg-indigo-600",
  "bg-gray-600",
  "bg-orange-600",
  "bg-teal-600",
  "bg-cyan-500",
  "bg-emerald-500",
];

export const gradientMap: Record<string, string> = {
  "bg-blue-600": "to-blue-600",
  "bg-green-600": "to-green-600",
  "bg-yellow-500": "to-yellow-500",
  "bg-red-500": "to-red-500",
  "bg-purple-600": "to-purple-600",
  "bg-lime-500": "to-lime-500",
  "bg-indigo-600": "to-indigo-600",
  "bg-gray-600": "to-gray-600",
  "bg-orange-600": "to-orange-600",
  "bg-teal-600": "to-teal-600",
  "bg-cyan-500": "to-cyan-500",
  "bg-emerald-500": "to-emerald-500",
}

export const priorityLevels = ["low", "medium", "high"];