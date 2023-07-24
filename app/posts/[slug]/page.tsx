import getFormattedDate from "@/lib/getFormatedDate";
import { getAllPostsMeta } from "@/lib/mdx";
import Link from "next/link";
import { notFound } from 'next/navigation'
import Gravatar from "@/components/Gravatar";
import { ImageZoom } from "@/components/ImageZoom";
import scrollTop from "@/lib/scrollTop";
import PassWord from "@/components/PassWord";
import ProgressBar from "@/components/ProgressBar";


// https://nextjs.org/docs/app/building-your-application/routing/colocation
// https://nextjs.org/docs/app/api-reference/functions/generate-image-metadata
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {
	const posts = await getAllPostsMeta();
	return posts.map((post) => ({
		// local md(x) filename without extension
		slug: post.meta.slug
	}))
}


export async function generateMetadata({ params }: { params: { slug: string } }) {
	const { slug } = params
	const originalSlug = decodeURIComponent(slug)
	const posts = await getAllPostsMeta();
	const post = posts.find((post) => post.meta.slug === originalSlug);

	if (!post) {
		return {
			title: `${originalSlug} Post Not Found`
		}
	}

	return {
		title: post.meta.title,
		description: post.meta?.description
	}
}

// support click h1 title to scroll top
export default async function Posts({ params }: { params: { slug: string } }) {
	const { slug } = params;
	const originalSlug = decodeURIComponent(slug)
	const posts = await getAllPostsMeta();
	const post = posts.find((post) => post.meta.slug === originalSlug);
	if (!post) { notFound(); }
	const { meta, content } = post
	const pubDate = getFormattedDate(meta.date)
	return (
		// <main className="prose prose-indigo mx-auto mt-4 mb-0 rounded max-w-none sm:w-full md:w-1/2">
		<article className="prose prose-indigo mx-auto mt-4 sm:w-full md:1/2">
			<ProgressBar />
			{/* sticky backdrop-blur-sm */}
			<h2 className="capitalize top-0.5 bg-white/30 p-1 text-center hover:cursor-pointer my-2" onClick={scrollTop}>{meta.title}</h2>
			<div className="text-center not-prose">
				<Gravatar />
				<small className="font-serif text-gray-400">
					{pubDate}
				</small>
				{meta.cover && <ImageZoom src={meta.cover} alt={meta.title} width={1920} height={1080} className="rounded-md mt-2" />}
			</div>

			<blockquote className="my-2 text-slate-400 mb-8">
				{meta.description}
			</blockquote>

			{meta.password ? <PassWord content={content} originPassword={meta.password} /> : content}
			<p className="flex justify-end items-end mt-16 mb-8">
				<Link href="/">← Back to Home</Link>
			</p>
		</article>
	);
}
