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

  const { frontmatter, content } = await compileMDX<TFrontmatter>({
    source: rawFileContent,
    options: { parseFrontmatter: true, mdxOptions },
    components: mdxCustomComponents,
  });

  frontmatter.date = getFormattedDate(frontmatter.date);
  const post: Post = {
    meta: { ...frontmatter, slug: realSlug },
    content,
  };

  return post;
}

export async function getAllPostsMeta() {
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
      if (post.meta.draft) {
        continue;
      }
      posts.push(post);
    }
  }

  /* const posts = [ { meta: { date: '', fixed: false }, content: '' } ] */

  function sortByRules(posts: Array<Post>) {
    let fixedPosts = posts.filter(({ meta }) => meta.fixed === true);
    // 此刻时间还没有进行验证, 是按照字符串比较的
    let datePosts = posts.filter(({ meta }) => !meta.fixed && meta.date);
    const noDatePost = posts.filter(({ meta }) => !meta.date && !meta.fixed);

    fixedPosts.sort((a, b) => b.meta.date.localeCompare(a.meta.date));

    datePosts.sort((a, b) => b.meta.date.localeCompare(a.meta.date));

    posts = [...fixedPosts, ...datePosts, ...noDatePost];
    // posts = [...noDatePost];
    return posts;
  }

  return sortByRules(posts);
}

// promise return bug
export async function getExistPostBySlug(slug: string) {
  const posts = await getAllPostsMeta();
  return posts.find((post) => post.meta.slug === slug) || null;
}
