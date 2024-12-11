"use client";

import * as React from "react";
import DatePicker from "react-datepicker";
import { cn } from "@/lib/utils";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CalendarProps {
  className?: string;
  mode?: "single";
  selected?: Date | null;
  onSelect?: (date: Date | null) => void;
  disabled?: (date: Date) => boolean;
  initialDate?: Date;
  numberOfMonths?: number;
  showOutsideDays?: boolean;
}

export function Calendar({
  className,
  selected,
  onSelect,
  disabled,
  initialDate,
  numberOfMonths = 1,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const handleChange = (date: Date | null) => {
    if (onSelect) {
      onSelect(date);
    }
  };

  const handleDisabled = (date: Date): boolean => {
    if (disabled) {
      return disabled(date);
    }
    return false;
  };

  return (
    <>
      <style jsx global>{`
        .react-datepicker {
          font-family: inherit;
          background-color: hsl(var(--background));
          border: 1px solid hsl(var(--border));
          border-radius: calc(var(--radius) - 2px);
          padding: 12px;
          font-size: 0.875rem;
          width: 100%;
        }

        .react-datepicker__month-container {
          float: none;
          width: 100%;
        }

        .react-datepicker__month {
          margin: 0;
        }

        .react-datepicker__header {
          background-color: transparent;
          border-bottom: none;
          padding: 0;
        }

        .react-datepicker__navigation {
          top: 12px;
        }

        .react-datepicker__navigation--previous {
          left: 12px;
        }

        .react-datepicker__navigation--next {
          right: 12px;
        }

        .react-datepicker__navigation-icon::before {
          border-color: hsl(var(--foreground));
          border-width: 1px;
        }

        .react-datepicker__current-month {
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .react-datepicker__day-names {
          margin-top: 8px;
          display: flex;
          justify-content: space-between;
          padding: 0 0.5rem;
        }

        .react-datepicker__day-name {
          color: hsl(var(--muted-foreground));
          margin: 0;
          width: 2.25rem;
          font-size: 0.75rem;
        }

        .react-datepicker__month {
          margin: 0;
        }

        .react-datepicker__week {
          display: flex;
          justify-content: space-between;
          padding: 0 0.5rem;
        }

        .react-datepicker__day {
          margin: 0;
          width: 2.25rem;
          height: 2.25rem;
          line-height: 2.25rem;
          color: hsl(var(--foreground));
          border-radius: calc(var(--radius) - 2px);
          transition: all 150ms;
        }

        .react-datepicker__day:hover {
          background-color: hsl(var(--accent));
          color: hsl(var(--accent-foreground));
        }

        .react-datepicker__day--selected {
          background-color: hsl(var(--primary)) !important;
          color: hsl(var(--primary-foreground)) !important;
        }

        .react-datepicker__day--keyboard-selected {
          background-color: hsl(var(--accent));
          color: hsl(var(--accent-foreground));
        }

        .react-datepicker__day--today {
          background-color: hsl(var(--accent));
          color: hsl(var(--accent-foreground));
          font-weight: normal;
        }

        .react-datepicker__day--disabled {
          color: hsl(var(--muted-foreground));
          opacity: 0.5;
          cursor: not-allowed;
        }

        .react-datepicker__day--outside-month {
          color: hsl(var(--muted-foreground));
          opacity: 0.5;
        }
      `}</style>
      <div className="w-full">
        <DatePicker
          selected={selected}
          onChange={handleChange}
          filterDate={handleDisabled}
          monthsShown={numberOfMonths}
          inline
          showPopperArrow={false}
          openToDate={initialDate}
          dateFormat="PP"
          fixedHeight
          renderCustomHeader={({
            monthDate,
            customHeaderCount,
            decreaseMonth,
            increaseMonth,
          }) => (
            <div className="flex items-center justify-between px-2 py-1">
              <button
                onClick={decreaseMonth}
                className="p-1 rounded-md hover:bg-accent"
                type="button"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="text-sm font-medium">
                {monthDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </div>
              <button
                onClick={increaseMonth}
                className="p-1 rounded-md hover:bg-accent"
                type="button"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
          calendarClassName={cn("!font-sans", className)}
          {...props}
        />
      </div>
    </>
  );
}

Calendar.displayName = "Calendar";