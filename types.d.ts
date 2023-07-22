type TFrontmatter = {
	title: string;
	date: string;
	description?: string;
	cover?: string;
	slug?: string;
	tags?: string[]
};

type Post = {
	contentHtml: MDXRemoteSerializeResult;
	frontmatter: TFrontmatter;
};