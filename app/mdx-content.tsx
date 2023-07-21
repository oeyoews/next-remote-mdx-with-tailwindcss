"use client"; // NOTE: This is required!

// use dynamic import
// https://github.com/vercel/next.js/tree/canary/examples/with-mdx-remote

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { ImageZoom } from "@/components/ImageZoom";

type MdxContentProps = {
  source: MDXRemoteSerializeResult;
};

/** Place your custom MDX components here */
const MdxComponents = {
  Img: (props: {}) => <ImageZoom {...props} />,
};

export function MdxContent({ source }: MdxContentProps) {
  return <MDXRemote {...source} components={MdxComponents} />;
}
