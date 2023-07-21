import { promises as fs, readdirSync } from "fs";
import path from "path";
import { type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

type Frontmatter = {
	// Define the structure of your frontmatter here
	title: string;
	date: string;
	description?: string;
	cover?: string;
	slug?: string;
};

type Post = {
	contentHtml: MDXRemoteSerializeResult;
	frontmatter: Frontmatter;
};

const rootDirectory = path.join(process.cwd(), 'content')

export async function getPost(fileName: string): Promise<Post> {
	// Read the file from the filesystem
	const filePath = path.join(rootDirectory, `${fileName}`)
	const rawFileContent = await fs.readFile(filePath, "utf-8");

	// Serialize the MDX content and parse the frontmatter
	const contentHtml = await serialize(rawFileContent, {
		parseFrontmatter: true,
	});

	// Typecast the frontmatter to the correct type
	const frontmatter = contentHtml.frontmatter as Frontmatter;

	// Return the serialized content and frontmatter
	return {
		frontmatter,
		contentHtml,
	};
}

export async function getAllPosts() {
	// Get the list of files in the specified directory
	const mdxFiles = readdirSync("content");
	// Array to store all the posts
	const posts: Array<Post> = [];
	// TODO
	// Iterate over each MDX file
	for (const file of mdxFiles) {
		// Get the post data for the current file
		const post = await getPost(`${file}`);
		// Add the post to the posts array
		posts.push(post);
	}
	return posts
}