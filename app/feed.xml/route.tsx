// https://validator.w3.org/feed/#validate_by_input
import { getAllPosts } from '@/lib/mdx';
// import { Feed } from 'feed';
import RSS, { FeedOptions } from 'rss';

export async function GET() {
  const posts = await getAllPosts();

  const feed = new RSS({
    title: 'blog',
    pubDate: new Date(),
    feed_url: 'https://github.com/feed.xml',
    site_url: 'https://github.com',
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `https://github.com${post.slug}`,
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
