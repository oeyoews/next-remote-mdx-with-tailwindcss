interface PostNavigationProps {
  prevPost: Post;
  nextPost: Post;
}

interface TMetaOptions {
  title?: string;
  date?: any;
}

interface TMetaAdditionialOptions {
  description: string;
  cover: string;
  coverAlt: string;
  slug: any;
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
  title: string | undefined;
  originPassword: string | number;
  content: any;
}
