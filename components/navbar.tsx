"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  ArrowLeft,
  Filter,
  LayoutDashboard,
  MoreHorizontal,
  Trello,
  Sparkles,
} from "lucide-react";

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

export default function Navbar({
  page,
  boardTitle,
  onEditBoard,
  boardColor,
  onFilterClick,
  filterCount = 0,
  isFilterOpen,
  isEditingTitle,
}: NavbarProps) {
  if (page === "board") {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors max-[426px]:hidden group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
              </Link>

              <div className="hidden h-5 w-px bg-border max-[426px]:hidden sm:block" />

              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${boardColor ?? "bg-primary/10 text-primary"} shadow-sm transition-shadow group-hover:shadow-md`}
                >
                  <Trello className="h-6 w-6 text-white" />
                </div>
                <h1 className="truncate text-base sm:text-lg font-semibold text-foreground tracking-tight max-w-[120px] sm:max-w-[240px] md:max-w-none">
                  {boardTitle ?? "Board title"}
                </h1>
                {onEditBoard && (
                  <Button
                    variant={isEditingTitle ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-lg"
                    onClick={onEditBoard}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {onFilterClick && (
                <Button
                  variant={
                    isFilterOpen
                      ? "default"
                      : filterCount > 0
                        ? "secondary"
                        : "outline"
                  }
                  size="sm"
                  className="h-9 gap-2 font-medium shadow-xs"
                  onClick={onFilterClick}
                >
                  <Filter className="h-3.5 w-3.5" />
                  <span className="hidden xs:inline">Filter</span>
                  {filterCount > 0 && (
                    <Badge
                      variant={isFilterOpen ? "secondary" : "default"}
                      className="h-5 px-1.5 min-w-5 justify-center rounded-md text-[11px] font-bold"
                    >
                      {filterCount}
                    </Badge>
                  )}
                </Button>
              )}
              <div className="flex h-9 w-9 items-center justify-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90 group"
          >
            <div className="relative">
              <Image
                src="/Logo.png"
                alt="Boardly Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full animate-pulse-glow" />
            </div>
            <span className="font-mono text-xl font-bold tracking-tight text-foreground">
              Boardly
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <SignedIn>
              <div className="flex items-center gap-4">
                {page !== "dashboard" && (
                  <Link href="/dashboard">
                    <Button
                      size="sm"
                      className="h-9 gap-1.5 font-medium shadow-xs max-xs:h-9 max-xs:w-9 max-xs:rounded-full max-xs:p-0"
                    >
                      <LayoutDashboard className="h-4 w-4" strokeWidth={2} />
                      <span className="max-xs:hidden">Dashboard</span>
                    </Button>
                  </Link>
                )}
                <div className="flex h-9 w-9 items-center justify-center">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </SignedIn>

            <SignedOut>
              <div className="flex items-center gap-2">
                <Link href="/sign-in">
                  <Button variant="ghost" size="sm" className="h-9 font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button
                    size="sm"
                    className="h-9 font-medium shadow-sm shadow-primary/10"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}
