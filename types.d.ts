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