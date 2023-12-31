import { FiEye } from 'react-icons/fi';

import { isDev } from '@/lib/dev';
import { kv } from '@vercel/kv';

async function ViewCounter(params: { slug: string }) {
  const { slug } = params;
  if (!slug) {
    console.log(`${slug} not found`);
    return;
  }
  const views = await kv.incr(slug);

  // let views: kvOptions | null = null;
  // let quantity: number | undefined;
  // views = await kv.get(slug);
  // quantity = (views?.quantity || 0) + 1;
  // if (!isDev) {
  //   await kv.set(slug, { quantity });
  //   // views = await kv.get(slug);
  // }

  return (
    <>
      <FiEye className="inline ml-2 mr-1" />{' '}
      {Intl.NumberFormat('en-us').format(views)} views
    </>
  );
}

export default ViewCounter;
