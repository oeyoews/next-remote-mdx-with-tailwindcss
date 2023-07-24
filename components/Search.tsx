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
