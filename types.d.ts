type TFrontmatter = {
  title: string;
  date: string;
  description?: string;
  cover?: string;
  coverAlt: string;
  slug?: string;
  tags?: string[];
  draft?: boolean;
  password?: string | number;
  fixed?: boolean;
};
