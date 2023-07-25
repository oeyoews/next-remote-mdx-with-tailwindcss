import { notFound } from 'next/navigation';

import Gravatar from '@/components/Gravatar';
import { ImageZoom } from '@/components/ImageZoom';
import KeyboardNavigation from '@/components/KeyboardNavigation';
import PassWord from '@/components/PassWord';
import PostNavigation from '@/components/PostNav';
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
export default async function Post({ params }: { params: { slug: string } }) {
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

  // 循环
  const firstPost = posts[0];
  const lastPost = posts[posts.length - 1];
  const prevPost = prevIndex >= 0 ? posts[prevIndex] : lastPost;
  const nextPost = nextIndex < posts.length ? posts[nextIndex] : firstPost;

  {
    /* // <main className="prose prose-indigo mx-auto mt-4 mb-0 rounded max-w-none sm:w-full md:w-1/2"> */
  }
  return (
    <TransitionWrapper>
      <KeyboardNavigation prevPost={prevPost} nextPost={nextPost} />
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
              width={1920}
              height={1080}
              alt={meta.title}
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
        <PostNavigation prevPost={prevPost} nextPost={nextPost} />
      </article>
    </TransitionWrapper>
  );
}
