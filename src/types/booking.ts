export interface TimeSlot {
    startTime: string;
    endTime: string;
    availableSpots: number;
    price: number;
  }
  
  export interface Participant {
    name: string;
    age?: number;
    requirements?: string;
  }
  
  export interface BookingDetails {
    adventureId: string;
    date: Date;
    timeSlot: TimeSlot;
    participants: Participant[];
    contactEmail: string;
    contactPhone: string;
    specialRequirements?: string;
    totalPrice: number;
  }
  
  export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
  export type PaymentStatus = 'pending' | 'paid' | 'refunded';
  
  export interface Booking extends BookingDetails {
    id: string;
    userId: string;
    status: BookingStatus;
    paymentStatus: PaymentStatus;
    paymentIntentId?: string;
    createdAt: string;
  }
  
  export type BookingStep = 'date' | 'participants' | 'contact' | 'confirmation';