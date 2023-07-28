import { FiEye } from 'react-icons/fi';

import { kv } from '@vercel/kv';

async function Views(params: { slug: string }) {
  const { slug } = params;
  let views;
  //   if (process.env.NODE_ENV === 'production') {
  views = await kv.get<kvOptions>(slug);
  await kv.set(slug, {
    slug,
    quantity: views?.quantity ? views.quantity + 1 : 1,
  });
  // }

  // {total: {quantity: 1}}
  // {slug: {quantity: 1}}

  // views = await kv.get<kvOptions>('total');
  // await kv.set('total', {
  //   total: 'total',
  //   quantity: views?.quantity ? views.quantity + 1 : 1,
  // });

  // views = await kv.get<kvOptions>('total');
  return (
    <>
      <FiEye className="inline ml-2 mr-1" /> views: {views?.quantity}
    </>
  );
}

export default Views;
