import { compileMDX } from 'next-mdx-remote/rsc';

import mdxCustomComponents from '@/components/MdxComponents';

import getFormattedDate from '../getFormatedDate';

import fs, { readdirSync } from 'fs';
import path from 'path';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkEmoji from 'remark-emoji';
import remarkGFM from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';

// https://github.com/kfirfitousi/blog/blob/4169a4268764a46ba61e6ea5ed51e459a73926e5/contentlayer.config.ts#L7

// TODO config option
const rootDirectory = path.join(process.cwd(), 'content');

const mdxOptions: {} = {
  remarkPlugins: [
    remarkGFM,
    [
      remarkToc,
      {
        ordered: true,
        tight: true,
        heading: 'TOC',
        maxDepth: 3,
      },
    ],
    remarkEmoji,
    remarkMath,
  ],
  rehypePlugins: [
    rehypeSlug,
    rehypeKatex,
    // this code is a bug for kv about md(x) page
    [
      rehypePrettyCode,
      {
        theme: 'one-dark-pro',
        // theme: {
        // 	dark: 'one-dark-pro',
        // 	light: 'one-dark-pro'
        // },
        keepBackground: false,
      },
    ],
  ],
  format: 'mdx',
};

// 不要主动调用这个函数, 在没有检查文件是否存在的情况下
export async function getPostBySlug(fileName: string) {
  // support md, mdx
  const realSlug = fileName.replace(/\.mdx?$/, '');
  const filePath = path.join(rootDirectory, fileName);

  // if (!fs.existsSync(filePath)) {
  //   return null;
  // }

  const rawFileContent = fs.readFileSync(filePath, 'utf-8');

  // content 是一个对象, html 是如何处理的呢
  const { frontmatter, content } = await compileMDX<TFrontmatter>({
    source: rawFileContent,
    options: { parseFrontmatter: true, mdxOptions },
    components: mdxCustomComponents,
  });

  frontmatter.date = getFormattedDate(frontmatter.date);
  const post = {
    // meta: { ...frontmatter, slug: realSlug },
    ...frontmatter,
    slug: realSlug,
    content,
  };

  return post;
}

export async function getAllPosts() {
  const MARKDOWN_PATH = process.env.MARKDOWN_PATH as string;
  const mdxFileDirectory = readdirSync(MARKDOWN_PATH);

  // if (!fs.existsSync(mdxFileDirectory as any)) {
  //   return null;
  // }

  let posts = [];

  for (const file of mdxFileDirectory) {
    const ext = path.extname(file);
    if (ext === '.mdx' || ext === '.md') {
      const post = await getPostBySlug(file);
      // 判断是否包含draft字段，如果包含则跳过当前文章
      if (post.draft) {
        continue;
      }
      posts.push(post);
    }
  }

  function sortByRules(posts: TFrontmatter[]) {
    let fixedPosts = posts.filter((post) => post.fixed === true);
    // 此刻时间还没有进行验证, 是按照字符串比较的
    let datePosts = posts.filter((post) => !post.fixed && post.date);
    const noDatePost = posts.filter((post) => !post.date && !post.fixed);

    fixedPosts.sort((a, b) => b.date.localeCompare(a.date));

    datePosts.sort((a, b) => b.date.localeCompare(a.date));

    posts = [...fixedPosts, ...datePosts, ...noDatePost];
    // posts = [...datePosts];
    return posts;
  }

  return sortByRules(posts);
}

// promise return bug
export async function getExistPostBySlug(slug: string) {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}
