"use client";

import React, { useState, useEffect } from "react";

import data from "./gatecsedm.json" assert { type: "json" };

type Video = {
  index: string;
  thumbnailUrl: string;
  videoTitle: string;
  channelName: string;
  views: string;
  uploadedTime: string;
  videoTime: string;
  videoDurationInSeconds: number;
};

function capitalizeFirstLetter(str: string): string {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

const videosPerPage = 5;

export default function Home() {
  const studyTimePerDay = 7200;

  const totalVideos = data.length;

  const [currentPage, setCurrentPage] = useState(1);
  const [checkboxStatus, setCheckboxStatus] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    const savedCheckboxStatus = localStorage.getItem("checkboxStatus");
    if (savedCheckboxStatus) {
      setCheckboxStatus(JSON.parse(savedCheckboxStatus));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("checkboxStatus", JSON.stringify(checkboxStatus));
  }, [checkboxStatus]);

  const groupedVideos: Video[][] = [];
  let currentDay: Video[] = [];
  let currentTotalTime = 0;

  for (let i = 0; i < totalVideos; i++) {
    const video = data[i];
    const videoDuration = video.videoDurationInSeconds;

    if (currentTotalTime + videoDuration <= studyTimePerDay) {
      currentDay.push(video);
      currentTotalTime += videoDuration;
    } else {
      groupedVideos.push(currentDay);
      currentDay = [video];
      currentTotalTime = videoDuration;
    }
  }

  // Add the last day
  if (currentDay.length > 0) {
    groupedVideos.push(currentDay);
  }

  const totalDays = groupedVideos.length;

  // Calculate pagination
  const totalPages = Math.ceil(totalDays / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const endIndex = startIndex + videosPerPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (index: string) => {
    setCheckboxStatus((prevStatus) => ({
      ...prevStatus,
      [index]: !prevStatus[index],
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <p className="text-lg mb-4">Total Number of Days: {totalDays}</p>
      {groupedVideos.slice(startIndex, endIndex).map((videosForDay, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-lg font-semibold mb-4">
            Day {startIndex + index + 1} - {videosForDay.length} videos
          </h2>
          {videosForDay.map((video: Video) => (
            <div key={video.index} className="mb-4">
              <img
                src={video.thumbnailUrl}
                alt={video.videoTitle}
                className="mb-2 rounded-md"
              />
              <h3 className="text-lg font-semibold mb-1">
                {capitalizeFirstLetter(video.videoTitle)}
              </h3>
              <p className="text-gray-600 mb-1">{video.videoTime}</p>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={checkboxStatus[video.index]}
                  onChange={() => handleCheckboxChange(video.index)}
                  className="mr-2"
                />
                <span className="text-gray-600">Watched</span>
              </label>
            </div>
          ))}
        </div>
      ))}

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`mx-1 px-3 py-1 rounded ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page === currentPage ? `Week ${page}` : page}
          </button>
        ))}
      </div>
    </div>
  );
}
