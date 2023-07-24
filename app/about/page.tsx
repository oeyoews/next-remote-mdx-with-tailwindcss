import Link from 'next/link';

// add metadata

export async function generateMetadata() {
  return {
    title: 'About me',
    description: 'personal about me',
  };
}

export default function page() {
  return (
    <div className="prose mx-auto my-4 max-w-none rounded p-4 sm:w-full md:w-1/2">
      <blockquote>Coming ...</blockquote>
      <div className="flex items-center justify-end">
        <Link href="/"> ← Back to Home</Link>
      </div>
    </div>
  );
}
