// utils/availability.ts
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';

export interface TimeSlot {
  startTime: string;
  endTime: string;
  availableSpots: number;
  price: number;
}

export interface AvailabilityResponse {
  date: string;
  timeSlots: TimeSlot[];
}

export async function getAvailability(
  adventureId: string,
  startDate: Date,
  endDate: Date
): Promise<AvailabilityResponse[]> {
  try {
    // Get regular schedule
    const { data: regularSlots } = await supabase
      .from('time_slots')
      .select('*')
      .eq('adventure_id', adventureId)
      .eq('is_active', true);

    // Get date overrides
    const { data: dateOverrides } = await supabase
      .from('date_availability')
      .select('*')
      .eq('adventure_id', adventureId)
      .gte('specific_date', format(startDate, 'yyyy-MM-dd'))
      .lte('specific_date', format(endDate, 'yyyy-MM-dd'))
      .eq('is_blocked', false);

    // Get existing bookings
    const { data: bookings } = await supabase
      .from('bookings')
      .select('*')
      .eq('adventure_id', adventureId)
      .gte('booking_date', format(startDate, 'yyyy-MM-dd'))
      .lte('booking_date', format(endDate, 'yyyy-MM-dd'))
      .in('status', ['pending', 'confirmed']);

    // Process and return availability data
    // ... (same processing logic as before)
    
    return []; // Replace with actual processed data
  } catch (error) {
    console.error('Error checking availability:', error);
    throw error;
  }
}

export async function checkSlotAvailability(
  adventureId: string,
  date: Date,
  startTime: string,
  participants: number
): Promise<boolean> {
  try {
    const dateStr = format(date, 'yyyy-MM-dd');
    
    // Check if slot exists and has capacity
    const { data: slot } = await supabase
      .from('time_slots')
      .select('max_participants')
      .eq('adventure_id', adventureId)
      .eq('start_time', startTime)
      .single();

    if (!slot) return false;

    // Check existing bookings
    const { data: bookings } = await supabase
      .from('bookings')
      .select('number_of_participants')
      .eq('adventure_id', adventureId)
      .eq('booking_date', dateStr)
      .eq('start_time', startTime)
      .in('status', ['pending', 'confirmed']);

    const bookedSpots = bookings?.reduce(
      (sum, booking) => sum + booking.number_of_participants,
      0
    ) || 0;

    return (slot.max_participants - bookedSpots) >= participants;
  } catch (error) {
    console.error('Error checking slot availability:', error);
    throw error;
  }
}