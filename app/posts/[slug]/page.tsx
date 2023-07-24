import Link from 'next/link';
import { notFound } from 'next/navigation';

import Gravatar from '@/components/Gravatar';
import { ImageZoom } from '@/components/ImageZoom';
import PassWord from '@/components/PassWord';
import ProgressBar from '@/components/ProgressBar';

import getFormattedDate from '@/lib/getFormatedDate';
import { getAllPostsMeta } from '@/lib/mdx';
import scrollTop from '@/lib/scrollTop';

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
  return (
    // <main className="prose prose-indigo mx-auto mt-4 mb-0 rounded max-w-none sm:w-full md:w-1/2">
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
            alt={meta.coverAlt}
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
      <p className="mb-8 mt-16 flex items-end justify-end">
        <Link href="/">← Back to Home</Link>
      </p>
    </article>
  );
}
