// app/guide/onboarding/page.tsx
'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function GuideOnboarding() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('guide_profiles')
        .insert({
          id: user.id,
          bio: formData.get('bio'),
          location: formData.get('location'),
          experience_years: parseInt(formData.get('experience') as string),
          specialties: (formData.get('specialties') as string).split(',').map(s => s.trim()),
          languages: (formData.get('languages') as string).split(',').map(l => l.trim()),
          website: formData.get('website')
        });

      if (error) throw error;

      router.push('/guide/dashboard');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Complete Your Guide Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label>Bio</label>
          <Textarea
            name="bio"
            placeholder="Tell us about your experience..."
            required
          />
        </div>
        <div>
          <label>Location</label>
          <Input
            name="location"
            placeholder="Where are you based?"
            required
          />
        </div>
        <div>
          <label>Years of Experience</label>
          <Input
            name="experience"
            type="number"
            min="0"
            required
          />
        </div>
        <div>
          <label>Specialties (comma-separated)</label>
          <Input
            name="specialties"
            placeholder="Hiking, Rock Climbing, etc."
            required
          />
        </div>
        <div>
          <label>Languages (comma-separated)</label>
          <Input
            name="languages"
            placeholder="English, French, etc."
            required
          />
        </div>
        <div>
          <label>Website (optional)</label>
          <Input
            name="website"
            type="url"
            placeholder="https://..."
          />
        </div>
        <Button type="submit" className="w-full">
          Complete Profile
        </Button>
      </form>
    </div>
  );
}