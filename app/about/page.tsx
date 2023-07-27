import Link from 'next/link';

import TransitionWrapper from '@/components/TransitionWrapper';

// add metadata

export async function generateMetadata() {
  return {
    title: 'About me',
    description: 'personal about me',
  };
}

export default function page() {
  return (
    <TransitionWrapper>
      <div className="prose mx-auto my-4 rounded p-4 max-w-3xl">
        <blockquote>Coming ...</blockquote>
        <div className="flex items-center justify-end">
          <Link href="/"> ← Back to Home</Link>
        </div>
      </div>
    </TransitionWrapper>
  );
}
