'use client';

import { useBooking } from '@/contexts/BookingContext';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from 'lucide-react';

interface ParticipantFormProps {
  maxGroupSize: number;
}

export function ParticipantForm({ maxGroupSize }: ParticipantFormProps) {
  const {
    participants,
    addParticipant,
    removeParticipant,
    updateParticipant,
    error
  } = useBooking();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Participant Information</h2>
        {participants.length < maxGroupSize && (
          <Button
            variant="outline"
            onClick={addParticipant}
          >
            Add Participant
          </Button>
        )}
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-4">
        {participants.map((participant, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Participant {index + 1}</h3>
                  {participants.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeParticipant(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`name-${index}`}>Full Name*</Label>
                  <Input
                    id={`name-${index}`}
                    value={participant.name}
                    onChange={(e) => updateParticipant(index, 'name', e.target.value)}
                    placeholder="Enter full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`age-${index}`}>Age</Label>
                  <Input
                    id={`age-${index}`}
                    type="number"
                    value={participant.age || ''}
                    onChange={(e) => updateParticipant(index, 'age', e.target.value)}
                    placeholder="Enter age"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`requirements-${index}`}>Special Requirements</Label>
                  <Input
                    id={`requirements-${index}`}
                    value={participant.requirements || ''}
                    onChange={(e) => updateParticipant(index, 'requirements', e.target.value)}
                    placeholder="Any special requirements or notes"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}