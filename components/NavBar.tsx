import { FcInfo } from 'react-icons/fc';
import { FiGithub } from 'react-icons/fi';

// TODO: effect https://github.com/oeyoews/nextjs-blog/blob/main/src/components/LayoutWrapper.tsx
import Image from 'next/image';
import Link from 'next/link';

// scale not work
export default function NavBar() {
  const iconClasses =
    'inline mr-1 align-baseline hover:scale-125 transition duration-300';

  const GithubLink = (
    <Link
      target="_blank"
      href={'https://github.com/oeyoews/next-remote-mdx-with-tailwindcss'}
    >
      <FiGithub className={iconClasses} />{' '}
    </Link>
  );
  const AboutPage = (
    <Link href="/about" className="scale-110">
      <FcInfo className={iconClasses} />
    </Link>
  );

  return (
    <nav className="sticky top-0 mx-auto flex items-center justify-between rounded p-2 text-xl backdrop-blur-lg print:hidden z-[1] max-w-3xl">
      <div className="flex items-center">
        <Link href="/" className="p-2">
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={100}
            height={37}
            className="h-auto"
          />
        </Link>
      </div>
      {GithubLink}
    </nav>
  );
}
