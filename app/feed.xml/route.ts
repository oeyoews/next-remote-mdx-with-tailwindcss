// https://validator.w3.org/feed/#validate_by_input
import { getAllPosts } from '@/lib/mdx';
import { marked } from 'marked';
import RSS from 'rss';

const renderer = new marked.Renderer();

marked.setOptions({
  gfm: true,
  breaks: true,
  renderer,
});

const renderPost = (md: string) => marked.parse(md);

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
      // TODO content is a obj ???
      description: post.description,
      // maybe sue gray-matter not use remote-mdx's matter
      // description: renderPost(post.content),
      url: `${domain}/posts/${post.slug}`,
      author: 'oeyoews',
      pubDate: post.date,
      categories: ['blog'],
      // custom_elements: [{ content: post.description }],
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
