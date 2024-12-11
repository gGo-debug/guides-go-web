// components/AuthTest.tsx
'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function AuthTest() {
  useEffect(() => {
    const testAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log('Auth test:', { data, error });
    };
    testAuth();
  }, []);

  return null;
}