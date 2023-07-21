import { getAllPosts } from "@/lib/getPosts";
import Link from "next/link";

export default async function App() {
  const posts = await getAllPosts()

  return (
    <main>
      <section className="bg-neutral-100 prose mx-auto mt-16 rounded max-w-none sm:w-full md:w-1/2 p-4">
        <ul className="list-none">
          {posts.map(({ frontmatter }) => (
            <li>
              <Link
                href={`/posts/${frontmatter.title}`} className="capitalize"
              >
                {frontmatter.title}
              </Link>
            </li>
          ))
          }</ul>
      </section>
    </main>
  )
}