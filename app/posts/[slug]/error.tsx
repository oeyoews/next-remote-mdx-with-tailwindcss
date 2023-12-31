'use client';

// Error components must be Client components
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="prose mx-auto max-h-screen max-w-3xl">
      <h2 className="text-red-400">Something went wrong!</h2>
      <button
        className="rounded bg-red-400 p-2 font-semibold"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
