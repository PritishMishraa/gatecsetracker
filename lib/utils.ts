import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertSecondsToTime(seconds: number) {
  const hours: string = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const minutes: string = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs: string = String(seconds % 60).padStart(2, '0');

  return `${hours} hrs ${minutes} mins ${secs} secs`;
}