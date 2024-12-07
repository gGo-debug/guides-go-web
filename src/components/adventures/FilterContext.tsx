'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useDebounce } from '@/constants/useDebounce';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Duration mappings (same as before)
const DURATION_RANGES = {
  "< 3 hours": { min: 0, max: 179 },
  "3-6 hours": { min: 180, max: 359 },
  "6-12 hours": { min: 360, max: 719 },
  "Full day": { min: 720, max: 1439 },
  "Multi-day": { min: 1440, max: Infinity }
} as const;

type DurationType = keyof typeof DURATION_RANGES;

interface Adventure {
  id: string;
  title: string;
  description: string;
  location: string;
  duration_minutes: number;
  price: number;
  min_group_size: number;
  max_group_size: number;
  image_url: string;
  category: string;
  difficulty: string;
}

interface Filters {
  priceRange: number[];
  selectedDate?: Date;
  selectedDifficulties: string[];
  selectedCategories: string[];
  groupSize: number;
  duration: DurationType[];
}

interface FilterContextType {
  filters: Filters;
  debouncedFilters: Filters;
  adventures: Adventure[];
  isLoading: boolean;
  updateFilters: (newFilters: Partial<Filters>) => void;
  clearFilters: () => void;
}

const initialFilters: Filters = {
  priceRange: [0, 1000],
  selectedDate: undefined,
  selectedDifficulties: [],
  selectedCategories: [],
  groupSize: 1,
  duration: [],
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Debounce all filters with a 500ms delay
  const debouncedFilters = useDebounce<Filters>(filters, 500);

  const fetchFilteredAdventures = useCallback(async (currentFilters: Filters) => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('adventures')
        .select('*')
        .eq('status', 'active');

      // Apply price filter
      if (currentFilters.priceRange) {
        query = query
          .gte('price', currentFilters.priceRange[0])
          .lte('price', currentFilters.priceRange[1]);
      }

      // Apply difficulty filter
      if (currentFilters.selectedDifficulties.length > 0) {
        query = query.in('difficulty', currentFilters.selectedDifficulties);
      }

      // Apply category filter
      if (currentFilters.selectedCategories.length > 0) {
        query = query.in('category', currentFilters.selectedCategories);
      }

      // Apply group size filter
      if (currentFilters.groupSize > 1) {
        query = query
          .lte('min_group_size', currentFilters.groupSize)
          .gte('max_group_size', currentFilters.groupSize);
      }

      // Apply duration filter
      if (currentFilters.duration.length > 0) {
        const durationRanges = currentFilters.duration.map(d => DURATION_RANGES[d]);
        const minDuration = Math.min(...durationRanges.map(r => r.min));
        const maxDuration = Math.max(...durationRanges.map(r => r.max));
        
        query = query
          .gte('duration_minutes', minDuration)
          .lte('duration_minutes', maxDuration === Infinity ? 10080 : maxDuration);
      }

      const { data, error } = await query;

      if (error) throw error;

      // If date is selected, filter adventures based on availability
      let filteredData = data || [];
      if (currentFilters.selectedDate && filteredData.length > 0) {
        const { data: availabilityData } = await supabase
          .from('availability')
          .select('*')
          .in('adventure_id', filteredData.map(a => a.id))
          .eq('date', currentFilters.selectedDate.toISOString().split('T')[0])
          .gt('available_slots', 0);

        if (availabilityData) {
          const availableAdventureIds = new Set(availabilityData.map(a => a.adventure_id));
          filteredData = filteredData.filter(a => availableAdventureIds.has(a.id));
        }
      }

      setAdventures(filteredData);
    } catch (error) {
      console.error('Error fetching adventures:', error);
      setAdventures([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Use effect to watch for changes in debounced filters
  useEffect(() => {
    fetchFilteredAdventures(debouncedFilters);
  }, [debouncedFilters, fetchFilteredAdventures]);

  const updateFilters = useCallback((newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  return (
    <FilterContext.Provider 
      value={{ 
        filters, 
        debouncedFilters,
        adventures, 
        isLoading,
        updateFilters,
        clearFilters 
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}