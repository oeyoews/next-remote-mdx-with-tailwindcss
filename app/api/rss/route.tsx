import { getAllPostsMeta } from '@/lib/mdx';
import RSS from 'rss';

export async function GET() {
  const metadata = await getAllPostsMeta();

  const feed = new RSS({
    title: metadata.title || '',
    description: metadata.description,
    site_url: metadata.url,
    feed_url: `${metadata.url}/feed.xml`,
    copyright: `${new Date().getFullYear()} ${metadata.title}`,
    language: metadata.language,
    pubDate: new Date(),
  });

  posts.slice(0, MAX_POSTS).map((post) => {
    feed.item({
      title: post.title,
      guid: `${metadata.url}${post.uri}`,
      url: `${metadata.url}${post.uri}`,
      date: post.date,
      description: post.excerpt,
      author: post.author.name,
      categories: post.categories.map(({ name }) => name) || [],
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}
