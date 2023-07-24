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

declare module 'rss' {
  interface RSSOptions {
    title: string;
    description: string;
    feed_url: string;
    site_url: string;
    image_url?: string;
    docs?: string;
    managingEditor?: string;
    webMaster?: string;
    copyright?: string;
    language?: string;
    categories?: string[];
    pubDate?: string;
    ttl?: string;
    custom_namespaces?: Record<string, string>;
    custom_elements?: Record<string, unknown>[];
  }

  interface RSSItemOptions {
    title: string;
    description: string;
    url: string;
    guid?: string;
    categories?: string[];
    author?: string;
    date?: string;
    lat?: number;
    long?: number;
    enclosure?: {
      url: string;
      file: string;
    };
    custom_elements?: Record<string, unknown>[];
  }

  class RSS {
    constructor(options: RSSOptions);
    item(options: RSSItemOptions): void;
    xml(indent?: boolean | string): string;
  }

  export = RSS;
}
