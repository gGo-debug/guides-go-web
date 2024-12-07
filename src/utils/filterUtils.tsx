// src/utils/filterUtils.ts
import { SupabaseClient } from '@supabase/supabase-js';

export async function getFilteredAdventures(
  supabase: SupabaseClient,
  filters: {
    priceRange?: number[];
    selectedDate?: Date;
    selectedDifficulties?: string[];
    selectedCategories?: string[];
    groupSize?: number;
    duration?: string[];
  }
) {
  let query = supabase
    .from('adventures')
    .select('*')
    .eq('status', 'active');

  if (filters.priceRange) {
    query = query
      .gte('price', filters.priceRange[0])
      .lte('price', filters.priceRange[1]);
  }

  if (filters.selectedDifficulties?.length > 0) {
    query = query.in('difficulty', filters.selectedDifficulties);
  }

  if (filters.selectedCategories?.length > 0) {
    query = query.in('category', filters.selectedCategories);
  }

  if (filters.groupSize) {
    query = query.contains('group_size', filters.groupSize.toString());
  }

  // Add additional filter logic for duration, dates, etc.

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching adventures:', error);
    return [];
  }

  return data;
}