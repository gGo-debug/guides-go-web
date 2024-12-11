'use client';

import { useState, useEffect } from 'react';
import Calendar from "@/components/ui/calendar-new";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from 'date-fns';
import { supabase } from '@/lib/supabase';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const DAYS_OF_WEEK = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
] as const;

interface TimeSlot {
  startTime: string;
  endTime: string;
  maxParticipants: number;
  priceOverride?: number | null;
}

interface RegularSlot extends TimeSlot {
  id: string;
  dayOfWeek: number;
  isActive: boolean;
}

interface DateOverride extends TimeSlot {
  id: string;
  specificDate: string;
  isBlocked: boolean;
}

interface AvailabilityManagerProps {
  adventureId: string;
  basePrice: number;
}

export function AvailabilityManager({ adventureId, basePrice }: AvailabilityManagerProps) {
  // State for regular schedule
  const [regularSlots, setRegularSlots] = useState<RegularSlot[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [newRegularSlot, setNewRegularSlot] = useState<TimeSlot>({
    startTime: '09:00',
    endTime: '17:00',
    maxParticipants: 8,
  });

  // State for date overrides
  const [dateOverrides, setDateOverrides] = useState<DateOverride[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [newDateOverride, setNewDateOverride] = useState<TimeSlot>({
    startTime: '09:00',
    endTime: '17:00',
    maxParticipants: 8,
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing schedule
  useEffect(() => {
    loadSchedule();
  }, []);

  const loadSchedule = async () => {
    setIsLoading(true);
    try {
      // Load regular slots
      const { data: regularData, error: regularError } = await supabase
        .from('time_slots')
        .select('*')
        .eq('adventure_id', adventureId)
        .order('day_of_week')
        .order('start_time');

      if (regularError) throw regularError;

      setRegularSlots(regularData.map(slot => ({
        id: slot.id,
        dayOfWeek: slot.day_of_week,
        startTime: slot.start_time,
        endTime: slot.end_time,
        maxParticipants: slot.max_participants,
        priceOverride: slot.price_override,
        isActive: slot.is_active,
      })));

      // Load date overrides
      const { data: overrideData, error: overrideError } = await supabase
        .from('date_availability')
        .select('*')
        .eq('adventure_id', adventureId)
        .gte('specific_date', new Date().toISOString())
        .order('specific_date')
        .order('start_time');

      if (overrideError) throw overrideError;

      setDateOverrides(overrideData.map(override => ({
        id: override.id,
        specificDate: override.specific_date,
        startTime: override.start_time,
        endTime: override.end_time,
        maxParticipants: override.max_participants,
        priceOverride: override.price_override,
        isBlocked: override.is_blocked,
      })));

    } catch (err) {
      setError('Failed to load schedule');
      console.error('Error loading schedule:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addRegularSlot = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('time_slots')
        .insert([{
          adventure_id: adventureId,
          day_of_week: selectedDay,
          start_time: newRegularSlot.startTime,
          end_time: newRegularSlot.endTime,
          max_participants: newRegularSlot.maxParticipants,
          price_override: newRegularSlot.priceOverride,
          is_active: true,
        }])
        .select()
        .single();

      if (error) throw error;

      setRegularSlots([...regularSlots, {
        id: data.id,
        dayOfWeek: data.day_of_week,
        startTime: data.start_time,
        endTime: data.end_time,
        maxParticipants: data.max_participants,
        priceOverride: data.price_override,
        isActive: data.is_active,
      }]);

    } catch (err) {
      setError('Failed to add regular slot');
      console.error('Error adding regular slot:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addDateOverride = async () => {
    if (!selectedDate) return;
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('date_availability')
        .insert([{
          adventure_id: adventureId,
          specific_date: format(selectedDate, 'yyyy-MM-dd'),
          start_time: newDateOverride.startTime,
          end_time: newDateOverride.endTime,
          max_participants: newDateOverride.maxParticipants,
          price_override: newDateOverride.priceOverride,
          is_blocked: false,
        }])
        .select()
        .single();

      if (error) throw error;

      setDateOverrides([...dateOverrides, {
        id: data.id,
        specificDate: data.specific_date,
        startTime: data.start_time,
        endTime: data.end_time,
        maxParticipants: data.max_participants,
        priceOverride: data.price_override,
        isBlocked: data.is_blocked,
      }]);

    } catch (err) {
      setError('Failed to add date override');
      console.error('Error adding date override:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSlotStatus = async (type: 'regular' | 'date', id: string, currentStatus: boolean) => {
    setIsLoading(true);
    try {
      if (type === 'regular') {
        const { error } = await supabase
          .from('time_slots')
          .update({ is_active: !currentStatus })
          .eq('id', id);

        if (error) throw error;

        setRegularSlots(slots =>
          slots.map(slot =>
            slot.id === id ? { ...slot, isActive: !slot.isActive } : slot
          )
        );
      } else {
        const { error } = await supabase
          .from('date_availability')
          .update({ is_blocked: !currentStatus })
          .eq('id', id);

        if (error) throw error;

        setDateOverrides(overrides =>
          overrides.map(override =>
            override.id === id ? { ...override, isBlocked: !override.isBlocked } : override
          )
        );
      }
    } catch (err) {
      setError('Failed to update status');
      console.error('Error updating status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Regular Schedule Section */}
      <Card>
        <CardHeader>
          <CardTitle>Regular Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add new regular slot */}
          <div className="grid gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <Label>Day</Label>
                <Select
                  value={selectedDay.toString()}
                  onValueChange={(value) => setSelectedDay(parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS_OF_WEEK.map((day, index) => (
                      <SelectItem key={day} value={index.toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Start Time</Label>
                <Input
                  type="time"
                  value={newRegularSlot.startTime}
                  onChange={(e) => setNewRegularSlot(prev => ({
                    ...prev,
                    startTime: e.target.value
                  }))}
                />
              </div>

              <div>
                <Label>End Time</Label>
                <Input
                  type="time"
                  value={newRegularSlot.endTime}
                  onChange={(e) => setNewRegularSlot(prev => ({
                    ...prev,
                    endTime: e.target.value
                  }))}
                />
              </div>

              <div>
                <Label>Max Participants</Label>
                <Input
                  type="number"
                  min="1"
                  value={newRegularSlot.maxParticipants}
                  onChange={(e) => setNewRegularSlot(prev => ({
                    ...prev,
                    maxParticipants: parseInt(e.target.value)
                  }))}
                />
              </div>
            </div>

            <div>
              <Label>Price Override (Optional)</Label>
              <Input
                type="number"
                step="0.01"
                value={newRegularSlot.priceOverride || ''}
                onChange={(e) => setNewRegularSlot(prev => ({
                  ...prev,
                  priceOverride: e.target.value ? parseFloat(e.target.value) : null
                }))}
                placeholder={`Default: $${basePrice}`}
              />
            </div>

            <Button 
              onClick={addRegularSlot} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Regular Slot'
              )}
            </Button>
          </div>

          {/* Display existing regular slots */}
          <div className="space-y-4">
            {regularSlots.map((slot) => (
              <div
                key={slot.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{DAYS_OF_WEEK[slot.dayOfWeek]}</span>
                    <Badge variant={slot.isActive ? "default" : "secondary"}>
                      {slot.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {slot.startTime} - {slot.endTime} • {slot.maxParticipants} participants
                    {slot.priceOverride && ` • $${slot.priceOverride}`}
                  </div>
                </div>
                
                <Switch
                  checked={slot.isActive}
                  onCheckedChange={() => toggleSlotStatus('regular', slot.id, slot.isActive)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Date Overrides Section */}
      <Card>
        <CardHeader>
          <CardTitle>Date Overrides</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Calendar */}
            <div>
              <Calendar
                selected={selectedDate}
                onSelect={setSelectedDate}
                minDate={new Date()}
                className="rounded-md border"
              />
            </div>

            {/* Override Form */}
            <div className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label>Start Time</Label>
                  <Input
                    type="time"
                    value={newDateOverride.startTime}
                    onChange={(e) => setNewDateOverride(prev => ({
                      ...prev,
                      startTime: e.target.value
                    }))}
                  />
                </div>

                <div>
                  <Label>End Time</Label>
                  <Input
                    type="time"
                    value={newDateOverride.endTime}
                    onChange={(e) => setNewDateOverride(prev => ({
                      ...prev,
                      endTime: e.target.value
                    }))}
                  />
                </div>

                <div>
                  <Label>Max Participants</Label>
                  <Input
                    type="number"
                    min="1"
                    value={newDateOverride.maxParticipants}
                    onChange={(e) => setNewDateOverride(prev => ({
                      ...prev,
                      maxParticipants: parseInt(e.target.value)
                    }))}
                  />
                </div>

                <div>
                  <Label>Price Override (Optional)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newDateOverride.priceOverride || ''}
                    onChange={(e) => setNewDateOverride(prev => ({
                      ...prev,
                      priceOverride: e.target.value ? parseFloat(e.target.value) : null
                    }))}
                    placeholder={`Default: $${basePrice}`}
                  />
                </div>

                <Button
                  onClick={addDateOverride}
                  disabled={isLoading || !selectedDate}
                  className="w-full"
                >
                   {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    'Add Date Override'
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Display existing date overrides */}
          <div className="space-y-4">
            {dateOverrides.map((override) => (
              <div
                key={override.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{format(new Date(override.specificDate), 'MMMM d, yyyy')}</span>
                    <Badge variant={override.isBlocked ? "secondary" : "default"}>
                      {override.isBlocked ? 'Blocked' : 'Available'}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {override.startTime} - {override.endTime} • {override.maxParticipants} participants
                    {override.priceOverride && ` • $${override.priceOverride}`}
                  </div>
                </div>
                
                <Switch
                  checked={!override.isBlocked}
                  onCheckedChange={() => toggleSlotStatus('date', override.id, !override.isBlocked)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}