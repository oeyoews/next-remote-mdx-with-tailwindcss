import Link from 'next/link';

import getFormattedDate from '@/lib/getFormatedDate';
import { getAllPostsMeta } from '@/lib/mdx';

export default async function AllPostsListItem() {
  const posts = await getAllPostsMeta();
  if (!posts.length) {
    return (
      <main>
        <h1>Posts</h1>
        <section className="prose-md prose mx-auto max-h-screen max-w-none rounded p-4 sm:w-full md:w-1/2">
          <h1>Posts is empty </h1>
        </section>
      </main>
    );
  }

  return (
    <section className="mx-auto mt-12 sm:w-full md:w-1/2">
      <div className="mx-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {posts.map(({ meta }) => (
          <Link
            href={`/posts/${meta.slug}`}
            className="text-neutral-700 hover:!no-underline group"
            key={meta.slug}
          >
            <div className="rounded-md border border-neutral-200 bg-white px-6 py-4 shadow-sm  transition duration-300 hover:cursor-pointer hover:bg-neutral-200 text-xl hover:scale-105 hover:shadow-md group-[]">
              <h2 className="truncate font-semibold capitalize">
                {meta.title} <span className="font-bold">→</span>
              </h2>
              <small className="mr-2 inline py-2 font-serif font-semibold text-neutral-400">
                {getFormattedDate(meta.date)}
              </small>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
