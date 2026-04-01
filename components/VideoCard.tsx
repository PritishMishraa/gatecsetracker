"use client";
import Image from "next/image";

import { Checkbox } from "@/components/ui/checkbox";
import { Dispatch, SetStateAction } from "react";

function capitalizeFirstLetter(str: string): string {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

function formatTime(timeString: string): string {
  const parts = timeString.split(":");
  const formattedParts = parts.map((part) => {
    part = part.trim();
    if (part.length === 1) return `0${part}`;
    return part;
  });
  return formattedParts.join(":");
}

type TVideoCard = {
  video: Video;
  checkboxStatus: Record<string, boolean>;
  setCheckboxStatus: Dispatch<SetStateAction<Record<string, boolean>>>;
};

export default function VideoCard({
  video,
  checkboxStatus,
  setCheckboxStatus,
}: TVideoCard) {
  const isChecked = checkboxStatus[video.index];

  const handleCheckboxChange = (index: string) => {
    setCheckboxStatus((prevStatus) => ({
      ...prevStatus,
      [index]: !prevStatus[index],
    }));
  };

  return (
    <div
      className={`flex rounded-2xl border p-4 transition-colors ${
        isChecked
          ? "border-emerald-200/60 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-900/15"
          : "bg-card border-border/60"
      }`}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <a href={video.videoLink} target="_blank" rel="noopener noreferrer">
          <Image
            src={video.thumbnailUrl}
            alt={video.videoTitle}
            width={100}
            height={56}
            className="h-14 max-w-fit rounded-xl"
          />
        </a>
        <a
          href={video.videoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground ml-2 grow truncate text-sm font-medium hover:underline"
        >
          {capitalizeFirstLetter(video.videoTitle)}
        </a>
        <div className="ml-1 flex shrink-0 items-center gap-2">
          <p className="text-muted-foreground text-sm">
            {formatTime(video.videoTime)}
          </p>
          <Checkbox
            checked={isChecked}
            onCheckedChange={() => handleCheckboxChange(video.index)}
          />
        </div>
      </div>
    </div>
  );
}
