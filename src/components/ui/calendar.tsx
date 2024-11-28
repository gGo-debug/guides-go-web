"use client";

import * as React from "react";
import { DayPicker, DayPickerProps, SelectSingleEventHandler } from "react-day-picker";
import { cn } from "@/lib/utils";

export interface CalendarProps {
  className?: string;
  mode?: "single";
  selected?: Date | undefined;
  onSelect?: SelectSingleEventHandler;
  disabled?: DayPickerProps["disabled"];
  defaultMonth?: Date;
  numberOfMonths?: number;
}

export function Calendar({
  className,
  mode = "single",
  selected,
  onSelect,
  ...props
}: CalendarProps) {
  const customClassNames: DayPickerProps["classNames"] = {
    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
    month: "space-y-4",
    caption: "flex justify-center pt-1 relative items-center",
    caption_label: "text-sm font-medium",
    caption_dropdowns: "flex justify-center gap-1",
    vhidden: "hidden",
    nav: "space-x-1 flex items-center",
    nav_button_previous: "absolute left-1",
    nav_button_next: "absolute right-1",
    nav_button: cn(
      "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
    ),
    table: "w-full border-collapse space-y-1",
    head_row: "flex",
    head_cell: cn(
      "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]"
    ),
    row: "flex w-full mt-2",
    cell: cn(
      "h-9 w-9 text-center text-sm relative p-0 focus-within:relative focus-within:z-20",
      "[&:has([aria-selected].day-range-end)]:rounded-r-md",
      "[&:has([aria-selected].day-outside)]:bg-accent/50",
      "[&:has([aria-selected])]:bg-accent",
      "first:[&:has([aria-selected])]:rounded-l-md",
      "last:[&:has([aria-selected])]:rounded-r-md"
    ),
    day: cn(
      "h-9 w-9 p-0 font-normal",
      "aria-selected:opacity-100",
      "rounded-md",
      "transition-colors",
      "hover:bg-accent hover:text-accent-foreground",
      "focus:bg-accent focus:text-accent-foreground focus:outline-none",
      "disabled:pointer-events-none disabled:opacity-50"
    ),
    day_today: "bg-accent text-accent-foreground",
    day_outside: cn(
      "day-outside text-muted-foreground opacity-50",
      "aria-selected:bg-accent/50 aria-selected:opacity-30"
    ),
    day_disabled: "text-muted-foreground opacity-50",
    day_range_middle: cn(
      "aria-selected:bg-accent aria-selected:text-accent-foreground"
    ),
    day_selected: cn(
      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
      "focus:bg-primary focus:text-primary-foreground"
    ),
    day_range_end: "day-range-end",
    day_hidden: "invisible",
  };

  return (
    <DayPicker
      mode="single"
      showOutsideDays={true}
      className={cn("p-3", className)}
      classNames={customClassNames}
      selected={selected}
      onSelect={onSelect}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";