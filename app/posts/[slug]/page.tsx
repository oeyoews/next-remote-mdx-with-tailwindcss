import { FiEye } from 'react-icons/fi';

import { notFound } from 'next/navigation';

import Gravatar from '@/components/Gravatar';
import Hitokoto from '@/components/Hitokoto';
import KeyboardNavigation from '@/components/KeyboardNavigation';
import PassWord from '@/components/PassWord';
import PostNavigation from '@/components/PostNav';
import TransitionWrapper from '@/components/TransitionWrapper';

import getFormattedDate from '@/lib/getFormatedDate';
import { getAllPosts } from '@/lib/mdx';
import { kv } from '@vercel/kv';

// https://nextjs.org/docs/app/building-your-application/routing/colocation
// https://nextjs.org/docs/app/api-reference/functions/generate-image-metadata
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    // local md(x) filename without extension
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const originalSlug = decodeURIComponent(slug);
  const posts = await getAllPosts();
  const post = posts.find((post) => post.slug === originalSlug);
  // console.log(JSON.stringify(post, null, 2));

  if (!post) {
    return {
      title: `${originalSlug} Post Not Found`,
    };
  }

  return {
    title: post.title || post.slug,
    description: post.description,
  };
}

// support click h1 title to scroll top
export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const originalSlug = decodeURIComponent(slug);
  const posts = await getAllPosts();
  // support chinese key steps
  const post = posts.find((post) => post.slug === originalSlug);

  if (!post) {
    notFound();
  }

  let views;
  // if (process.env.NODE_ENV === 'production') {
  // views = await kv.get<kvOptions>(slug);
  // await kv.set(slug, {
  //   slug,
  //   quantity: views?.quantity ? views.quantity + 1 : 1,
  // });
  // // }

  // {total: {quantity: 1}}
  // {slug: {quantity: 1}}

  // views = await kv.get<kvOptions>('total');
  // await kv.set('total', {
  //   total: 'total',
  //   quantity: views?.quantity ? views.quantity + 1 : 1,
  // });

  // views = await kv.get<kvOptions>('total');

  const pubDate = getFormattedDate(post.date);

  const currentIndex = posts.findIndex((post) => post.slug === originalSlug);
  const firstPost = posts[0];
  const lastPost = posts[posts.length - 1];

  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : lastPost;
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : firstPost;

  return (
    <TransitionWrapper>
      <KeyboardNavigation prevPost={prevPost} nextPost={nextPost} />

      <article className="prose mx-auto mt-4 p-4 max-w-3xl">
        <h2 className="my-2 bg-white/30 p-1 text-center capitalize font-serif">
          {post.title || post.slug}
        </h2>
        <div className="not-prose text-center">
          <Gravatar />
          <small className="font-serif text-gray-400">
            {pubDate}
            {/* <FiEye className="inline ml-2 mr-1" /> views: {views?.quantity} */}
          </small>
        </div>
        {post.description && (
          <blockquote className="my-2 mb-8 text-slate-700">
            {post.description}
          </blockquote>
        )}
        {post.password ? (
          <PassWord
            content={post.content}
            originPassword={post.password}
            title={post.title || post.slug}
          />
        ) : (
          post.content
        )}
        <Hitokoto />
        <hr />
        <PostNavigation prevPost={prevPost} nextPost={nextPost} />
      </article>
    </TransitionWrapper>
  );
}
