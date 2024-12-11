'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import Calendar from '@/components/ui/calendar-new'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { getAvailability, checkSlotAvailability } from '@/utils/availability';
import { Loader2, Clock, Users, AlertCircle } from 'lucide-react';

interface TimeSlot {
  startTime: string;
  endTime: string;
  availableSpots: number;
  price: number;
}

interface Participant {
  name: string;
  age?: number;
  requirements?: string;
}

interface BookingState {
  date?: Date;
  timeSlot?: TimeSlot;
  participants: Participant[];
  contactEmail: string;
  contactPhone: string;
  specialRequirements?: string;
}

export function BookingFlow({
  adventureId,
  basePrice,
  maxGroupSize
}: {
  adventureId: string;
  basePrice: number;
  maxGroupSize: number;
}) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [booking, setBooking] = useState<BookingState>({
    participants: [{ name: '' }],
    contactEmail: '',
    contactPhone: '',
  });

  const [availability, setAvailability] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    if (booking.date) {
      loadAvailability(booking.date);
    }
  }, [booking.date]);

  const loadAvailability = async (date: Date) => {
    setIsLoading(true);
    try {
      const slots = await getAvailability(adventureId, date, date);
      setAvailability(slots[0]?.timeSlots || []);
      setError(null);
    } catch (error) {
      setError('Failed to load availability. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateSelect = async (date: Date | undefined) => {
    if (date) {
      setBooking(prev => ({ ...prev, date, timeSlot: undefined }));
    }
  };

  const handleTimeSelect = (timeSlot: TimeSlot) => {
    setBooking(prev => ({ ...prev, timeSlot }));
  };

  const addParticipant = () => {
    if (booking.participants.length < maxGroupSize) {
      setBooking(prev => ({
        ...prev,
        participants: [...prev.participants, { name: '' }]
      }));
    }
  };

  const removeParticipant = (index: number) => {
    if (booking.participants.length > 1) {
      setBooking(prev => ({
        ...prev,
        participants: prev.participants.filter((_, i) => i !== index)
      }));
    }
  };

  const updateParticipant = (index: number, field: keyof Participant, value: string) => {
    setBooking(prev => ({
      ...prev,
      participants: prev.participants.map((p, i) =>
        i === index ? { ...p, [field]: field === 'age' ? Number(value) : value } : p
      )
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return Boolean(booking.date && booking.timeSlot);
      case 2:
        return booking.participants.every(p => p.name.trim()) &&
          booking.participants.length > 0;
      case 3:
        return Boolean(
          booking.contactEmail &&
          booking.contactPhone &&
          booking.contactEmail.includes('@')
        );
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Final availability check
      if (!booking.date || !booking.timeSlot) throw new Error('Invalid booking details');

      const isAvailable = await checkSlotAvailability(
        adventureId,
        booking.date,
        booking.timeSlot.startTime,
        booking.participants.length
      );

      if (!isAvailable) throw new Error('Selected slot is no longer available');

      // Create booking
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adventureId,
          date: format(booking.date, 'yyyy-MM-dd'),
          startTime: booking.timeSlot.startTime,
          endTime: booking.timeSlot.endTime,
          participants: booking.participants,
          contactEmail: booking.contactEmail,
          contactPhone: booking.contactPhone,
          specialRequirements: booking.specialRequirements,
          totalPrice: booking.timeSlot.price * booking.participants.length
        }),
      });

      if (!response.ok) throw new Error('Failed to create booking');

      const data = await response.json();
      router.push(`/bookings/${data.id}/confirmation`);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create booking');
      setShowConfirmDialog(false);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Select Date & Time</h2>
            <Calendar
              selected={booking.date}
              onSelect={handleDateSelect}
              minDate={new Date()}
              placeholderText="Select date"
              showTimeSelect={false}
              inline={true}
              onMonthChange={(date) => {
                // Load availability for the new month
                const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
                const lastOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                loadAvailability(firstOfMonth);
              }}
            />

            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : availability.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {availability.map((slot) => (
                  <Button
                    key={slot.startTime}
                    variant={booking.timeSlot?.startTime === slot.startTime ? "default" : "outline"}
                    onClick={() => handleTimeSelect(slot)}
                    className="p-4 h-auto"
                  >
                    <div className="text-left space-y-1">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{format(new Date(`2000-01-01T${slot.startTime}`), 'h:mm a')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{slot.availableSpots} spots left</span>
                      </div>
                      <div className="font-semibold">${slot.price}</div>
                    </div>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No available time slots for selected date
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Participant Information</h2>

            <div className="space-y-4">
              {booking.participants.map((participant, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Participant {index + 1}</h3>
                        {booking.participants.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeParticipant(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`name-${index}`}>Full Name</Label>
                        <Input
                          id={`name-${index}`}
                          value={participant.name}
                          onChange={(e) => updateParticipant(index, 'name', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`age-${index}`}>Age (optional)</Label>
                        <Input
                          id={`age-${index}`}
                          type="number"
                          value={participant.age || ''}
                          onChange={(e) => updateParticipant(index, 'age', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`requirements-${index}`}>Special Requirements</Label>
                        <Input
                          id={`requirements-${index}`}
                          value={participant.requirements || ''}
                          onChange={(e) => updateParticipant(index, 'requirements', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {booking.participants.length < maxGroupSize && (
              <Button onClick={addParticipant} className="w-full">
                Add Participant
              </Button>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Contact Information</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={booking.contactEmail}
                  onChange={(e) => setBooking(prev => ({ ...prev, contactEmail: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={booking.contactPhone}
                  onChange={(e) => setBooking(prev => ({ ...prev, contactPhone: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Special Requirements</Label>
                <Textarea
                  id="requirements"
                  value={booking.specialRequirements || ''}
                  onChange={(e) => setBooking(prev => ({ ...prev, specialRequirements: e.target.value }))}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {renderStep()}

      <div className="flex justify-between pt-6">
        {currentStep > 1 && (
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={isLoading}
          >
            Previous
          </Button>
        )}

        {currentStep < 3 ? (
          <Button
            onClick={() => setCurrentStep(prev => prev + 1)}
            disabled={!validateStep(currentStep) || isLoading}
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={() => setShowConfirmDialog(true)}
            disabled={!validateStep(currentStep) || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Complete Booking'
            )}
          </Button>
        )}
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Booking</AlertDialogTitle>
            <AlertDialogDescription>
              {booking.date && booking.timeSlot && (
                <div className="space-y-2">
                  <p>Date: {format(booking.date, 'MMMM d, yyyy')}</p>
                  <p>Time: {format(new Date(`2000-01-01T${booking.timeSlot.startTime}`), 'h:mm a')}</p>
                  <p>Participants: {booking.participants.length}</p>
                  <p>Total Price: ${booking.timeSlot.price * booking.participants.length}</p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit} disabled={isLoading}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}