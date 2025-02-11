"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // Adjust if needed
import { Button } from "@/components/ui/button";
import { ClockIcon } from "lucide-react";

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

// Generate time options in 30-minute intervals from 06:00 to 21:30
const generateTimeOptions = (
  startHour = 6,
  endHour = 22,
  intervalMinutes = 30
): string[] => {
  const times: string[] = [];
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      const hh = hour.toString().padStart(2, "0");
      const mm = minute.toString().padStart(2, "0");
      times.push(`${hh}:${mm}`);
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setOpen(!open)}
        >
          <span>{value || "Select Time"}</span>
          <ClockIcon className="w-5 h-5 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <div className="max-h-60 overflow-auto">
          {timeOptions.map((time) => (
            <Button
              key={time}
              variant="ghost"
              className="w-full text-left"
              onClick={() => {
                if (typeof onChange === "function") {
                  onChange(time);
                } else {
                  console.warn("TimePicker: onChange prop is not a function");
                }
                setOpen(false);
              }}
            >
              {time}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TimePicker;
