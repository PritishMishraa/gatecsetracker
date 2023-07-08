"use client";

import React, { useState, useEffect } from "react";

import data from "./gatecsedm.json" assert { type: "json" };

import VideoAccordion from "@/components/VideoAccordion";
import {
  StudyDaysCombobox,
  StudyTimeCombobox,
} from "@/components/OptionCombobox";
import { Button } from "@/components/ui/button";

export default function Home() {
  const totalVideos = data.length;

  const [studyDaysOption, setDaysOption] = useState(5);
  const [studyTimeOption, setStudyTimeOption] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkboxStatus, setCheckboxStatus] = useState<Record<string, boolean>>(
    {}
  );
  const daysPerPage = studyDaysOption;
  const studyTimePerDay = 3600 * studyTimeOption;

  useEffect(() => {
    const savedDaysOption = localStorage.getItem("studyDaysOption");
    const savedCheckboxStatus = localStorage.getItem("checkboxStatus");
    const savedStudyTimeOption = localStorage.getItem("studyTimeOption");
    if (savedDaysOption) {
      setDaysOption(parseInt(savedDaysOption));
    }
    if (savedCheckboxStatus) {
      setCheckboxStatus(JSON.parse(savedCheckboxStatus));
    }
    if (savedStudyTimeOption) {
      setStudyTimeOption(parseInt(savedStudyTimeOption));
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    localStorage.setItem("studyDaysOption", studyDaysOption.toString());
  }, [studyDaysOption]);

  useEffect(() => {
    localStorage.setItem("checkboxStatus", JSON.stringify(checkboxStatus));
  }, [checkboxStatus]);

  useEffect(() => {
    setCurrentPage(1);
    localStorage.setItem("studyTimeOption", studyTimeOption.toString());
  }, [studyTimeOption]);

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

  if (currentDay.length > 0) {
    groupedVideos.push(currentDay);
  }

  const totalDays = groupedVideos.length;

  const totalPages = Math.ceil(totalDays / daysPerPage);
  const startIndex = (currentPage - 1) * daysPerPage;
  const endIndex = startIndex + daysPerPage;

  const handleStudyDaysOption = (option: number) => {
    setDaysOption(option);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStudyTimeOption = (option: number) => {
    setStudyTimeOption(option);
  };

  return (
    <div className="max-w-2xl mx-auto mb-20">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <p className="text-lg mb-4">Total Number of Days: {totalDays}</p>

      <div className="flex md:flex-row flex-col justify-center gap-4 mt-4 items-center">
        <StudyTimeCombobox
          studyTimeOption={studyTimeOption}
          handleStudyTimeOption={handleStudyTimeOption}
        />
        <StudyDaysCombobox
          studyDaysOption={studyDaysOption}
          handleStudyDaysOption={handleStudyDaysOption}
        />
      </div>

      {groupedVideos.slice(startIndex, endIndex).map((videosForDay, index) => (
        <VideoAccordion
          key={index}
          day={startIndex + index + 1}
          videos={videosForDay.length}
          videosForDay={videosForDay}
          checkboxStatus={checkboxStatus}
          setCheckboxStatus={setCheckboxStatus}
        />
      ))}

      <div className="flex justify-center mt-4 text-center">
        <Button
          className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          First
        </Button>
        <Button
          className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </Button>
        <Button className="mx-1 px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-500">
          {`Week ${currentPage}`}
        </Button>
        <Button
          className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
        <Button
          className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          Last
        </Button>
      </div>
    </div>
  );
}
