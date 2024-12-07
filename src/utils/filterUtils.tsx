// src/utils/filterUtils.ts
import { createClient } from '@supabase/supabase-js';
import { Adventure, Filters } from '@/types/adventures';
import { Database } from '@/types/supabase';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getFilteredAdventures(
  filters: Filters
): Promise<{ data: Adventure[] | null; error: Error | null }> {
  try {
    let query = supabase
      .from('adventures')
      .select('*')
      .eq('status', 'active');

    // Price Range Filter
    if (Array.isArray(filters.priceRange) && filters.priceRange.length === 2) {
      const [minPrice, maxPrice] = filters.priceRange;
      query = query
        .gte('price', minPrice)
        .lte('price', maxPrice);
    }

    // Difficulties Filter
    if (Array.isArray(filters.selectedDifficulties) && filters.selectedDifficulties.length > 0) {
      query = query.in('difficulty', filters.selectedDifficulties);
    }

    // Categories Filter
    if (Array.isArray(filters.selectedCategories) && filters.selectedCategories.length > 0) {
      query = query.in('category', filters.selectedCategories);
    }

    // Group Size Filter
    if (typeof filters.groupSize === 'number' && filters.groupSize > 0) {
      query = query
        .lte('min_group_size', filters.groupSize)
        .gte('max_group_size', filters.groupSize);
    }

    // Duration Filter
    if (Array.isArray(filters.duration) && filters.duration.length > 0) {
      const durationRanges = {
        "< 3 hours": { min: 0, max: 179 },
        "3-6 hours": { min: 180, max: 359 },
        "6-12 hours": { min: 360, max: 719 },
        "Full day": { min: 720, max: 1439 },
        "Multi-day": { min: 1440, max: 10080 } // Cap at 7 days
      };

      const selectedRanges = filters.duration.map(d => durationRanges[d]);
      const minDuration = Math.min(...selectedRanges.map(r => r.min));
      const maxDuration = Math.max(...selectedRanges.map(r => r.max));

      query = query
        .gte('duration_minutes', minDuration)
        .lte('duration_minutes', maxDuration);
    }

    // Date Availability Filter
    if (filters.selectedDate instanceof Date) {
      const dateStr = filters.selectedDate.toISOString().split('T')[0];
      
      // First get adventures with availability
      const { data: availabilityData, error: availError } = await supabase
        .from('availability')
        .select('adventure_id')
        .eq('date', dateStr)
        .gt('available_slots', 0);

      if (availError) throw availError;

      if (availabilityData && availabilityData.length > 0) {
        query = query.in('id', availabilityData.map(a => a.adventure_id));
      } else {
        // No availability for this date
        return { data: [], error: null };
      }
    }

    // Execute the query
    const { data, error } = await query
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error in getFilteredAdventures:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error('Unknown error occurred') 
    };
  }
}

// Type guard for runtime type checking
export function isValidFilters(filters: unknown): filters is Filters {
  if (!filters || typeof filters !== 'object') return false;

  const f = filters as Filters;
  
  return (
    Array.isArray(f.priceRange) &&
    f.priceRange.length === 2 &&
    Array.isArray(f.selectedDifficulties) &&
    Array.isArray(f.selectedCategories) &&
    typeof f.groupSize === 'number' &&
    Array.isArray(f.duration)
  );
}

// Helper function to safely parse filters from URL or other sources
export function parseFilters(rawFilters: unknown): Filters {
  if (isValidFilters(rawFilters)) {
    return rawFilters;
  }

  // Return default filters if invalid
  return {
    priceRange: [0, 1000],
    selectedDate: null,
    selectedDifficulties: [],
    selectedCategories: [],
    groupSize: 1,
    duration: []
  };
}