import { FiHeart } from 'react-icons/fi';

import { kv } from '@vercel/kv';

async function Like() {
  const likes = await kv.get<kvOptions>('likes');
  const quantity = (likes?.quantity || 0) + 1;

  async function likesPlus() {
    await kv.set('likes', { quantity });
  }
  likesPlus();

  // server and client is conflict
  return (
    <div className="block">
      Likes: {likes?.quantity}
      <FiHeart className="inline mx-1" />
    </div>
  );
}

export default Like;
