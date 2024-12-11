// components/SupabaseTest.tsx
'use client';

import { useState, useEffect } from 'react';
import { testSupabaseConnection } from '@/lib/supabase';

export function SupabaseTest() {
  const [status, setStatus] = useState<'testing' | 'success' | 'error'>('testing');

  useEffect(() => {
    const test = async () => {
      const result = await testSupabaseConnection();
      setStatus(result ? 'success' : 'error');
    };
    test();
  }, []);

  if (status === 'testing') return <div>Testing Supabase connection...</div>;
  if (status === 'error') {
    return (
      <div>
        <p>Error connecting to Supabase</p>
        <p>SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set'}</p>
        <p>SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'}</p>
      </div>
    );
  }
  return <div>Successfully connected to Supabase</div>;
}