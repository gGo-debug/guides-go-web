import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          adventure_id: body.adventureId,
          booking_date: body.date,
          start_time: body.startTime,
          number_of_participants: body.participants.length,
          total_price: body.totalPrice,
          special_requirements: body.specialRequirements,
          contact_email: body.contactEmail,
          contact_phone: body.contactPhone,
          participant_names: body.participants.map((p: any) => p.name),
          status: 'confirmed',
          payment_status: 'pending', // We'll update this once we add payment processing
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const adventureId = searchParams.get('adventureId');

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('adventure_id', adventureId);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch bookings' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}