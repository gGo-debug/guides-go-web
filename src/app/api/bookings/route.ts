import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { checkSlotAvailability } from '@/utils/availability';
import type { BookingDetails } from '@/types/booking';

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Check authentication
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const booking: BookingDetails = await request.json();
    
    // Validate booking
    const isAvailable = await checkSlotAvailability(
      booking.adventureId,
      booking.date,
      booking.timeSlot.startTime,
      booking.participants.length
    );

    if (!isAvailable) {
      return NextResponse.json(
        { error: 'Selected slot is no longer available' },
        { status: 400 }
      );
    }

    // Create booking
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          adventure_id: booking.adventureId,
          user_id: session.user.id,
          booking_date: booking.date,
          start_time: booking.timeSlot.startTime,
          end_time: booking.timeSlot.endTime,
          number_of_participants: booking.participants.length,
          total_price: booking.totalPrice,
          status: 'pending',
          payment_status: 'pending',
          special_requirements: booking.specialRequirements,
          contact_email: booking.contactEmail,
          contact_phone: booking.contactPhone,
          participant_names: booking.participants.map(p => p.name),
          participant_details: booking.participants
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}