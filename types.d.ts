interface PostNavigationProps {
  prevPost: TFrontmatter;
  nextPost: TFrontmatter;
}

interface TMetaOptions {
  title: string;
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
  content: any;
}

type TFrontmatter = TMetaOptions & Partial<TMetaAdditionialOptions>;

interface PassWord {
  title: string | undefined;
  originPassword: string | number;
  content: any;
}

declare module 'rss' {
  type DateString = string | Date;

  export interface ItemOptions {
    title: string;
    description?: string;
    url: string;
    pubDate?: DateString;
    date?: DateString;
    author?: string;
    categories?: string[];
    custom_elements?: object[];
  }

  export interface FeedOptions {
    title: string;
    pubDate: DateString;
    feed_url: string;
    site_url: string;
    description?: string;
    generator?: string;
    image_url?: string;
    docs?: string;
    managingEditor?: string;
    webMaster?: string;
    copyright?: string;
    language?: string;
    categories?: string[];
    pubDate?: DateString;
    ttl?: number;
    hub?: string;
    custom_namespaces?: object;
    custom_elements?: object[];
  }

  export default class RSS {
    constructor(options?: FeedOptions);
    item(item: ItemOptions): void;
    xml(options: { indent: boolean }): string;
  }
}
