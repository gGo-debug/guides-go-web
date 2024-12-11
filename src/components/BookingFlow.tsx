'use client';

import { useBooking } from '@/contexts/BookingContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import Calendar from "@/components/ui/calendar-new";
import { format } from 'date-fns';
import { Loader2, Clock, Users, AlertCircle } from 'lucide-react';
import { TimeSlot } from '@/types/booking';
import { ParticipantForm } from './ParticipantForm';
import { ContactForm } from './ContactForm';
import { BookingSummary } from './BookingSummary';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface BookingFlowProps {
  adventureId: string;
  basePrice: number;
  maxGroupSize: number;
}

export function BookingFlow({ adventureId, basePrice, maxGroupSize }: BookingFlowProps) {
  const router = useRouter();
  const { user } = useAuth();
  const {
    currentStep,
    selectedDate,
    selectedTimeSlot,
    participants,
    isLoading,
    error,
    setStep,
    setDate,
    setTimeSlot,
    loadAvailability,
    submitBooking,
  } = useBooking();

  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  // Handle date selection
  const handleDateSelect = async (date: Date | null) => {
    if (!date) return;
    setDate(date);
    try {
      const slots = await loadAvailability(date, adventureId);
      setTimeSlots(slots);
    } catch (error) {
      console.error('Failed to load time slots:', error);
    }
  };

  // Handle proceed to next step
  const handleProceed = () => {
    if (!user && currentStep === 'date') {
      setShowAuthDialog(true);
      return;
    }
    const nextStep = getNextStep(currentStep);
    setStep(nextStep);
  };

  // Handle final submission
  const handleSubmit = async () => {
    try {
      const bookingId = await submitBooking(adventureId, basePrice);
      router.push(`/bookings/${bookingId}/confirmation`);
    } catch (error) {
      console.error('Booking submission failed:', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'date':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Select Date & Time</h2>
            <Calendar
              selected={selectedDate}
              onSelect={handleDateSelect}
              minDate={new Date()}
              placeholderText="Select booking date"
              inline={true}
              showTimeSelect={false}
              className="w-full"
            />

            {timeSlots.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.startTime}
                    variant={selectedTimeSlot?.startTime === slot.startTime ? "default" : "outline"}
                    onClick={() => setTimeSlot(slot)}
                    className="p-4 h-auto"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{format(new Date(`2000-01-01T${slot.startTime}`), 'h:mm a')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{slot.availableSpots} spots</span>
                      </div>
                      <span className="font-semibold">${slot.price || basePrice}</span>
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </div>
        );

      case 'participants':
        return <ParticipantForm maxGroupSize={maxGroupSize} />;

      case 'contact':
        return <ContactForm />;

      case 'confirmation':
        return <BookingSummary onSubmit={handleSubmit} />;
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
        {currentStep !== 'date' && (
          <Button
            variant="outline"
            onClick={() => setStep(getPreviousStep(currentStep))}
            disabled={isLoading}
          >
            Back
          </Button>
        )}

        <Button
          onClick={currentStep === 'confirmation' ? handleSubmit : handleProceed}
          disabled={!isValidStep(currentStep) || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : currentStep === 'confirmation' ? (
            'Complete Booking'
          ) : (
            'Continue'
          )}
        </Button>
      </div>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in to Continue</DialogTitle>
            <DialogDescription>
              Please sign in or create an account to proceed with your booking.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Link href="/auth/login" className="w-full">
              <Button className="w-full">Sign In</Button>
            </Link>
            <Link href="/auth/register" className="w-full">
              <Button variant="outline" className="w-full">Create Account</Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function getNextStep(currentStep: BookingStep): BookingStep {
  const steps: BookingStep[] = ['date', 'participants', 'contact', 'confirmation'];
  const currentIndex = steps.indexOf(currentStep);
  return steps[currentIndex + 1];
}

function getPreviousStep(currentStep: BookingStep): BookingStep {
  const steps: BookingStep[] = ['date', 'participants', 'contact', 'confirmation'];
  const currentIndex = steps.indexOf(currentStep);
  return steps[currentIndex - 1];
}

function isValidStep(currentStep: BookingStep): boolean {
  // Add validation logic here
  return true;
}