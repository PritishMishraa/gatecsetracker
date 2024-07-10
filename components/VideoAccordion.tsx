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
    let totalWatchedVideosTime = 0;
    let totalLength = 0
    for (let i = 0; i < videosForDay.length; i++) {
      if (checkboxStatus[videosForDay[i].index] === true) {
        totalWatchedVideosTime += (videosForDay[i].videoDurationInSeconds)
      }
      totalLength += videosForDay[i].videoDurationInSeconds;
    }
    return (totalWatchedVideosTime / totalLength) * 100;
  }

  return (
    <div className="mx-auto py-1">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex items-center w-full">
              <h1 className="font-bold text-lg flex-shrink-0">
                Day - {day}{" "}
                <span className="text-muted-foreground font-normal text-base ml-1 block">
                  {videos} videos
                </span>
              </h1>
              <div className="flex-grow mx-4">
                <div className="flex justify-center">
                  <Progress
                    value={calculateProgress()}
                    className="w-full md:w-96"
                  />
                </div>
              </div>
            </div>
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
