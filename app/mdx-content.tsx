"use client"; // NOTE: This is required!

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

type MdxContentProps = {
  source: MDXRemoteSerializeResult;
};

/** Place your custom MDX components here */
const MdxComponents = {
  /** h1 colored in yellow */
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => <h1 {...props} />,
  /** Card component */
  Card: (props: React.HTMLProps<HTMLDivElement>) => (
    <div className="bg-neutral-100 shadow-md p-2 my-2" {...props} />
  ),
};

export function MdxContent({ source }: MdxContentProps) {
  return <MDXRemote {...source} components={MdxComponents} />;
}
