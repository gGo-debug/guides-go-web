'use client';

import { useBooking } from '@/contexts/BookingContext';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Calendar, Clock, Users, Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from "@/components/ui/badge";

interface BookingSummaryProps {
  onSubmit: () => Promise<void>;
}

export function BookingSummary({ onSubmit }: BookingSummaryProps) {
  const {
    selectedDate,
    selectedTimeSlot,
    participants,
    contactEmail,
    contactPhone,
    specialRequirements,
    isLoading,
    error
  } = useBooking();

  if (!selectedDate || !selectedTimeSlot) return null;

  const totalPrice = selectedTimeSlot.price * participants.length;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Booking Summary</h2>

      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Date and Time */}
          <div className="space-y-2">
            <h3 className="font-medium">Schedule</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{format(selectedDate, 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>
                  {format(new Date(`2000-01-01T${selectedTimeSlot.startTime}`), 'h:mm a')}
                </span>
              </div>
            </div>
          </div>

          {/* Participants */}
          <div className="space-y-2">
            <h3 className="font-medium">Participants</h3>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>{participants.length} participants</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {participants.map((p, i) => (
                <div key={i} className="text-sm">
                  {p.name} {p.age && `(${p.age})`}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <h3 className="font-medium">Contact Information</h3>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{contactEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{contactPhone}</span>
              </div>
            </div>
          </div>

          {specialRequirements && (
            <div className="space-y-2">
              <h3 className="font-medium">Special Requirements</h3>
              <p className="text-sm text-muted-foreground">{specialRequirements}</p>
            </div>
          )}

          {/* Price Summary */}
          <div className="border-t pt-4 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Total Price</div>
                <div className="text-sm text-muted-foreground">
                  ${selectedTimeSlot.price} × {participants.length} participants
                </div>
              </div>
              <div className="text-2xl font-bold">${totalPrice}</div>
            </div>
          </div>

          <Button 
            className="w-full mt-6" 
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Confirm Booking'}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Free cancellation up to 24 hours before the adventure
          </p>
        </CardContent>
      </Card>
    </div>
  );
}