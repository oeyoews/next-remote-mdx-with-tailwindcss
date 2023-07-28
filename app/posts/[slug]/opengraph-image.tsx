import { ImageResponse } from 'next/server';

export const runtime = 'edge';
export const alt = 'og image';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const title = decodeURIComponent(params.slug);
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 47,
            left: 104,
            height: 128,
            width: 128,
            display: 'flex',
            borderRadius: '50%',
            border: '4px solid #fff',
            zIndex: '5',
          }}
        >
          <img
            src="https://www.gravatar.com/avatar/1de1d1f594efdf7906ce8dba84a8b73e"
            style={{
              borderRadius: '50%',
              width: '100%',
              height: '100%',
              transform: 'scale(1.1)',
            }}
          />
        </div>
        {title}
      </div>
    ),
  );
}
