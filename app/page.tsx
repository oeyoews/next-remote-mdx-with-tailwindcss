import { type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { promises as fs, readdirSync } from "fs";
import { MdxContent } from "./mdx-content";

type Frontmatter = {
  title: string;
  date: string;
};

type Post<TFrontmatter> = {
  serialized: MDXRemoteSerializeResult;
  frontmatter: TFrontmatter;
};

async function getPost(filepath: string): Promise<Post<Frontmatter>> {
  // Read the file from the filesystem
  const raw = await fs.readFile(filepath, "utf-8");

  // Serialize the MDX content and parse the frontmatter
  const serialized = await serialize(raw, {
    parseFrontmatter: true,
  });

  // Typecast the frontmatter to the correct type
  const frontmatter = serialized.frontmatter as Frontmatter;

  // Return the serialized content and frontmatter
  return {
    frontmatter,
    serialized,
  };
}

export default async function Home() {
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
    <main>
      <section className="bg-neutral-100 prose mx-auto my-4 p-4 rounded max-w-none sm:w-full md:w-2/3">
        {posts.map(({ serialized, frontmatter }) => (
          <article key={frontmatter.title}>
            <h1>{frontmatter.title}</h1>
            <p>Published {frontmatter.date}</p>
            <hr />
            <MdxContent source={serialized} />
            <hr />
          </article>
        ))}
      </section>
    </main>
  );
}
