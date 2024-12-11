// components/adventures/BookingCalendar.tsx
"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Clock, Users } from "lucide-react";
import { getAvailability } from "@/utils/availability";
import type { TimeSlot } from "@/utils/availability";

interface BookingCalendarProps {
  adventureId: string;
  onSelectTimeSlot: (date: Date, timeSlot: TimeSlot) => void;
}

interface AvailabilityMap {
  [date: string]: TimeSlot[];
}

export function BookingCalendar({ adventureId, onSelectTimeSlot }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availability, setAvailability] = useState<AvailabilityMap>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [highlightedDates, setHighlightedDates] = useState<Date[]>([]);

  useEffect(() => {
    // Load initial month's availability
    loadMonthAvailability(new Date());
  }, []);

  useEffect(() => {
    if (selectedDate) {
      loadAvailability(selectedDate);
    }
  }, [selectedDate]);

  const loadMonthAvailability = async (date: Date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    try {
      const availabilityData = await getAvailability(adventureId, startOfMonth, endOfMonth);
      const newAvailability: AvailabilityMap = {};
      const availableDates: Date[] = [];
      
      availabilityData.forEach(({ date, timeSlots }) => {
        if (timeSlots.length > 0) {
          newAvailability[date] = timeSlots;
          availableDates.push(new Date(date));
        }
      });

      setAvailability(prev => ({ ...prev, ...newAvailability }));
      setHighlightedDates(availableDates);
    } catch (error) {
      console.error("Error loading month availability:", error);
    }
  };

  const loadAvailability = async (date: Date) => {
    setIsLoading(true);
    setError(null);

    try {
      const availabilityData = await getAvailability(adventureId, date, date);
      const newAvailability: AvailabilityMap = {};
      
      availabilityData.forEach(({ date, timeSlots }) => {
        newAvailability[date] = timeSlots;
      });

      setAvailability(prev => ({ ...prev, ...newAvailability }));
    } catch (error) {
      setError("Failed to load availability");
      console.error("Error loading availability:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAvailableTimeSlotsForDate = (date: Date): TimeSlot[] => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return availability[dateStr] || [];
  };

  const handleMonthChange = (date: Date) => {
    loadMonthAvailability(date);
  };

  return (
    <div className="space-y-6">
      <style jsx global>{`
        .react-datepicker {
          font-family: inherit;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
        }
        .react-datepicker__day--highlighted {
          background-color: #0E9871;
          color: white;
        }
        .react-datepicker__day--highlighted:hover {
          background-color: #0b7a5c;
        }
      `}</style>

      <DatePicker
        selected={selectedDate}
        onChange={setSelectedDate}
        inline
        minDate={new Date()}
        highlightDates={highlightedDates}
        onMonthChange={handleMonthChange}
        calendarClassName="!font-sans"
      />

      {selectedDate && (
        <Card className="p-4">
          <h3 className="font-medium mb-4">
            Available Times for {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          
          {isLoading ? (
            <div className="text-center py-4">Loading available times...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-4">{error}</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {getAvailableTimeSlotsForDate(selectedDate).map((timeSlot) => (
                <Button
                  key={timeSlot.startTime}
                  variant="outline"
                  className="flex flex-col items-center p-4 h-auto hover:border-primary"
                  onClick={() => onSelectTimeSlot(selectedDate, timeSlot)}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{format(new Date(`2000-01-01T${timeSlot.startTime}`), 'h:mm a')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Users className="w-4 h-4" />
                    <span>{timeSlot.availableSpots} spots left</span>
                  </div>
                  <Badge className="mt-2" variant="secondary">
                    ${timeSlot.price}
                  </Badge>
                </Button>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}