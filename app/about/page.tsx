import Link from 'next/link';

import Hitokoto from '@/components/Hitokoto';
import TransitionWrapper from '@/components/TransitionWrapper';
import Views from '@/components/Views';

import { isDev } from '@/lib/dev';

export async function generateMetadata() {
  return {
    title: 'About me',
    description: 'personal about me',
  };
}

export default async function page() {
  return (
    <TransitionWrapper>
      <div className="prose mx-auto my-4 rounded p-4 max-w-3xl">
        <blockquote>Coming ...</blockquote>
        <div className="flex items-center justify-end space-x-2">
          {!isDev && <Views slug="about" />}
          <Link href="/"> ← Back to Home</Link>
        </div>
        {!isDev && <Hitokoto />}
      </div>
    </TransitionWrapper>
  );
}
