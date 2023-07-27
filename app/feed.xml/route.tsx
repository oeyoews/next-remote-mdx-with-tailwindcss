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
      url: `${domain}/${post.slug}`,
      author: 'oeyoews', // optional - defaults to feed author property
      pubDate: new Date(post.date), // any format that js Date can parse.
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
