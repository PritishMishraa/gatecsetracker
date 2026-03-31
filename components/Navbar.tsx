import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <nav className="relative z-20 w-full">
      <div className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto w-full">
      <Link
        href="/"
        className="text-xl font-medium tracking-tight text-foreground"
      >
        GATE CSE Tracker
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm">
        <Link
          href="/subject"
          className="hover:opacity-60 transition-opacity text-foreground"
        >
          Subjects
        </Link>
        <Link
          href="/#premium"
          className="hover:opacity-60 transition-opacity text-foreground"
        >
          Premium
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Link
          href="/subject"
          className="text-sm bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
        >
          Get Started
        </Link>
      </div>
      </div>
    </nav>
  );
}
