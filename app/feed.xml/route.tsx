// https://validator.w3.org/feed/#validate_by_input
import { getAllPosts } from '@/lib/mdx';
import RSS, { FeedOptions } from 'rss';

// TODO content is a obj ???
const domain = process.env.DOMAIN;

export async function GET() {
  const posts = await getAllPosts();

  const feed = new RSS({
    title: process.env.TITLE as string,
    pubDate: new Date(),
    feed_url: `${domain}/feed.xml`,
    site_url: domain as string,
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${domain}/posts/${post.slug}`,
      author: 'oeyoews',
      pubDate: post.date,
    });
  });

  const xml = feed.xml({
    indent: true,
  });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/atom+xml; chatset=utf-8',
    },
  });
}
