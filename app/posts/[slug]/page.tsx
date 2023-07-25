import Link from 'next/link';
import { notFound } from 'next/navigation';

import Gravatar from '@/components/Gravatar';
import { ImageZoom } from '@/components/ImageZoom';
import PassWord from '@/components/PassWord';
import TransitionWrapper from '@/components/TransitionWrapper';
import ProgressBar from '@/components/framer-motion/ProgressBar';

import getFormattedDate from '@/lib/getFormatedDate';
import { getAllPostsMeta } from '@/lib/mdx';

// https://nextjs.org/docs/app/building-your-application/routing/colocation
// https://nextjs.org/docs/app/api-reference/functions/generate-image-metadata
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((post) => ({
    // local md(x) filename without extension
    slug: post.meta.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const originalSlug = decodeURIComponent(slug);
  const posts = await getAllPostsMeta();
  const post = posts.find((post) => post.meta.slug === originalSlug);

  if (!post) {
    return {
      title: `${originalSlug} Post Not Found`,
    };
  }

  return {
    title: post.meta.title,
    description: post.meta?.description,
  };
}

// support click h1 title to scroll top
export default async function Posts({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const originalSlug = decodeURIComponent(slug);
  const posts = await getAllPostsMeta();
  const post = posts.find((post) => post.meta.slug === originalSlug);

  if (!post) {
    notFound();
  }
  const { meta, content } = post;
  const pubDate = getFormattedDate(meta.date);

  const currentIndex = posts.findIndex(
    (post) => post.meta.slug === originalSlug,
  );
  const prevIndex = currentIndex - 1;
  const nextIndex = currentIndex + 1;
  const prevPost = prevIndex >= 0 ? posts[prevIndex] : null;
  const nextPost = nextIndex < posts.length ? posts[nextIndex] : null;
  {
    /* // <main className="prose prose-indigo mx-auto mt-4 mb-0 rounded max-w-none sm:w-full md:w-1/2"> */
  }
  return (
    <TransitionWrapper>
      <article className="md:1/2 prose prose-indigo mx-auto mt-4 p-4 sm:w-full">
        <ProgressBar />
        {/* sticky backdrop-blur-sm hover:cursor-pointer */}
        <h2
          className="my-2 bg-white/30 p-1 text-center capitalize font-serif"
          // onClick={scrollTop}
        >
          {meta.title}
        </h2>
        <div className="not-prose text-center">
          <Gravatar />
          <small className="font-serif text-gray-400">{pubDate}</small>
          {meta.cover && (
            <ImageZoom
              src={meta.cover}
              // placeholder="blur"
              // blurDataURL="https://images.unsplash.com/photo-1690184432588-81068877d852?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=600&q=60"
              alt={meta.title}
              width={1920}
              height={1080}
              className="mt-2 rounded-md"
            />
          )}
        </div>

        <blockquote className="my-2 mb-8 text-slate-400">
          {meta.description}
        </blockquote>

        {meta.password ? (
          <PassWord content={content} originPassword={meta.password} />
        ) : (
          content
        )}
        <hr />
        <div className="flex justify-between items-center">
          <div className="flex">
            {prevPost && (
              <p className="mb-4 text-center">
                <Link href={`/posts/${prevPost.meta.slug}`}>
                  ← {prevPost.meta.title}
                </Link>
              </p>
            )}
          </div>
          <div className="flex">
            {nextPost && (
              <p className="mb-4 text-center">
                <Link href={`/posts/${nextPost.meta.slug}`}>
                  {nextPost.meta.title} →
                </Link>
              </p>
            )}
          </div>
        </div>
      </article>
    </TransitionWrapper>
  );
}
