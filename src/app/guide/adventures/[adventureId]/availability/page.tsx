// app/guide/adventures/[adventureId]/availability/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { AvailabilityManager } from '@/components/guide/AvailabilityManager';

export default async function AdventureAvailabilityPage({
  params: { adventureId }
}: {
  params: { adventureId: string }
}) {
  const supabase = createServerComponentClient({ cookies });
  
  // Verify adventure belongs to guide
  const { data: adventure } = await supabase
    .from('adventures')
    .select('*')
    .eq('id', adventureId)
    .single();

  if (!adventure) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage Availability</h1>
      </div>
      
      <AvailabilityManager adventureId={adventureId} />
    </div>
  );
}