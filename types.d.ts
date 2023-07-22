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