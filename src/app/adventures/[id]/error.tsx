'use client';

import { useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen py-20">
      <Container>
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
          <p className="text-gray-600 mb-8">
            We encountered an error while loading this adventure.
          </p>
          <Button
            onClick={reset}
            className="bg-gradient-to-r from-[#0E9871] to-[#39CF8D] text-white"
          >
            Try again
          </Button>
        </div>
      </Container>
    </main>
  );
}