import getFormattedDate from "@/lib/getFormatedDate";
import { getAllPostsMeta } from "@/lib/mdx";
import Link from "next/link";
import Gravatar from "@/components/Gravatar";

export default async function App() {
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
    <main>
      <section className="mx-auto sm:w-full md:w-1/2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mx-2">
          {posts.map(({ meta }) => (
            <Link
              href={`/posts/${meta.slug}`} className="no-underline text-neutral-700" key={meta.slug}
            >
              <div className="border border-slate-300 px-6 py-4 rounded-md shadow-sm bg-white  hover:bg-neutral-200 transition duration-300 hover:cursor-pointer" >
                <h2 className="capitalize font-semibold font-serif">{meta.title}
                </h2>
                <div>
                  <Gravatar />
                  <small className="text-neutral-400 ml-0 mr-2 px-2 font-semibold font-serif inline">
                    {getFormattedDate(meta.date)}
                  </small>
                </div>
              </div>
            </Link>
          ))}

        </div>
      </section>
    </main>
  )
}