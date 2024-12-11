import { createClient } from '@supabase/supabase-js';
import { addDays, format, parse, isBefore, isAfter } from 'date-fns';
import { TimeSlot } from '@/types/booking';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
    const { data: regularSlots, error: regularError } = await supabase
      .from('time_slots')
      .select('*')
      .eq('adventure_id', adventureId)
      .eq('is_active', true);

    if (regularError) throw regularError;

    // Get date overrides
    const { data: dateOverrides, error: overrideError } = await supabase
      .from('date_availability')
      .select('*')
      .eq('adventure_id', adventureId)
      .gte('specific_date', format(startDate, 'yyyy-MM-dd'))
      .lte('specific_date', format(endDate, 'yyyy-MM-dd'));

    if (overrideError) throw overrideError;

    // Get existing bookings
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('booking_date, start_time, number_of_participants')
      .eq('adventure_id', adventureId)
      .gte('booking_date', format(startDate, 'yyyy-MM-dd'))
      .lte('booking_date', format(endDate, 'yyyy-MM-dd'))
      .in('status', ['pending', 'confirmed']);

    if (bookingsError) throw bookingsError;

    const availability: AvailabilityResponse[] = [];
    let currentDate = startDate;

    while (!isAfter(currentDate, endDate)) {
      const dateStr = format(currentDate, 'yyyy-MM-dd');
      const dayOfWeek = currentDate.getDay();

      // Check for date override
      const override = dateOverrides?.find(o => 
        format(new Date(o.specific_date), 'yyyy-MM-dd') === dateStr
      );

      if (override) {
        if (!override.is_blocked) {
          // Calculate remaining spots based on bookings
          const dateBookings = bookings?.filter(b => 
            format(new Date(b.booking_date), 'yyyy-MM-dd') === dateStr &&
            b.start_time === override.start_time
          ) || [];

          const bookedSpots = dateBookings.reduce(
            (sum, b) => sum + b.number_of_participants, 
            0
          );

          const availableSpots = override.max_participants - bookedSpots;

          if (availableSpots > 0) {
            availability.push({
              date: dateStr,
              timeSlots: [{
                startTime: override.start_time,
                endTime: override.end_time,
                availableSpots,
                price: override.price_override || 0 // Default price will be handled in UI
              }]
            });
          }
        }
      } else {
        // Use regular schedule
        const daySlots = regularSlots?.filter(slot => 
          slot.day_of_week === dayOfWeek
        );

        if (daySlots?.length) {
          const availableTimeSlots = daySlots.map(slot => {
            const slotBookings = bookings?.filter(b =>
              format(new Date(b.booking_date), 'yyyy-MM-dd') === dateStr &&
              b.start_time === slot.start_time
            ) || [];

            const bookedSpots = slotBookings.reduce(
              (sum, b) => sum + b.number_of_participants,
              0
            );

            return {
              startTime: slot.start_time,
              endTime: slot.end_time,
              availableSpots: slot.max_participants - bookedSpots,
              price: slot.price_override || 0
            };
          }).filter(slot => slot.availableSpots > 0);

          if (availableTimeSlots.length > 0) {
            availability.push({
              date: dateStr,
              timeSlots: availableTimeSlots
            });
          }
        }
      }

      currentDate = addDays(currentDate, 1);
    }

    return availability;
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
    const dayOfWeek = date.getDay();

    // Check for date override first
    const { data: override, error: overrideError } = await supabase
      .from('date_availability')
      .select('*')
      .eq('adventure_id', adventureId)
      .eq('specific_date', dateStr)
      .eq('start_time', startTime)
      .single();

    if (overrideError && overrideError.code !== 'PGRST116') { // No rows returned
      throw overrideError;
    }

    if (override) {
      if (override.is_blocked) return false;

      // Check bookings against override capacity
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('number_of_participants')
        .eq('adventure_id', adventureId)
        .eq('booking_date', dateStr)
        .eq('start_time', startTime)
        .in('status', ['pending', 'confirmed']);

      if (bookingsError) throw bookingsError;

      const bookedSpots = bookings?.reduce(
        (sum, b) => sum + b.number_of_participants,
        0
      ) || 0;

      return (override.max_participants - bookedSpots) >= participants;
    }

    // Check regular schedule
    const { data: slot, error: slotError } = await supabase
      .from('time_slots')
      .select('*')
      .eq('adventure_id', adventureId)
      .eq('day_of_week', dayOfWeek)
      .eq('start_time', startTime)
      .eq('is_active', true)
      .single();

    if (slotError) throw slotError;

    if (!slot) return false;

    // Check bookings against regular capacity
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('number_of_participants')
      .eq('adventure_id', adventureId)
      .eq('booking_date', dateStr)
      .eq('start_time', startTime)
      .in('status', ['pending', 'confirmed']);

    if (bookingsError) throw bookingsError;

    const bookedSpots = bookings?.reduce(
      (sum, b) => sum + b.number_of_participants,
      0
    ) || 0;

    return (slot.max_participants - bookedSpots) >= participants;
  } catch (error) {
    console.error('Error checking slot availability:', error);
    throw error;
  }
}

// Helper function to load available dates for calendar highlighting
export async function getAvailableDates(
  adventureId: string,
  startDate: Date,
  endDate: Date
): Promise<Date[]> {
  const availability = await getAvailability(adventureId, startDate, endDate);
  return availability
    .filter(day => day.timeSlots.length > 0)
    .map(day => new Date(day.date));
}