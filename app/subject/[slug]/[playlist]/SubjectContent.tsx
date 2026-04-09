"use client";

import React, { useEffect, useRef, useState } from "react";

import VideoAccordion from "@/components/VideoAccordion";
import InfoTooltip from "@/components/InfoTooltip";
import {
  SpeedCombobox,
  StudyDaysCombobox,
  StudyTimeHourCombobox,
  StudyTimeMinuteCombobox,
} from "@/components/OptionCombobox";
import { Button } from "@/components/ui/button";
import { convertSecondsToTime } from "@/lib/utils";

export default function SubjectContent({
  subject,
  initialData,
  subjectCode,
}: {
  subject: string;
  initialData: Video[];
  subjectCode: string;
}) {
  const [studyDaysOption, setDaysOption] = useState(5);
  const [studyTimeOption, setStudyTimeOption] = useState({
    hours: 4,
    minutes: 0,
  });
  const [studySpeedOption, setStudySpeedOption] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkboxStatus, setCheckboxStatus] = useState<Record<string, boolean>>(
    {},
  );
  const hasLoadedCheckboxStatus = useRef(false);
  const daysPerPage = studyDaysOption;
  const studyTimePerDay =
    3600 * studyTimeOption.hours + 60 * studyTimeOption.minutes;

  useEffect(() => {
    hasLoadedCheckboxStatus.current = false;

    const savedDaysOption = localStorage.getItem("studyDaysOption");
    const savedCheckboxStatus = localStorage.getItem(
      `checkboxStatus-${subjectCode}`,
    );
    const savedStudyTimeHourOption = localStorage.getItem(
      "savedStudyTimeHourOption",
    );
    const savedStudyTimeMinuteOption = localStorage.getItem(
      "studyTimeMinuteOption",
    );
    const savedStudySpeedOption = localStorage.getItem("studySpeedOption");

    queueMicrotask(() => {
      if (savedStudySpeedOption) {
        setStudySpeedOption(parseFloat(savedStudySpeedOption));
      }
      if (savedDaysOption) {
        setDaysOption(parseInt(savedDaysOption, 10));
      }
      if (savedCheckboxStatus) {
        setCheckboxStatus(JSON.parse(savedCheckboxStatus));
      }
      if (savedStudyTimeHourOption && savedStudyTimeMinuteOption) {
        setStudyTimeOption({
          hours: parseInt(savedStudyTimeHourOption, 10),
          minutes: parseInt(savedStudyTimeMinuteOption, 10),
        });
      }
      hasLoadedCheckboxStatus.current = true;
    });
  }, [subjectCode]);

  useEffect(() => {
    if (!hasLoadedCheckboxStatus.current) return;
    localStorage.setItem(
      `checkboxStatus-${subjectCode}`,
      JSON.stringify(checkboxStatus),
    );
  }, [checkboxStatus, subjectCode]);

  const totalVideos = initialData.length;
  const totalDuration = initialData.reduce(
    (acc, video) => acc + video.videoDurationInSeconds,
    0,
  );

  const groupedVideos: Video[][] = [];
  let currentDay: Video[] = [];
  let currentTotalTime = 0;

  for (let i = 0; i < totalVideos; i++) {
    const video = initialData[i];
    const videoDuration = video.videoDurationInSeconds / studySpeedOption;

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

  const filteredGroupedVideos = groupedVideos.filter((day) =>
    day.some((video) => !checkboxStatus[video.index]),
  );

  const totalDays = groupedVideos.length;
  const totalDaysLeft = filteredGroupedVideos.length;

  const totalPages = Math.ceil(totalDays / daysPerPage);
  const startIndex = (currentPage - 1) * daysPerPage;
  const endIndex = startIndex + daysPerPage;

  const handleStudyDaysOption = (option: number) => {
    localStorage.setItem("studyDaysOption", option.toString());
    setCurrentPage(1);
    setDaysOption(option);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStudyTimeOption = (hours: number, minutes: number) => {
    localStorage.setItem("savedStudyTimeHourOption", hours.toString());
    localStorage.setItem("studyTimeMinuteOption", minutes.toString());
    setCurrentPage(1);
    setStudyTimeOption({ hours, minutes });
  };

  const handleSpeedOption = (option: number) => {
    localStorage.setItem("studySpeedOption", option.toString());
    setStudySpeedOption(option);
  };

  return (
    <div className="relative overflow-clip">
      <div className="paper-texture" />
      <div className="relative z-10 container mx-auto max-w-5xl px-4 py-12">
        {/* Header */}
        <div className="bg-card border-border/40 mb-8 rounded-4xl border p-8 shadow-sm md:p-12">
          <h1 className="paper-hero-title mb-4 text-4xl tracking-tight md:text-5xl">
            {subject}
          </h1>
          <div className="flex flex-wrap gap-3">
            <span className="bg-background border-border/50 text-muted-foreground rounded-full border px-4 py-2 text-sm">
              Days Left: {totalDaysLeft}
            </span>
            <span className="bg-background border-border/50 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
              Total Days: {totalDays}
              <InfoTooltip
                totalDuration={convertSecondsToTime(totalDuration)}
              />
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <StudyTimeHourCombobox
            studyTimeOption={studyTimeOption}
            handleStudyTimeOption={handleStudyTimeOption}
          />
          <StudyTimeMinuteCombobox
            studyTimeOption={studyTimeOption}
            handleStudyTimeOption={handleStudyTimeOption}
          />
          <SpeedCombobox
            speedOption={studySpeedOption}
            handleSpeedOption={handleSpeedOption}
          />
        </div>

        {/* Video Accordions */}
        {groupedVideos
          .slice(startIndex, endIndex)
          .map((videosForDay, index) => (
            <VideoAccordion
              key={index}
              day={startIndex + index + 1}
              videos={videosForDay.length}
              videosForDay={videosForDay}
              checkboxStatus={checkboxStatus}
              setCheckboxStatus={setCheckboxStatus}
            />
          ))}

        {/* Pagination */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <StudyDaysCombobox
            studyDaysOption={studyDaysOption}
            handleStudyDaysOption={handleStudyDaysOption}
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(1)}
            >
              First
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prev
            </Button>
            <Button size="sm" className="rounded-full">
              {currentPage}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(totalPages)}
            >
              Last
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
