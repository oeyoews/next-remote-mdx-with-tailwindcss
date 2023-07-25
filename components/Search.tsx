// https://github.com/vercel/next.js/blob/d68097553730d859a6be91158fc3e489f971ea57/examples/cms-buttercms/pages/blog/search.js#L11
import { getAllPostsMeta } from '@/lib/mdx';

async function Search() {
  const posts = await getAllPostsMeta();
  let titles: string[] = [];
  posts.map(
    (post) => titles.push(post.meta.title),
    // titles.push(post.meta.title)
  );
  return JSON.stringify(titles);
}

export default Search;
