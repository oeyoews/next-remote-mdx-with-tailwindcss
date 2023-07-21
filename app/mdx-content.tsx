"use client"; // NOTE: This is required!

// use dynamic import
// https://github.com/vercel/next.js/tree/canary/examples/with-mdx-remote

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { ImageZoom } from "@/components/ImageZoom";
import { ZoomOptions } from "medium-zoom";
import { JSX, ClassAttributes, ImgHTMLAttributes } from "react";

type MdxContentProps = {
  source: MDXRemoteSerializeResult;
};

/** Place your custom MDX components here */
const MdxComponents = {
  Img: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLImageElement> & ImgHTMLAttributes<HTMLImageElement> & { options?: ZoomOptions | undefined; }) => <ImageZoom {...props} />,
};

export function MdxContent({ source }: MdxContentProps) {
  return <MDXRemote {...source} components={MdxComponents} />;
}
