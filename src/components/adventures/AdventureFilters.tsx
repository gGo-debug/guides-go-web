"use client";

import { useState } from "react";

export function AdventureFilters() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
        
        {/* Price Range */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Price Range</label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Difficulty */}
        <div className="space-y-3 mt-6">
          <label className="text-sm font-medium text-gray-700">Difficulty</label>
          <div className="space-y-2">
            {['Easy', 'Moderate', 'Challenging', 'Expert'].map((difficulty) => (
              <label key={difficulty} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedDifficulties.includes(difficulty)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedDifficulties([...selectedDifficulties, difficulty]);
                    } else {
                      setSelectedDifficulties(
                        selectedDifficulties.filter((d) => d !== difficulty)
                      );
                    }
                  }}
                  className="rounded border-gray-300 text-[#0E9871] focus:ring-[#0E9871]"
                />
                <span className="text-sm text-gray-600">{difficulty}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Add more filters as needed */}
      </div>
    </div>
  );
}