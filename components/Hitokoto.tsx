'use client';

import { useEffect, useState } from 'react';

function Hitokoto() {
  const [hitokoto, setHitokoto] = useState('');

  // wired ???
  async function fetchHitokoto() {
    const response = await fetch('https://v1.hitokoto.cn', {
      // cache: 'default',
      // next: {
      //   revalidate: 5,
      // },
    });
    const { hitokoto: hitokotoText } = await response.json();
    setHitokoto(hitokotoText);
  }

  useEffect(() => {
    fetchHitokoto();
  }, []);

  return (
    <div
      className="text-sm mt-8 text-center bg-gradient-to-r from-red-300 via-purple-400 to-blue-500 rounded-sm p-1 bg-clip-text text-transparent select-none hover:cursor-pointer"
      title="点击刷新一言"
      onClick={fetchHitokoto}
    >
      {hitokoto}
    </div>
  );
}

export default Hitokoto;
