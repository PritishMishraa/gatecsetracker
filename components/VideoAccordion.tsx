import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import VideoCard from "./VideoCard";
import { Dispatch, SetStateAction } from "react";

type TVideoAccordion = {
  day: number;
  videos: number;
  videosForDay: Video[];
  checkboxStatus: Record<string, boolean>;
  setCheckboxStatus: Dispatch<SetStateAction<Record<string, boolean>>>;
};

export default function VideoAccordion({
  day,
  videos,
  videosForDay,
  checkboxStatus,
  setCheckboxStatus,
}: TVideoAccordion) {
  function calculateProgress() {
    const totalVideos = videosForDay.length;
    const startIndex = parseInt(videosForDay[0].index);
    const endIndex = parseInt(videosForDay[videosForDay.length - 1].index);
    let totalWatchedVideos = 0;

    for (let i = startIndex; i <= endIndex; i++) {
      if (checkboxStatus[i.toString()] === true) {
        totalWatchedVideos++;
      }
    }

    return (totalWatchedVideos / totalVideos) * 100;
  }

  return (
    <div className="max-w-2xl mx-auto py-1">
      <Accordion type="single" collapsible className="w-full px-4 md:px-0">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h1 className="font-bold text-lg">
              Day - {day}{" "}
              <span className="text-muted-foreground font-normal text-base ml-1 block">
                {videos} videos
              </span>
            </h1>
            <Progress value={calculateProgress()} className="w-52 md:w-80" />
          </AccordionTrigger>
          <AccordionContent>
            {videosForDay.map((video) => (
              <div key={video.index} className="mb-4">
                <VideoCard
                  video={video}
                  checkboxStatus={checkboxStatus}
                  setCheckboxStatus={setCheckboxStatus}
                />
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
