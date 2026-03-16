"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Dispatch, SetStateAction } from "react";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

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

  const [starred , setStarred] = useState(false);

  useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("starredVideos") || "[]");
  
  if (saved.includes(video.index)) {
    setStarred(true);
  }
}, [video.index]);

const toggleStar = () => {
  const saved = JSON.parse(localStorage.getItem("starredVideos") || "[]");

  

  if (saved.includes(video.index)) {
    const updated = saved.filter((id: string) => id !== video.index);
    localStorage.setItem("starredVideos", JSON.stringify(updated));
    setStarred(false);
  } else {
    saved.push(video.index);
    localStorage.setItem("starredVideos", JSON.stringify(saved));
    setStarred(true);
  }
  window.dispatchEvent(new Event("starredVideosUpdated"));
};


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
        <div className="flex items-center gap-3 ml-1">
          <p className="text-md text-white/60">{formatTime(video.videoTime)}</p>
          <button onClick={toggleStar}>
    <Star
      className={`w-5 h-5 cursor-pointer transition ${
        starred
          ? "text-yellow-400 fill-yellow-400"
          : "text-gray-400 hover:text-yellow-400"
      }`}
    />
  </button>
          <Checkbox
            checked={isChecked}
            onCheckedChange={() => handleCheckboxChange(video.index)}
          />
        </div>
      </div>
    </div>
  );
}
