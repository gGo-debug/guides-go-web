"use client";

import * as React from "react";
import { DayPicker, DayPickerProps } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Re-exporting the DayPicker types that consumers might need
export type DayPickerType = DayPickerProps;

// Type for our Calendar component's props, extending DayPicker's props
export interface CalendarProps extends Omit<DayPickerProps, 'components' | 'classNames'> {
  className?: string;
  selected?: Date | Date[] | undefined;
  onSelect?: (date: Date | undefined) => void;
  initialFocus?: boolean;
}

// Type for the navigation button props
interface NavigationButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

// Reusable navigation button component
const NavigationButton: React.FC<NavigationButtonProps> = ({
  onClick,
  children,
  className,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
      "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 disabled:pointer-events-none",
      className
    )}
  >
    {children}
  </button>
);

export function Calendar({
  className,
  selected,
  onSelect,
  initialFocus = false,
  ...props
}: CalendarProps) {
  // Generic object for mapping custom class names to DayPicker elements
  const customClassNames: DayPickerProps["classNames"] = {
    // Layout and container classes
    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
    month: "space-y-4",
    caption: "flex justify-center pt-1 relative items-center",
    caption_label: "text-sm font-medium",
    caption_dropdowns: "flex justify-center gap-1",
    vhidden: "hidden",

    // Navigation classes
    nav: "space-x-1 flex items-center",
    nav_button_previous: "absolute left-1",
    nav_button_next: "absolute right-1",
    nav_button: cn(
      "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
    ),

    // Table classes
    table: "w-full border-collapse space-y-1",
    head_row: "flex",
    head_cell: cn(
      "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]"
    ),
    row: "flex w-full mt-2",
    cell: cn(
      "h-9 w-9 text-center text-sm relative p-0 focus-within:relative focus-within:z-20",
      // Complex selectors for range selection states
      "[&:has([aria-selected].day-range-end)]:rounded-r-md",
      "[&:has([aria-selected].day-outside)]:bg-accent/50",
      "[&:has([aria-selected])]:bg-accent",
      "first:[&:has([aria-selected])]:rounded-l-md",
      "last:[&:has([aria-selected])]:rounded-r-md"
    ),

    // Day styling classes
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
      showOutsideDays={true}
      className={cn("p-3", className)}
      classNames={customClassNames}
      components={{
        // Custom components for navigation
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="h-4 w-4 text-muted-foreground" {...props} />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="h-4 w-4 text-muted-foreground" {...props} />
        ),
      }}
      selected={selected}
      onSelect={onSelect}
      initialFocus={initialFocus}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";