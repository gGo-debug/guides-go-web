"use client";

import { useState } from 'react';

interface BookingFormProps {
  adventureId: string;
  price: number;
}

export default function BookingForm({ adventureId, price }: BookingFormProps) {
  const [formData, setFormData] = useState({
    date: '',
    startTime: '09:00',
    participants: [{ name: '', age: '' }],
    specialRequirements: '',
    contactEmail: '',
    contactPhone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adventureId,
          ...formData,
          totalPrice: price * formData.participants.length,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      // Show success message and reset form
      alert('Booking created successfully!');
      setFormData({
        date: '',
        startTime: '09:00',
        participants: [{ name: '', age: '' }],
        specialRequirements: '',
        contactEmail: '',
        contactPhone: '',
      });
    } catch (error) {
      alert('Failed to create booking. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          required
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0E9871] focus:ring-[#0E9871]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Time</label>
        <select
          value={formData.startTime}
          onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0E9871] focus:ring-[#0E9871]"
        >
          <option value="09:00">9:00 AM</option>
          <option value="13:00">1:00 PM</option>
          <option value="15:00">3:00 PM</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          required
          value={formData.contactEmail}
          onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0E9871] focus:ring-[#0E9871]"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#0E9871] to-[#39CF8D] text-white rounded-lg 
          py-3 px-4 text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Book Now
      </button>
    </form>
  );
}