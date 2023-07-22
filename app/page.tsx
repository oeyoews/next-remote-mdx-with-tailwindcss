import getFormattedDate from "@/lib/getFormatedDate";
import { getAllPostsMeta } from "@/lib/mdx";
import Link from "next/link";

export default async function App() {
  const posts = await getAllPostsMeta()

  return (
    <main>
      <section className="prose prose-md mx-auto rounded max-w-none sm:w-full md:w-1/2 p-4">
        {posts.map(({ meta }) => (
          <div className="mb-4" key={meta.title}>
            <h2 className="capitalize">
              {meta.title}
            </h2>
            <small className="text-neutral-400 mx-2 px-2 font-semibold font-serif">
              {getFormattedDate(meta.date)}
            </small>

            {/* 不支持中文, 无论是filename or title, so use custom slug  */}
            <Link
              href={`/posts/${meta.slug}`} className="no-underline hover:underline text-neutral-700"
            >
              Read More →
            </Link>

            <blockquote className="text-neutral-400 prose-sm mx-2">
              {meta.description}
            </blockquote>
          </div>
        ))
        }
      </section>
    </main>
  )
}