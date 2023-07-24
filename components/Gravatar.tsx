import React from 'react';

import Image from 'next/image';

function Gravatar() {
  return (
    <Image
      src="/avatar.png"
      alt="author"
      width={18}
      height={18}
      className="mx-1 my-0 inline-block rounded-full p-0 align-middle"
      title="oeyoews"
    />
  );
}

export default Gravatar;
