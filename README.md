## README

- Next13, Tailwindcss, next-mdx-remote, og:image

## Feature

- [x] 支持方向键查看下篇文章
- [x] 每篇文章支持设置密码
- [x] 支持 md 和 mdx 文章
- [x] 支持草稿模式,和文章置顶
- [x] support rss

## Preview

https://next-remote-mdx-with-tailwindcss.vercel.app

## NOTE

* kv and compiled mdx page is conflict
<!-- * codeblock on dev is very slow for ui -->

## TODO

- [ ] add deploy button
- [ ] 7/21 写一个时间组件
- [ ] support backtotop
- [ ] 渐进式呈现元素 with framer-motion
- [ ] 分页 paging
- [x] support password
<!-- * og: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image -->

* og not support cn name now
* full context search
* next auth (sites)
* support sweetalert2
* support codeblock title
* support sidebar maybe with framer-motion
* use next-themes
* support loading splash screen
* support pwa
* [x] use next-mdx-remote rsc
* [x] only load mdx files
* 可折叠toc https://github.com/Rokt33r/remark-collapse
* better toc https://github.com/gaoxiu333/next-blog-template/blob/main/components/Articles/ArticleTableOfContens/ArticleTableOfContens.tsx
* support reading time
* mdx-bundler
  https://github.com/gaoxiu333/next-blog-template

- [ ] support slug
- [ ] not found page
      rss parser
      https://github.com/mdx-js/mdx/blob/8a563128a346a637dfe6bc83df55f069947d2337/website/post.js#L8

* support highlight code
* [x] zoom image
* https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
* support meta
* support meta
* 支持递归 [...slug]
* local image ref
* toc
* callout
* title support whitespace
* https://formidable.com/open-source/react-live/
* i18n
* https://nextjs.org/docs/app/building-your-application/routing/internationalization

## links

- https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
- support html in mdx file
- use daysiui

## Why not use contentlayer

because of this error on my computer, so weired to use contentlayer

```
next@13.4.10_@opentelemetry+api@1.4.1_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/jest-worker/processChild.js
```
