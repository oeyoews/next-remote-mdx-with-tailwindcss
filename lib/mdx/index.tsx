import fs, { readdirSync } from "fs";
import { compileMDX } from 'next-mdx-remote/rsc'
import path from "path";
import remarkGFM from 'remark-gfm'
import remarkToc from 'remark-toc'
import rehypeSlug from "rehype-slug";
import remarkEmoji from 'remark-emoji'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import mdxCustomComponents from "@/components/MdxComponents";

// https://github.com/kfirfitousi/blog/blob/4169a4268764a46ba61e6ea5ed51e459a73926e5/contentlayer.config.ts#L7


// TODO config option
const rootDirectory = path.join(process.cwd(), 'content')

const mdxOptions: {} = {
	remarkPlugins: [remarkGFM, [remarkToc, {
		ordered: true,
		tight: true,
		heading: "TOC",
		maxDepth: 3
	}], remarkEmoji, remarkMath,],
	rehypePlugins: [rehypeSlug, rehypeKatex, rehypeHighlight],
	format: 'mdx',
}

// 不要主动调用这个函数, 在没有检查文件是否存在的情况下
export async function getPostsBySlug(fileName: string) {
	// support md, mdx
	const realSlug = fileName.replace(/\.mdx?$/, '');
	const filePath = path.join(rootDirectory, fileName)
	const rawFileContent = fs.readFileSync(filePath, "utf-8");

	const { frontmatter, content } = await compileMDX<TFrontmatter>({
		source: rawFileContent,
		options: { parseFrontmatter: true, mdxOptions },
		components: mdxCustomComponents
	})

	return {
		meta: { ...frontmatter, slug: realSlug },
		content,
	};
}

export async function getAllPostsMeta() {

	const MARKDOWN_PATH = process.env.MARKDOWN_PATH as string
	const mdxFiles = readdirSync(MARKDOWN_PATH);
	const posts = []

	for (const file of mdxFiles) {
		const ext = path.extname(file)
		if (ext === '.mdx' || ext === '.md') {
			const post = await getPostsBySlug(file);
			posts.push(post);
		}
	}
	posts.sort((a, b) => b.meta.date.localeCompare(a.meta.date));

	// 置顶文章
	const pinnedPosts = posts.filter((post) => post.meta.fixed);
	if (pinnedPosts.length > 0) {
		const nonPinnedPosts = posts.filter((post) => !post.meta.fixed);
		return [...pinnedPosts, ...nonPinnedPosts];
	}

	return posts;
}