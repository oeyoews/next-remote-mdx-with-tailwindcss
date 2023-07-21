import { MdxContent } from "@/app/mdx-content";
import { getAllPosts } from "@/lib/getPosts";
import Link from "next/link";
import { notFound } from 'next/navigation'


export default async function Posts({ params }: { params: { slug: string } }) {
	const { slug } = params;
	const posts = await getAllPosts();
	const post = posts.find((post) => post.frontmatter.title === slug);

	if (!post) {
		notFound();
	}

	return (
		<main className="bg-neutral-100 prose mx-auto my-4 rounded max-w-none sm:w-full md:w-2/3 p-4">
			<article>
				<h1 className="capitalize">{post.frontmatter.title}</h1>
				<p className="text-center">{post.frontmatter.date}</p>
				<p className="text-center">{post.frontmatter.description}</p>
				<MdxContent source={post.contentHtml} />
				<p className="flex justify-end items-end">
					<Link href="/">Back to Home</Link>
				</p>
			</article>
		</main>
	);
}
