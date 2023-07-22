"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Dispatch, SetStateAction } from "react";

function capitalizeFirstLetter(str: string): string {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

function formatTime(timeString: string): string {
  const parts = timeString.split(":");
  const formattedParts = parts.map((part) => {
    part = part.trim();
    if (part.length === 1) {
      return `0${part}`;
    }
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
      className={`flex border rounded-lg p-4 ${
        isChecked ? "bg-green-400/60" : ""
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <a href={video.videoLink} target="_blank" rel="noopener noreferrer">
          <img
            src={video.thumbnailUrl}
            alt={video.videoTitle}
            className="rounded-lg max-w-fit h-[56px]"
          />
        </a>
        <a
          href={video.videoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-md font-medium flex-grow truncate hover:underline ml-2"
        >
          {capitalizeFirstLetter(video.videoTitle)}
        </a>
        <div className="flex items-center gap-2 ml-1">
          <p className="text-md text-white/60">{formatTime(video.videoTime)}</p>
          <Checkbox
            checked={isChecked}
            onCheckedChange={() => handleCheckboxChange(video.index)}
          />
        </div>
      </div>
    </div>
  );
}
