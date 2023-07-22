import { getAllPosts } from "@/lib/getPosts";
import Link from "next/link";

export default async function App() {
  const posts = await getAllPosts()

  return (
    <main>
      <section className="prose prose-md mx-auto rounded max-w-none sm:w-full md:w-1/2 p-4">
        {posts.map(({ frontmatter }) => (
          <div className="mb-4 " key={frontmatter.title}>
            <h2 className="capitalize">
              {frontmatter.title}
            </h2>
            <small className="text-neutral-400 mx-2 px-2 font-semibold font-serif">
              {frontmatter.date}
            </small>

            <Link
              href={`/posts/${frontmatter.title}`} className="no-underline hover:underline text-neutral-700"
            >
              Read More →
            </Link>

            <blockquote className="text-neutral-400 prose-sm mx-2">
              {frontmatter.description}
            </blockquote>
          </div>
        ))
        }
      </section>
    </main>
  )
}