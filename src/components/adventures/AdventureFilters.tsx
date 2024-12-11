"use client";

import { useFilters } from './FilterContext';
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import Calendar from '@/components/ui/calendar-new';
import { Button } from "@/components/ui/button";
import { MapPin, Users, Clock } from "lucide-react";

// Define the duration ranges as a const to maintain type safety
const DURATION_RANGES = {
  "< 3 hours": { min: 0, max: 179 },
  "3-6 hours": { min: 180, max: 359 },
  "6-12 hours": { min: 360, max: 719 },
  "Full day": { min: 720, max: 1439 },
  "Multi-day": { min: 1440, max: Infinity }
} as const;

type DurationType = keyof typeof DURATION_RANGES;

export default function AdventureFilters() {
  const { filters, updateFilters, clearFilters } = useFilters();

  const difficulties = ["Easy", "Moderate", "Challenging", "Expert"];
  const categories = ["Hiking", "Kayaking", "Rock Climbing", "Mountain Biking", "Fishing"];
  const durations = Object.keys(DURATION_RANGES) as DurationType[];

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-lg">
      {/* Price Range */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="px-2">
          <Slider
            defaultValue={filters.priceRange}
            max={1000}
            step={10}
            value={filters.priceRange}
            onValueChange={(value) => updateFilters({ priceRange: value })}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Date Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Date</h3>
        <Calendar
          selected={filters.selectedDate}
          onSelect={(date) => updateFilters({ selectedDate: date })}
          minDate={new Date()}
          placeholderText="Filter by date"
          inline={true}
          showTimeSelect={false}
          className="w-full"
        />
      </div>

      {/* Difficulty */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Difficulty</h3>
        <div className="flex flex-wrap gap-2">
          {difficulties.map((diff) => (
            <Badge
              key={diff}
              variant={filters.selectedDifficulties.includes(diff) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => {
                const newDifficulties = filters.selectedDifficulties.includes(diff)
                  ? filters.selectedDifficulties.filter((d) => d !== diff)
                  : [...filters.selectedDifficulties, diff];
                updateFilters({ selectedDifficulties: newDifficulties });
              }}
            >
              {diff}
            </Badge>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={filters.selectedCategories.includes(cat) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => {
                const newCategories = filters.selectedCategories.includes(cat)
                  ? filters.selectedCategories.filter((c) => c !== cat)
                  : [...filters.selectedCategories, cat];
                updateFilters({ selectedCategories: newCategories });
              }}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {/* Group Size */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Group Size</h3>
        <div className="flex items-center gap-4 px-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => updateFilters({ groupSize: Math.max(1, filters.groupSize - 1) })}
          >
            -
          </Button>
          <span className="text-lg font-medium w-8 text-center">
            {filters.groupSize}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => updateFilters({ groupSize: Math.min(10, filters.groupSize + 1) })}
          >
            +
          </Button>
        </div>
      </div>

      {/* Duration */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Duration</h3>
        <div className="flex flex-wrap gap-2">
          {durations.map((dur) => (
            <Badge
              key={dur}
              variant={filters.duration.includes(dur) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => {
                const newDuration = filters.duration.includes(dur)
                  ? filters.duration.filter((d) => d !== dur)
                  : [...filters.duration, dur];
                updateFilters({ duration: newDuration });
              }}
            >
              {dur}
            </Badge>
          ))}
        </div>

        {/* Optional: Add helper text to show duration ranges */}
        {filters.duration.length > 0 && (
          <p className="mt-2 text-sm text-gray-500">
            Selected: {filters.duration.join(", ")}
          </p>
        )}
      </div>

      {/* Clear Filters Button */}
      <Button
        variant="outline"
        className="w-full"
        onClick={clearFilters}
      >
        Clear Filters
      </Button>
    </div>
  );
}