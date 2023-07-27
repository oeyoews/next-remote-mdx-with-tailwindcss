import Link from 'next/link';

import TransitionWrapper from '@/components/TransitionWrapper';

import getFormattedDate from '@/lib/getFormatedDate';
import { getAllPosts } from '@/lib/mdx';

export default async function AllPostsListItem() {
  const posts = (await getAllPosts()).slice(0, 3);
  const gradientBorder = false;
  const indexToColor: any = {
    0: 'from-[#D8B4FE] to-[#818CF8]',
    1: 'from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]',
    2: 'from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]',
  };

  if (!posts.length) {
    return (
      <main>
        <section className="prose-md prose mx-auto max-h-screen rounded p-4 max-w-3xl">
          <h1>Posts is empty </h1>
        </section>
      </main>
    );
  }

  return (
    <TransitionWrapper>
      <section className="mx-auto mt-12 max-w-3xl px-2">
        <div className="mx-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              // className="text-neutral-700 hover:!no-underline group"
              className={`text-neutral-700 transition duration-300 hover:scale-105 bg-gradient-to-r p-1 rounded-lg hover:!no-underline group ${
                index === 0 && post.fixed ? 'lg:col-span-2 lg:text-center' : ''
              } ${(gradientBorder && indexToColor[index]) || ''}`}
            >
              <div
                className={`rounded-lg border border-neutral-200 bg-white px-6 py-4 shadow-sm text-xl`}
              >
                <h2 className="truncate font-semibold capitalize">
                  {post.title || post.slug} <span className="font-bold">→</span>
                </h2>
                <small className="mr-2 inline py-2 font-serif font-semibold text-neutral-400">
                  {getFormattedDate(post.date)}
                </small>
              </div>
            </Link>
          ))}
          <Link
            href="/posts"
            className="sm:col-span-1 lg:col-span-2 font-bold text-center rounded p-2 bg-neutral-100"
          >
            ...
          </Link>
        </div>
      </section>
    </TransitionWrapper>
  );
}
