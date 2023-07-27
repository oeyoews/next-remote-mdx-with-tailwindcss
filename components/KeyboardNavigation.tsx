'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

export default function KeyboardNavigation({
  prevPost,
  nextPost,
}: PostNavigationProps) {
  const router = useRouter();
  const handleKeyDown = (event: { key: any }) => {
    const { key } = event;

    if (prevPost && key === 'ArrowLeft') {
      router.push(`/posts/${prevPost.slug}`);
    } else if (nextPost && key === 'ArrowRight') {
      router.push(`/posts/${nextPost.slug}`);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [prevPost, nextPost]);

  return null;
}
