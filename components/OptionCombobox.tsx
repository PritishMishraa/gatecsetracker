"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "./ui/scroll-area";

export function StudyTimeHourCombobox({
  studyTimeOption,
  handleStudyTimeOption,
}: {
  studyTimeOption: { hours: number; minutes: number };
  handleStudyTimeOption: (hours: number, minutes: number) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {studyTimeOption.hours} Hours
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Time..." />
          <CommandEmpty>No time found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-36 w-48">
              {Array.from({ length: 16 }, (_, index) => {
                const option = index + 1;
                return (
                  <CommandItem
                    key={option}
                    onSelect={() => {
                      handleStudyTimeOption(option, studyTimeOption.minutes);
                      // setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        studyTimeOption.hours === option
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option} Hours
                  </CommandItem>
                );
              })}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function StudyTimeMinuteCombobox({
  studyTimeOption,
  handleStudyTimeOption,
}: {
  studyTimeOption: { hours: number; minutes: number };
  handleStudyTimeOption: (hours: number, minutes: number) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {studyTimeOption.minutes} Minutes
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Time..." />
          <CommandEmpty>No time found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-36 w-48">
              {Array.from({ length: 60 }, (_, index) => {
                const option = index;
                return (
                  <CommandItem
                    key={option}
                    onSelect={() => {
                      handleStudyTimeOption(studyTimeOption.hours, option);
                      // setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        studyTimeOption.minutes === option
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option} Minutes
                  </CommandItem>
                );
              })}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function StudyDaysCombobox({
  studyDaysOption,
  handleStudyDaysOption,
}: {
  studyDaysOption: number;
  handleStudyDaysOption: (value: number) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {studyDaysOption} / page
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Days..." />
          <CommandEmpty>No days found.</CommandEmpty>
          <CommandGroup>
            {[3, 5, 7].map((option) => (
              <CommandItem
                key={option}
                onSelect={() => {
                  handleStudyDaysOption(option);
                  // setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    studyDaysOption === option ? "opacity-100" : "opacity-0"
                  )}
                />
                {option} / page
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
