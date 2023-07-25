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

    if (key === 'ArrowLeft' && prevPost) {
      router.push(`/posts/${prevPost.meta.slug}`);
    } else if (key === 'ArrowRight' && nextPost) {
      router.push(`/posts/${nextPost.meta.slug}`);
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
