'use client';

import { useEffect, useState } from 'react';

function Hitokoto() {
  const [hitokotoText, setHitokotoText] = useState('loading ...');

  async function fetchHitokotoText() {
    const response = await fetch('https://v1.hitokoto.cn');
    const { hitokoto: hitokotoText } = await response.json();
    setHitokotoText(hitokotoText);
  }

  useEffect(() => {
    fetchHitokotoText();
  }, []);

  return (
    <div
      className="text-sm mt-8 text-center bg-gradient-to-r from-red-300 via-purple-400 to-blue-500 rounded-sm p-1 bg-clip-text text-transparent select-none hover:cursor-pointer"
      title="点击刷新一言"
      onClick={fetchHitokotoText}
    >
      {hitokotoText}
    </div>
  );
}

export default Hitokoto;
