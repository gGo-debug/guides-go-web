import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <Container>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4">Adventure Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          The adventure you're looking for doesn't exist or may have been removed.
          Try exploring our other adventures!
        </p>
        <Link href="/adventures">
          <Button>
            Browse Adventures
          </Button>
        </Link>
      </div>
    </Container>
  );
}