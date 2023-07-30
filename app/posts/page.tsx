import Link from 'next/link';

import getFormattedDate from '@/lib/getFormatedDate';
import { getAllPosts } from '@/lib/mdx';

export default async function AllPostsListItem() {
  const posts = await getAllPosts();
  const totalPosts = posts.length;

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
    <section className="mx-auto mt-12 max-w-3xl">
      <div className="mx-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {posts.map((post, index) => (
          <Link
            href={`/posts/${post.slug}`}
            // className="text-neutral-700 hover:!no-underline group"
            className={`text-neutral-700 hover:!no-underline group ${
              index === 0 && post.fixed ? 'lg:col-span-2 lg:text-center' : ''
            }`}
            key={post.slug}
          >
            {/* <div className="rounded-md border border-neutral-200 bg-white px-6 py-4 shadow-sm  transition duration-300 hover:cursor-pointer hover:bg-neutral-200 text-xl hover:scale-105 hover:shadow-md group-[]"> */}
            <div
              className={`rounded-md border border-neutral-200 bg-white px-6 py-4 shadow-sm transition duration-300 hover:cursor-pointer hover:bg-neutral-200 text-xl hover:scale-105 hover:shadow-md ${
                index === 0 && post.fixed ? 'lg:col-span-2' : ''
              }`}
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
      </div>
      <div className="text-center mt-8 text-neutral-600 font-serif">
        You have
        <span className="font-bold mx-1">{totalPosts}</span>
        posts and updated {new Date().toLocaleDateString()} 🚀
      </div>
    </section>
  );
}
