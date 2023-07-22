import { MdxContent } from "@/app/mdx-content";
import { compileMDX } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostsMeta } from "@/lib/getPosts";
import Link from "next/link";
import { notFound } from 'next/navigation'
import remarkGFM from 'remark-gfm'
import remarkToc from 'remark-toc'
import rehypeSlug from "rehype-slug";
import remarkEmoji from 'remark-emoji'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'


const mdxOptions: {} = {
	remarkPlugins: [remarkGFM, remarkToc, remarkEmoji, remarkMath,],
	rehypePlugins: [rehypeSlug, rehypeKatex],
	format: 'mdx',
}

// https://nextjs.org/docs/app/building-your-application/routing/colocation
// https://nextjs.org/docs/app/api-reference/functions/generate-image-metadata
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
// export async function generateStaticParams() {
// 	const posts = await getAllPosts();
// 	return posts.map((post) => ({
// 		slug: post.frontmatter.title
// 	}))
// }

// export async function generateMetadata({ params }: { params: { slug: string } }) {
// 	const { slug } = params
// 	// must use async await because of mdx serialize
// 	const posts = await getAllPosts();
// 	const post = posts.find((post) => post.frontmatter.title === slug);

// 	if (!post) {
// 		return {
// 			title: `${decodeURIComponent(slug)} Post Not Found`
// 		}
// 	}

// 	return {
// 		title: post.frontmatter.title
// 	}
// }


export default async function Posts({ params }: { params: { slug: string } }) {
	const { slug } = params;
	const decodeSlug = decodeURIComponent(slug)
	const posts = await getAllPosts();
	const { rawFileContent } = posts.find((post) => {
		return 'markdown.md';
	})

	// if (!post) { notFound(); }
	const { frontmatter, content } = await compileMDX<TFrontmatter>({
		source: rawFileContent,
		options: {
			mdxOptions, parseFrontmatter: true
		}
	});

	return (
		<main className="prose mx-auto my-4 rounded max-w-none sm:w-full md:w-1/2 p-4">
			<article>
				<h1 className="capitalize">{frontmatter.title}</h1>
				<small>{frontmatter.date}</small>
				<p className="text-center">{frontmatter.description}</p>
				{content}
				{/* {<MdxContent source={content} />} */}
				<p className="flex justify-end items-end">
					<Link href="/" className="no-underline hover:underline">← Back to Home</Link>
				</p>
			</article>
		</main>
	);
}
