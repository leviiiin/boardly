"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ArrowLeft, Filter, LayoutDashboard, MoreHorizontal, Trello } from "lucide-react";
import { Badge } from "./ui/badge";

interface NavbarProps {
  page?: string;
  boardTitle?: string;
  boardColor?: string;
  onEditBoard?: () => void;
  onFilterClick?: () => void;
  filterCount?: number;
  isFilterOpen?: boolean;
  isEditingTitle?: boolean;
}

export default function Navbar({ page, boardTitle, onEditBoard, boardColor, onFilterClick, filterCount = 0, isFilterOpen, isEditingTitle }: NavbarProps) {

  if (page === "board") {
    return <header className="border-b bg-white/10 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 min-w-0">
            <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-green-700 transition duration-300 max-[426px]:flex-col max-[426px]:text-sm max-[426px]:space-x-0 max-[376px]:hidden">
              <ArrowLeft className="w-5 h-5" />
              <span className="max-sm:hidden">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <div className="h-4 sm:h-6 w-px bg-gray-300 hidden sm:block" />
            <div className="flex items-center space-x-2">
              <div className={`${boardColor ?? "bg-gray-400"} rounded-sm w-7 h-7 flex items-center justify-center`}>
                <Trello className="text-gray-200 w-6 h-6" />
              </div>
              <span className="text-sm sm:text-xl font-bold text-gray-800 truncate block max-md:max-w-20">{boardTitle ?? 'Board title'}</span>
              {onEditBoard && (
                <Button variant="ghost" size="sm" className={`h-7 w-7 shrink-0 p-0 mt-1 ${isEditingTitle && "bg-gray-300"}`} onClick={onEditBoard}>
                  <MoreHorizontal />
                </Button>
              )}
            </div>

          </div>
          <div className="flex items-center gap-2">
            {onFilterClick && (
              <Button
                variant="outline"
                className={`flex items-center gap-2 text-gray-800 bg-transparent hover:text-gray-800 ${filterCount > 0 && "bg-gray-300"} group *:transition *:duration-300 ${isFilterOpen && "bg-gray-700 text-gray-50"}`}
                onClick={onFilterClick}
              >
                <Filter />
                <span className="max-[501px]:hidden">Filter</span>
                {filterCount > 0 && <Badge variant="secondary" className="text-gray-900 font-bold rounded-sm group-hover:bg-gray-300">{filterCount}</Badge>}
              </Button>
            )}
            <div className="w-12 h-12">
              <UserButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  }

  return (
    <header className="border-b bg-white/10 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 max-sm:gap-1.5">
          <Image src="/Logo.png" alt="Boardly Logo" width={44} height={44} className="max-sm:w-7 max-sm:h-7" />
          <span className="text-gray-700 text-2xl font-medium font-mono max-sm:text-lg">Boardly</span>
        </Link>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex gap-2 items-center">

            <SignedIn>
              <div className="flex items-center gap-5 max-sm:gap-3">
                {page !== "dashboard" && (<Link href="/dashboard">
                  <Button variant="default" className="text-lg py-6 px-8! flex items-center gap-1 max-sm:w-12! max-sm:h-12! max-sm:text-sm max-sm:rounded-full max-sm:p-0!">
                    <LayoutDashboard className="mr-1 w-4 h-4 size-6! max-sm:mr-0" strokeWidth={2} />
                    <span className="max-sm:hidden">Dashboard</span>
                  </Button>
                </Link>)}
                <UserButton />
              </div>

            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="outline" className="text-green-600 hover:bg-green-400 hover:text-green-800 hover:border-green-400">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="default" className="bg-green-500 text-white hover:bg-green-400 hover:text-green-800">
                  Sign Up
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  )
}