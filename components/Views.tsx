import { FiEye } from 'react-icons/fi';

import { kv } from '@vercel/kv';

async function Views(params: { slug: string }) {
  const { slug } = params;
  let views: kvOptions | null = await kv.get(slug);
  await kv.set(slug, { quantity: views?.quantity ? views.quantity + 1 : 1 });
  views = await kv.get(slug);

  return (
    <>
      <FiEye className="inline ml-2 mr-1" /> views: {views?.quantity}
    </>
  );
}

export default Views;
