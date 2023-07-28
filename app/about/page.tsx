import Link from 'next/link';

import LqipImage from '@/components/LqipImage';
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
      <LqipImage
        src="/next-with-tailwind.png"
        alt="banner"
        width={22}
        height={22}
      />
      <div className="prose mx-auto my-4 rounded p-4 max-w-3xl">
        <blockquote>Coming ...</blockquote>

        <div className="flex items-center justify-end">
          <Link href="/">
            <button className="btn btn-info btn-outline">← Back to Home</button>
          </Link>
        </div>
      </div>
    </TransitionWrapper>
  );
}
