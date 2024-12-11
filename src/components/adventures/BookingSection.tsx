// BookingSection.tsx
"use client";

import { useState } from "react";
import Calendar from "@/components/ui/calendar-new"; // Update import
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Clock, Users, AlertCircle } from "lucide-react";
import { getAvailability } from "@/utils/availability";
import { useAuth } from "@/contexts/AuthContext";
import type { TimeSlot } from "@/utils/availability";

interface BookingSectionProps {
  adventureId: string;
  basePrice: number;
  maxGroupSize: number;
}

type BookingStep = 'date' | 'details' | 'confirmation';

export function BookingSection({
  adventureId,
  basePrice,
  maxGroupSize
}: BookingSectionProps) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<BookingStep>('date');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDateSelect = async (date: Date | null) => {
    if (!date) return;
    
    setIsLoading(true);
    setError(null);
    setSelectedDate(date);
    setSelectedTimeSlot(null);

    try {
      const availabilityData = await getAvailability(adventureId, date, date);
      const slots = availabilityData[0]?.timeSlots || [];
      setTimeSlots(slots);
    } catch (err) {
      setError('Failed to load available times');
      console.error('Error loading availability:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeSelect = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const proceedToBooking = () => {
    if (!user) {
      // Handle authentication flow
      return;
    }
    setCurrentStep('details');
  };

  const renderDateSelection = () => (
    <div className="space-y-6">
      <Calendar
        selected={selectedDate}
        onSelect={handleDateSelect}
        minDate={new Date()}
        placeholderText="Select booking date"
        inline={true}
        showTimeSelect={false}
        onMonthChange={(date) => {
          // Load availability for the new month
          const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
          const lastOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
          // Optional: Load availability for the entire month
          handleDateSelect(date);
        }}
        className="w-full"
      />

      {isLoading ? (
        <div className="text-center py-4 text-muted-foreground">
          Loading available times...
        </div>
      ) : error ? (
        <div className="text-center py-4 text-destructive flex items-center justify-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      ) : selectedDate && timeSlots.length > 0 ? (
        <div className="space-y-4">
          <h3 className="font-medium text-lg">
            Available Times for {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((slot) => (
              <Button
                key={slot.startTime}
                variant={selectedTimeSlot?.startTime === slot.startTime ? "default" : "outline"}
                className="flex flex-col items-center p-4 h-auto gap-2"
                onClick={() => handleTimeSelect(slot)}
              >
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {format(new Date(`2000-01-01T${slot.startTime}`), 'h:mm a')}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {slot.availableSpots} spots
                </div>
                <Badge variant="secondary">
                  ${slot.price || basePrice}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      ) : selectedDate ? (
        <div className="text-center py-4 text-muted-foreground">
          No available times for selected date
        </div>
      ) : null}

      {selectedTimeSlot && (
        <div className="pt-4 border-t">
          <Button 
            className="w-full" 
            onClick={proceedToBooking}
          >
            Continue Booking
          </Button>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Free cancellation up to 24 hours before
          </p>
        </div>
      )}
    </div>
  );

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              ${basePrice}
            </div>
            <div className="text-sm text-muted-foreground">
              per person
            </div>
          </div>

          {renderDateSelection()}
        </div>
      </CardContent>
    </Card>
  );
}