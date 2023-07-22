import { CompileMdx } from "@/app/mdx-content";
import { getAllPosts } from "@/lib/getPosts";
import Link from "next/link";
import { notFound } from 'next/navigation'

// TODO
// export async function generateStaticParams() {
// 	const posts = await getAllPosts();
// 	return posts.map((post) => ({
// 		slug: post.frontmatter.title
// 	}))
// }

export async function generateMetadata({ params }: { params: { slug: string } }) {
	const { slug } = params
	// must use async await because of mdx serialize
	const posts = await getAllPosts();
	const post = posts.find((post) => post.frontmatter.title === slug);

	if (!post) {
		return {
			title: `${slug} Post Not Found`
		}
	}

	return {
		title: post.frontmatter.title
	}
}


export default async function Posts({ params }: { params: { slug: string } }) {
	const { slug } = params;
	const posts = await getAllPosts();
	const post = posts.find((post) => post.frontmatter.title === slug);

	if (!post) { notFound(); }

	return (
		<main className="bg-neutral-100 prose mx-auto my-4 rounded max-w-none sm:w-full md:w-2/3 p-4">
			<article>
				<h1 className="capitalize">{slug}</h1>
				<small>{post.frontmatter.date}</small>
				<p className="text-center">{post.frontmatter.description}</p>
				<CompileMdx source={post.contentHtml} />
				<p className="flex justify-end items-end">
					<Link href="/">Back to Home</Link>
				</p>
			</article>
		</main>
	);
}
