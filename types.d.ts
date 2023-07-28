type TFrontmatter = {
	title: string
	date: string
	description?: string
	cover?: string | any
	slug?: string
	tags?: string[]
	draft?: boolean
	password?: string | number,
	fixed?: boolean
  content: any
};

declare module 'lqip-modern' {
  type LqipResult = Promise<{
    content: Buffer;
    metadata: {
      originalWidth: number;
      originalHeight: number;
      width: number;
      height: number;
      type: string;
      dataURIBase64: string;
    };
  }>;

  function lqip(imagePath: string): LqipResult;

  export = lqip;
}
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
  tweet: number;
  content: any;
}

type TFrontmatter = TMetaOptions & Partial<TMetaAdditionialOptions>;

interface PassWord {
  title: string;
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

declare module 'canvas-confetti' {
  export interface IOptions {
    particleCount: number;
    angle: number;
    spread: number;
    startVelocity: number;
    decay: number;
    gravity: number;
    ticks: number;
    origin: {
      x: number;
      y: number;
    };
    colors: string[];
    shapes: ('circle' | 'square')[];
    scalar: number;
    zIndex: number;
    disableForReducedMotion: boolean;
  }

  export interface IGlobalOptions {
    resize: boolean;
    useWorker: boolean;
    disableForReducedMotion: boolean;
  }

  export type TResetFn = () => void;
  export type TFireFn = (opts: Partial<IOptions>) => Promise<undefined>;
  export type TFire = TFireFn & { reset: TResetFn };
  export type TConfettiCannonFn = (
    globalOptions?: Partial<IGlobalOptions>,
  ) => TFire;
  export type TConfettiCannonCreateFn = (
    canvas: HTMLCanvasElement,
    globalOptions?: Partial<IGlobalOptions>,
  ) => TFire;

  const module: TConfettiCannonFn & { create: TConfettiCannonCreateFn } & TFire;

  export default module;
}
