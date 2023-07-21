import { type MDXRemoteSerializeResult } from "next-mdx-remote";
import { readdirSync } from "fs";
import getPost from "@/lib/getPosts";
import Link from "next/link";

type Frontmatter = {
	title: string;
	date: string;
};

type Post<TFrontmatter> = {
	serialized: MDXRemoteSerializeResult;
	frontmatter: TFrontmatter;
};


export default async function ListItems() {
	// Get the list of files in the specified directory
	const mdxFiles = readdirSync("content");

	// Array to store all the posts
	const posts: Array<Post<Frontmatter>> = [];

	// TODO
	// Iterate over each MDX file
	for (const file of mdxFiles) {
		// Get the post data for the current file
		const post = await getPost(`content/${file}`);
		// Add the post to the posts array
		posts.push(post);
	}

	return (
		<>
			<h1 className="font-semibold">Home Page</h1>
			<ul className="list-none">
				{posts.map(({ serialized, frontmatter }) => (
					<li>
						<Link href={`/posts/${frontmatter.title}`}>
							{frontmatter.title}
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}