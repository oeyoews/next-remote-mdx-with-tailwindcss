import React from 'react';

import Link from 'next/link';

function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
  const navClass = 'mb-4 text-center bg-neutral-100 p-2 rounded-md';

  return (
    <div className="justify-between items-center flex">
      {prevPost && (
        <Link href={`/posts/${prevPost.slug}`} title={prevPost.title}>
          <p className={navClass}>← 上一篇</p>
        </Link>
      )}
      {nextPost && (
        <Link
          href={`/posts/${nextPost.slug}`}
          title={nextPost.title.toLocaleUpperCase()}
        >
          <p className={navClass}>下一篇 →</p>
        </Link>
      )}
    </div>
  );
}

export default PostNavigation;
