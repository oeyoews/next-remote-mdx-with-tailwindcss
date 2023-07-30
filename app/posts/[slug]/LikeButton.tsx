'use client';

export default function LikeButton({
  increment,
}: {
  increment: () => Promise<void>;
}) {
  return (
    <button
      onClick={async () => {
        await increment();
        console.log('like');
      }}
    >
      Like
    </button>
  );
}
