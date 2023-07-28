import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="prose mx-auto flex max-h-screen items-center  justify-center">
      <Image src="/404.svg" alt="404" width={256} height={256} />
      <Link href="/" className="animate-bounce no-underline hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}
