"use client"; // NOTE: This is required!

// use dynamic import
// https://github.com/vercel/next.js/tree/canary/examples/with-mdx-remote

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import Image from "next/image";

type MdxContentProps = {
  source: MDXRemoteSerializeResult;
};

/** Place your custom MDX components here */
const MdxComponents = {
  Img: (props: React.HTMLProps<HTMLDivElement>) => <Image {...props} />,
};

export function MdxContent({ source }: MdxContentProps) {
  return <MDXRemote {...source} components={MdxComponents} />;
}
