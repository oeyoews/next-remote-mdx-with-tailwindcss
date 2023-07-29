// 'use server';
import { FiEye } from 'react-icons/fi';

import { kv } from '@vercel/kv';

// 由于变量没有公开, 服务端组件不能在客户端渲染, 所以刷新次数不会增加??? 但是funtion 在服务端可以运行啊, 并且返回给客户端?
// createClient ???  // https://vercel.com/docs/storage/vercel-kv/quickstart
async function Views(params: { slug: string }) {
  let views: kvOptions | null = null;
  let quantity: number | undefined;
  // if (process.env.NODE_ENV === 'development') {
  const { slug } = params;
  views = await kv.get(slug);
  quantity = (views?.quantity || 0) + 1;
  await kv.set(slug, { quantity });
  views = await kv.get(slug);
  // }

  return (
    <>
      <FiEye className="inline ml-2 mr-1" /> views: {views?.quantity}
    </>
  );
}

export default Views;
