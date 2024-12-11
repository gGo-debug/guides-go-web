'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { BookingDetails, BookingStep, TimeSlot, Participant } from '@/types/booking';
import { getAvailability, checkSlotAvailability } from '@/utils/availability';

interface BookingContextType {
  currentStep: BookingStep;
  selectedDate: Date | null;
  selectedTimeSlot: TimeSlot | null;
  participants: Participant[];
  contactEmail: string;
  contactPhone: string;
  specialRequirements: string;
  isLoading: boolean;
  error: string | null;
  setStep: (step: BookingStep) => void;
  setDate: (date: Date | null) => void;
  setTimeSlot: (slot: TimeSlot | null) => void;
  addParticipant: () => void;
  removeParticipant: (index: number) => void;
  updateParticipant: (index: number, field: keyof Participant, value: string) => void;
  setContactInfo: (email: string, phone: string) => void;
  setSpecialRequirements: (requirements: string) => void;
  loadAvailability: (date: Date, adventureId: string) => Promise<void>;
  submitBooking: (adventureId: string, basePrice: number) => Promise<string>;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState<BookingStep>('date');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([{ name: '' }]);
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAvailability = async (date: Date, adventureId: string) => {
    setIsLoading(true);
    try {
      const slots = await getAvailability(adventureId, date, date);
      return slots[0]?.timeSlots || [];
    } catch (error) {
      setError('Failed to load availability. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const submitBooking = async (adventureId: string, basePrice: number) => {
    if (!selectedDate || !selectedTimeSlot) {
      throw new Error('Invalid booking details');
    }

    setIsLoading(true);
    setError(null);

    try {
      const isAvailable = await checkSlotAvailability(
        adventureId,
        selectedDate,
        selectedTimeSlot.startTime,
        participants.length
      );

      if (!isAvailable) {
        throw new Error('Selected slot is no longer available');
      }

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adventureId,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          participants,
          contactEmail,
          contactPhone,
          specialRequirements,
          totalPrice: selectedTimeSlot.price * participants.length || basePrice * participants.length
        }),
      });

      if (!response.ok) throw new Error('Failed to create booking');

      const data = await response.json();
      resetBooking();
      return data.id;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create booking');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetBooking = () => {
    setCurrentStep('date');
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setParticipants([{ name: '' }]);
    setContactEmail('');
    setContactPhone('');
    setSpecialRequirements('');
    setError(null);
  };

  const value = {
    currentStep,
    selectedDate,
    selectedTimeSlot,
    participants,
    contactEmail,
    contactPhone,
    specialRequirements,
    isLoading,
    error,
    setStep: setCurrentStep,
    setDate: setSelectedDate,
    setTimeSlot: setSelectedTimeSlot,
    addParticipant: () => setParticipants(prev => [...prev, { name: '' }]),
    removeParticipant: (index: number) => {
      setParticipants(prev => prev.filter((_, i) => i !== index));
    },
    updateParticipant: (index: number, field: keyof Participant, value: string) => {
      setParticipants(prev => prev.map((p, i) => 
        i === index ? { ...p, [field]: field === 'age' ? Number(value) : value } : p
      ));
    },
    setContactInfo: (email: string, phone: string) => {
      setContactEmail(email);
      setContactPhone(phone);
    },
    setSpecialRequirements,
    loadAvailability,
    submitBooking,
    resetBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}