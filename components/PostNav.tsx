import React from 'react';

import Link from 'next/link';

function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
  return (
    <div className="justify-between items-center sm:block md:flex ">
      {prevPost && (
        <p className="mb-4 text-center">
          <Link href={`/posts/${prevPost.slug}`}>← {prevPost.title}</Link>
        </p>
      )}
      {nextPost && (
        <p className="mb-4 text-center">
          <Link href={`/posts/${nextPost.slug}`}>{nextPost.title} →</Link>
        </p>
      )}
    </div>
  );
}

export default PostNavigation;
