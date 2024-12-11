// utils/availability.ts
import { createClient } from '@supabase/supabase-js';
import { addDays, format, parse } from 'date-fns';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface TimeSlot {
  startTime: string;
  endTime: string;
  availableSpots: number;
  price: number;
}

interface AvailabilityResponse {
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

    const availability: AvailabilityResponse[] = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      const dateStr = format(currentDate, 'yyyy-MM-dd');
      const dayOfWeek = currentDate.getDay();

      // Check for date override first
      const override = dateOverrides?.find(o => 
        format(new Date(o.specific_date), 'yyyy-MM-dd') === dateStr
      );

      if (override) {
        // Use override slots
        availability.push({
          date: dateStr,
          timeSlots: [{
            startTime: override.start_time,
            endTime: override.end_time,
            availableSpots: override.available_slots,
            price: override.price_override || adventure.price
          }]
        });
      } else {
        // Use regular schedule
        const daySlots = regularSlots?.filter(slot => 
          slot.day_of_week === dayOfWeek
        );

        if (daySlots?.length) {
          const timeSlots = await Promise.all(
            daySlots.map(async (slot) => {
              // Count existing bookings for this slot
              const slotBookings = bookings?.filter(booking =>
                booking.booking_date === dateStr &&
                booking.start_time === slot.start_time
              ) || [];

              const bookedSpots = slotBookings.reduce(
                (sum, booking) => sum + booking.number_of_participants,
                0
              );

              return {
                startTime: slot.start_time,
                endTime: slot.end_time,
                availableSpots: slot.max_participants - bookedSpots,
                price: slot.price_override || adventure.price
              };
            })
          );

          availability.push({
            date: dateStr,
            timeSlots: timeSlots.filter(slot => slot.availableSpots > 0)
          });
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
    const { data: override } = await supabase
      .from('date_availability')
      .select('*')
      .eq('adventure_id', adventureId)
      .eq('specific_date', dateStr)
      .eq('start_time', startTime)
      .single();

    if (override) {
      return override.available_slots >= participants;
    }

    // Check regular schedule
    const { data: regularSlot } = await supabase
      .from('time_slots')
      .select('*')
      .eq('adventure_id', adventureId)
      .eq('day_of_week', dayOfWeek)
      .eq('start_time', startTime)
      .single();

    if (!regularSlot) {
      return false;
    }

    // Count existing bookings
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

    return (regularSlot.max_participants - bookedSpots) >= participants;
  } catch (error) {
    console.error('Error checking slot availability:', error);
    throw error;
  }
}