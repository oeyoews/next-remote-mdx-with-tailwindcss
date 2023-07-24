import LqipImage from "@/components/LqipImage";
import getFormattedDate from "@/lib/getFormatedDate";
import { getAllPostsMeta } from "@/lib/mdx";
import Link from "next/link";

export default async function AllPostsListItem() {
  const posts = await getAllPostsMeta()
  if (!posts.length) {
    return (
      <main>
        <h1>Posts</h1>
        <section className="prose prose-md mx-auto rounded max-w-none sm:w-full md:w-1/2 p-4 max-h-screen">
          <h1>Posts is empty </h1>
        </section>
      </main>
    )
  }

  return (
    <section className="mx-auto sm:w-full md:w-1/2 mt-12">
      <LqipImage src="/next.svg" alt="Next.js Logo" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mx-2">
        {posts.map(({ meta }) => (
          <Link
            href={`/posts/${meta.slug}`} className="hover:no-underline text-neutral-700" key={meta.slug}
          >
            <div className="border border-neutral-200 px-6 py-4 rounded-md shadow-sm bg-white  hover:bg-neutral-200 transition duration-300 hover:cursor-pointer" >
              <h2 className="capitalize font-semibold font-serif truncate">{meta.title}
              </h2>
              <small className="text-neutral-400 mr-2 py-2 font-semibold font-serif inline">
                {getFormattedDate(meta.date)}
              </small>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}