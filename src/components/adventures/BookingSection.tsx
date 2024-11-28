"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface BookingSectionProps {
  adventureId: string;
  price: number;
  title: string;
}

export function BookingSection({ adventureId, price, title }: BookingSectionProps) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [participants, setParticipants] = useState(1);
  const [selectedTime, setSelectedTime] = useState<string>();
  
  const availableTimes = ["09:00", "13:00", "15:00"]; // This would come from your availability system

  const handleContinue = () => {
    if (step === 1 && date && selectedTime) {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    // This would be replaced with your booking logic
    console.log({
      adventureId,
      date,
      selectedTime,
      participants
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
      <div className="text-center pb-6 border-b">
        <div className="text-2xl font-semibold text-gray-900 mb-2">
          ${price} <span className="text-base text-gray-500">per person</span>
        </div>
        <div className="flex justify-center gap-2 text-sm text-[#0E9871]">
          <span>⭐ 4.9</span>
          <span>•</span>
          <span>124 reviews</span>
        </div>
      </div>

      {step === 1 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Select Date</h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow"
              disabled={(date) => date < new Date()}
            />
          </div>

          {date && (
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Available Times</h3>
              <div className="grid grid-cols-3 gap-3">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-4 rounded-md border text-sm font-medium transition-colors
                      ${selectedTime === time 
                        ? 'bg-[#0E9871] text-white border-[#0E9871]' 
                        : 'border-gray-200 text-gray-600 hover:border-[#0E9871]'
                      }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleContinue}
            disabled={!date || !selectedTime}
            className="w-full bg-gradient-to-r from-[#0E9871] to-[#39CF8D] text-white rounded-lg 
              py-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50 
              disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Your Booking</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-medium">{format(date!, "MMMM d, yyyy")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Number of Participants</h3>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setParticipants(Math.max(1, participants - 1))}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center
                  text-gray-600 hover:border-[#0E9871] transition-colors"
              >
                -
              </button>
              <span className="text-xl font-medium w-8 text-center">{participants}</span>
              <button
                onClick={() => setParticipants(Math.min(8, participants + 1))}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center
                  text-gray-600 hover:border-[#0E9871] transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-medium mb-4">
              <span>Total</span>
              <span>${(price * participants).toFixed(2)}</span>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-[#0E9871] to-[#39CF8D] text-white rounded-lg 
                py-3 font-medium hover:opacity-90 transition-opacity"
            >
              Book Now
            </button>
          </div>

          <button
            onClick={() => setStep(1)}
            className="w-full text-[#0E9871] text-sm hover:underline"
          >
            ← Change date or time
          </button>
        </motion.div>
      )}
    </div>
  );
}