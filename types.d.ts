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
