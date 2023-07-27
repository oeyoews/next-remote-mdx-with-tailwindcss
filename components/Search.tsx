'use client';

// 不允许在客户端使用server 组件
// https://github.com/vercel/next.js/blob/d68097553730d859a6be91158fc3e489f971ea57/examples/cms-buttercms/pages/blog/search.js#L11
import React, { ChangeEvent, useState } from 'react';

import { getAllPosts } from '@/lib/mdx';

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<TFrontmatter[]>([]);

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);

    // 调用获取所有文章元数据的函数
    const allPosts = await getAllPosts();

    // 进行搜索
    const filteredResults = allPosts.filter((post) =>
      post.title.toLowerCase().includes(keyword.toLowerCase()),
    );

    setSearchResults(filteredResults as any);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearch} />
      <ul>
        {searchResults.map((meta) => (
          <li key={meta.slug}>
            <a href={`/posts/${meta.slug}`}>{meta.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
