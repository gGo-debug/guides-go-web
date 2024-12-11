'use client';

import { useBooking } from '@/contexts/BookingContext';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from 'lucide-react';

export function ContactForm() {
  const {
    contactEmail,
    contactPhone,
    specialRequirements,
    setContactInfo,
    setSpecialRequirements,
    error
  } = useBooking();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Contact Information</h2>

      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email*</Label>
          <Input
            id="email"
            type="email"
            value={contactEmail}
            onChange={(e) => setContactInfo(e.target.value, contactPhone)}
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number*</Label>
          <Input
            id="phone"
            type="tel"
            value={contactPhone}
            onChange={(e) => setContactInfo(contactEmail, e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="requirements">Special Requirements</Label>
          <Textarea
            id="requirements"
            value={specialRequirements}
            onChange={(e) => setSpecialRequirements(e.target.value)}
            placeholder="Any special requirements or notes for the entire group"
            className="min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
}