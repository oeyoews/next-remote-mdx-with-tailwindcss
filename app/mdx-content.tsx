"use client"; // NOTE: This is required!

// use dynamic import
// https://github.com/vercel/next.js/tree/canary/examples/with-mdx-remote

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { ImageZoom } from "@/components/ImageZoom";
import { JSX } from "react";

/** Place your custom MDX components here */
const components = {
  Img: (props: {}) => <ImageZoom {...props} />,
};

export function MdxContent(props: JSX.IntrinsicAttributes & MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}