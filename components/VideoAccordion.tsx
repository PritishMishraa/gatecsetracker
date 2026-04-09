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
          className="bg-card border-border/40 mb-2 rounded-2xl border px-4"
        >
          <AccordionTrigger className="py-4 hover:no-underline">
            <div className="flex w-full items-center">
              <div className="mr-4 shrink-0">
                <p className="text-foreground text-base font-semibold">
                  Day {day}
                </p>
                <p className="text-muted-foreground text-sm font-normal">
                  {videos} videos
                </p>
              </div>
              <div className="mx-4 grow">
                <Progress
                  value={calculateProgress()}
                  className="bg-muted/50 h-1.5 w-full md:w-96"
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
