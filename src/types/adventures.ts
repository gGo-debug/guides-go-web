// src/types/adventures.ts
export type DurationType = "< 3 hours" | "3-6 hours" | "6-12 hours" | "Full day" | "Multi-day";

export interface Adventure {
  id: string;
  title: string;
  description: string;
  location: string;
  duration_minutes: number;
  price: number;
  difficulty: string;
  min_group_size: number;
  max_group_size: number;
  image_url: string;
  category: string;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface Filters {
  priceRange: [number, number];
  selectedDate?: Date | null;
  selectedDifficulties: string[];
  selectedCategories: string[];
  groupSize: number;
  duration: DurationType[];
}