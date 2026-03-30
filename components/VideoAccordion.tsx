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
    let totalLength = 0;
    for (let i = 0; i < videosForDay.length; i++) {
      if (checkboxStatus[videosForDay[i].index] === true) {
        totalWatchedVideosTime += videosForDay[i].videoDurationInSeconds;
      }
      totalLength += videosForDay[i].videoDurationInSeconds;
    }
    return (totalWatchedVideosTime / totalLength) * 100;
  }

  return (
    <div className="py-1">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          value="item-1"
          className="bg-card rounded-2xl border border-border/40 px-4 mb-2"
        >
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex items-center w-full">
              <div className="shrink-0 mr-4">
                <p className="font-semibold text-base text-foreground">
                  Day {day}
                </p>
                <p className="text-sm text-muted-foreground font-normal">
                  {videos} videos
                </p>
              </div>
              <div className="grow mx-4">
                <Progress
                  value={calculateProgress()}
                  className="w-full md:w-96 h-1.5 bg-muted/50"
                />
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4">
            {videosForDay.map((video) => (
              <VideoCard
                key={video.index}
                video={video}
                checkboxStatus={checkboxStatus}
                setCheckboxStatus={setCheckboxStatus}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
