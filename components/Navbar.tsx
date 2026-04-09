"use client";

import Link from "next/link";
import { useAuthSession } from "@/components/SessionProvider";
import { ThemeToggle } from "./ThemeToggle";
import { UserButton } from "./UserButton";

export function Navbar() {
  const { session, isPending } = useAuthSession();

  return (
    <nav className="relative z-20 w-full">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-5">
        <Link
          href="/"
          className="text-foreground text-xl font-medium tracking-tight"
        >
          GATE CSE Tracker
        </Link>
        <div className="hidden items-center gap-8 text-sm md:flex">
          <Link
            href="/subject"
            className="text-foreground transition-opacity hover:opacity-60"
          >
            Subjects
          </Link>
          <Link
            href="/#premium"
            className="text-foreground transition-opacity hover:opacity-60"
          >
            Premium
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isPending ? (
            <div className="bg-muted size-8 animate-pulse rounded-full" />
          ) : session ? (
            <UserButton />
          ) : (
            <Link
              href="/sign-in"
              className="bg-primary text-primary-foreground rounded-full px-5 py-2.5 text-sm transition-opacity hover:opacity-90"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
