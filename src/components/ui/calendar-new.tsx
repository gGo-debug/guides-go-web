import React from "react";
import DatePicker from "react-datepicker";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

interface CalendarProps {
  className?: string;
  selected?: Date | null;
  onSelect?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  highlightDates?: Date[];
  placeholderText?: string;
  showTimeSelect?: boolean;
  inline?: boolean;
  onMonthChange?: (date: Date) => void;
  highlightedDates?: Date[];
}

export default function Calendar({
  className,
  selected,
  onSelect,
  minDate,
  maxDate,
  highlightDates,
  placeholderText,
  showTimeSelect = false,
  inline = true,
  onMonthChange,
  ...props
}: CalendarProps) {
  return (
    <>
      <style jsx global>{`
  .react-datepicker {
    font-family: inherit;
    background-color: hsl(var(--background));
    border: 1px solid hsl(var(--border));
    border-radius: calc(var(--radius) - 2px);
    padding: 1rem;
    font-size: 0.875rem;
    width: 100%;
  }

  .react-datepicker__month-container {
    float: none;
    width: 100%;
  }

  .react-datepicker__header {
    background-color: transparent;
    border-bottom: none;
    padding: 0;
  }

  .react-datepicker__day-names {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin: 1rem 0 0.5rem;
  }

  .react-datepicker__day-name {
    color: hsl(var(--muted-foreground));
    font-size: 0.75rem;
    font-weight: 500;
    width: auto;
    margin: 0;
    text-align: center;
    padding: 0.25rem 0;
  }

  .react-datepicker__month {
    margin: 0;
  }

  .react-datepicker__week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .react-datepicker__day {
    margin: 0;
    width: auto;
    padding: 0.5rem;
    font-size: 0.875rem;
    line-height: 1;
    color: hsl(var(--foreground));
    text-align: center;
    border-radius: calc(var(--radius) - 4px);
    transition: all 150ms;
  }

  .react-datepicker__day:hover:not(.react-datepicker__day--disabled) {
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }

  .react-datepicker__day--selected {
    background-color: hsl(var(--primary)) !important;
    color: hsl(var(--primary-foreground)) !important;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: transparent;
    color: inherit;
  }

  .react-datepicker__day--today {
    background-color: transparent;
    color: hsl(var(--primary));
    font-weight: 600;
  }

  .react-datepicker__day--disabled {
    color: hsl(var(--muted-foreground));
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Custom header styling */
  .react-datepicker__current-month {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  /* Navigation buttons */
  .react-datepicker__navigation {
    top: 1rem;
  }

  .react-datepicker__navigation--previous {
    left: 1rem;
  }

  .react-datepicker__navigation--next {
    right: 1rem;
  }
`}</style>

      <DatePicker
        selected={selected}
        onChange={date => onSelect?.(date)}
        minDate={minDate}
        maxDate={maxDate}
        highlightDates={highlightDates}
        dayClassName={date => {
          // Add any custom day styling logic here
          return 'rounded-md transition-colors';
        }}
        placeholderText={placeholderText}
        showTimeSelect={showTimeSelect}
        inline={inline}
        onMonthChange={onMonthChange}
        // calendarClassName={cn("!font-sans", className)}
        calendarClassName={cn(
          "!font-sans border rounded-lg shadow-sm bg-background",
          className
        )}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex items-center justify-between px-2 py-1">
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className="p-1 rounded-md hover:bg-accent disabled:opacity-50"
              type="button"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="text-sm font-medium">
              {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </div>
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className="p-1 rounded-md hover:bg-accent disabled:opacity-50"
              type="button"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
        {...props}
      />
    </>
  );
}