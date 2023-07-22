import fs, { readdirSync } from "fs";
import path from "path";
import { type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGFM from 'remark-gfm'
import remarkToc from 'remark-toc'
import rehypeSlug from "rehype-slug";
// https://github.com/kfirfitousi/blog/blob/4169a4268764a46ba61e6ea5ed51e459a73926e5/contentlayer.config.ts#L7

type TFrontmatter = {
	// Define the structure of your frontmatter here
	title: string;
	// toDO not double quote
	date: string;
	description?: string;
	cover?: string;
	slug?: string;
};

type Post = {
	contentHtml: MDXRemoteSerializeResult;
	frontmatter: TFrontmatter;
};

// TODO config option
const rootDirectory = path.join(process.cwd(), 'content')

export async function getPost(fileName: string) {
	// TODO: why filename have default .mdx
	// Read the file from the filesystem
	fileName = fileName.replace(/\.mdx$/, '');
	const filePath = path.join(rootDirectory, `${fileName}.mdx`)
	const rawFileContent = fs.readFileSync(filePath, "utf-8");

	// Serialize the MDX content and parse the frontmatter
	// must use promise await
	const contentHtml = await serialize(rawFileContent, {
		parseFrontmatter: true,
		mdxOptions: {
			remarkPlugins: [remarkGFM, remarkToc],
			rehypePlugins: [
				// rehypePrettyCode
				// rehypeAutolinkHeadings,
				rehypeSlug
			],
			format: 'mdx',
		},
	});

	// Typecast the frontmatter to the correct type
	const frontmatter = contentHtml.frontmatter as TFrontmatter;

	// Return the serialized content and frontmatter
	return {
		frontmatter,
		contentHtml,
	};
}

export async function getAllPosts() {
	const mdxFiles = readdirSync("content");
	const posts: Array<Post> = [];

	// await Promise.all(
	// 	mdxFiles.map(async (file) => {
	// 		const post = await getPost(file);
	// 		posts.push(post);
	// 	})
	// )
	for (const file of mdxFiles) {
		const post = await getPost(file);
		posts.push(post);
	}
	return posts
}