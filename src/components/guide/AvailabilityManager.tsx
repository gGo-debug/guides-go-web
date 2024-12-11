'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from 'date-fns';
import { supabase } from '@/lib/supabase';

const daysOfWeek = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

interface TimeSlot {
  startTime: string;
  endTime: string;
  maxParticipants: number;
  priceOverride?: number;
}

interface DaySchedule {
  dayOfWeek: number;
  timeSlots: TimeSlot[];
}

export function AvailabilityManager({ adventureId }: { adventureId: string }) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [regularSchedule, setRegularSchedule] = useState<DaySchedule[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [newTimeSlot, setNewTimeSlot] = useState<TimeSlot>({
    startTime: '09:00',
    endTime: '12:00',
    maxParticipants: 8,
  });

  const addTimeSlot = async () => {
    try {
      const { data, error } = await supabase
        .from('time_slots')
        .insert([
          {
            adventure_id: adventureId,
            day_of_week: selectedDay,
            start_time: newTimeSlot.startTime,
            end_time: newTimeSlot.endTime,
            max_participants: newTimeSlot.maxParticipants,
            price_override: newTimeSlot.priceOverride,
          }
        ]);

      if (error) throw error;

      // Update local state
      setRegularSchedule(prev => {
        const daySchedule = prev.find(d => d.dayOfWeek === selectedDay);
        if (daySchedule) {
          return prev.map(d => 
            d.dayOfWeek === selectedDay 
              ? { ...d, timeSlots: [...d.timeSlots, newTimeSlot] }
              : d
          );
        } else {
          return [...prev, { dayOfWeek: selectedDay, timeSlots: [newTimeSlot] }];
        }
      });
    } catch (error) {
      console.error('Error adding time slot:', error);
    }
  };

  const addDateOverride = async () => {
    if (!selectedDate) return;

    try {
      const { data, error } = await supabase
        .from('date_availability')
        .insert([
          {
            adventure_id: adventureId,
            specific_date: format(selectedDate, 'yyyy-MM-dd'),
            start_time: newTimeSlot.startTime,
            end_time: newTimeSlot.endTime,
            max_participants: newTimeSlot.maxParticipants,
            available_slots: newTimeSlot.maxParticipants,
            price_override: newTimeSlot.priceOverride,
          }
        ]);

      if (error) throw error;
    } catch (error) {
      console.error('Error adding date override:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Regular Schedule Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Regular Schedule</h2>
        
        <div className="flex gap-4">
          <Select
            value={selectedDay.toString()}
            onValueChange={(value) => setSelectedDay(parseInt(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select day" />
            </SelectTrigger>
            <SelectContent>
              {daysOfWeek.map((day, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="time"
            value={newTimeSlot.startTime}
            onChange={(e) => setNewTimeSlot(prev => ({ ...prev, startTime: e.target.value }))}
          />

          <Input
            type="time"
            value={newTimeSlot.endTime}
            onChange={(e) => setNewTimeSlot(prev => ({ ...prev, endTime: e.target.value }))}
          />

          <Input
            type="number"
            placeholder="Max participants"
            value={newTimeSlot.maxParticipants}
            onChange={(e) => setNewTimeSlot(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
          />

          <Input
            type="number"
            placeholder="Price override (optional)"
            value={newTimeSlot.priceOverride || ''}
            onChange={(e) => setNewTimeSlot(prev => ({ ...prev, priceOverride: parseFloat(e.target.value) }))}
          />

          <Button onClick={addTimeSlot}>Add Time Slot</Button>
        </div>

        {/* Display current schedule */}
        <div className="space-y-2">
          {regularSchedule.map((daySchedule) => (
            <div key={daySchedule.dayOfWeek} className="p-4 border rounded-lg">
              <h3 className="font-medium">{daysOfWeek[daySchedule.dayOfWeek]}</h3>
              <div className="space-y-2 mt-2">
                {daySchedule.timeSlots.map((slot, index) => (
                  <div key={index} className="flex gap-4 text-sm">
                    <span>{slot.startTime} - {slot.endTime}</span>
                    <span>{slot.maxParticipants} participants</span>
                    {slot.priceOverride && <span>${slot.priceOverride}</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Date Overrides Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Date Overrides</h2>
        
        <div className="flex gap-8">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />

          <div className="space-y-4">
            <Input
              type="time"
              value={newTimeSlot.startTime}
              onChange={(e) => setNewTimeSlot(prev => ({ ...prev, startTime: e.target.value }))}
            />

            <Input
              type="time"
              value={newTimeSlot.endTime}
              onChange={(e) => setNewTimeSlot(prev => ({ ...prev, endTime: e.target.value }))}
            />

            <Input
              type="number"
              placeholder="Max participants"
              value={newTimeSlot.maxParticipants}
              onChange={(e) => setNewTimeSlot(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
            />

            <Input
              type="number"
              placeholder="Price override (optional)"
              value={newTimeSlot.priceOverride || ''}
              onChange={(e) => setNewTimeSlot(prev => ({ ...prev, priceOverride: parseFloat(e.target.value) }))}
            />

            <Button 
              onClick={addDateOverride}
              disabled={!selectedDate}
              className="w-full"
            >
              Add Date Override
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}