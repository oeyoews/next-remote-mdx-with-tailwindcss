interface PostNavigationProps {
  prevPost: Post;
  nextPost: Post;
}

interface TMetaOptions {
  title: string;
  date: string;
}

interface TMetaAdditionialOptions {
  description: string;
  cover: string;
  coverAlt: string;
  slug: string;
  tags: string[];
  draft: boolean;
  password: string | number;
  fixed: boolean;
}

type TFrontmatter = TMetaOptions & Partial<TMetaAdditionialOptions>;

interface Post {
  meta: TFrontmatter;
  content: any;
}

interface PassWord {
  title: string;
  originPassword: string | number;
  content: any;
}
