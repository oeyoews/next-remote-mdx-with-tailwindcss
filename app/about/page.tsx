import Link from 'next/link';

import Hitokoto from '@/components/Hitokoto';
import ViewCounter from '@/components/ViewCounter';

import { isDev } from '@/lib/dev';

export async function generateMetadata() {
  return {
    title: 'About me',
    description: 'personal about me',
  };
}

export default async function page() {
  return (
    <div className="prose mx-auto my-4 rounded p-4 max-w-3xl">
      <blockquote>Coming ...</blockquote>
      <div className="flex items-center justify-end space-x-2">
        <ViewCounter slug="about" />
        <Link href="/"> ← Back to Home</Link>
      </div>
      {!isDev && <Hitokoto />}
    </div>
  );
}
