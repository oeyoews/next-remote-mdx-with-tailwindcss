import { FcInfo } from 'react-icons/fc';
import { FiGithub } from 'react-icons/fi';

import Image from 'next/image';
import Link from 'next/link';

// scale not work
export default function NavBar() {
  const iconClasses =
    'inline mr-1 align-baseline stroke-blue-300 hover:scale-125 transition duration-300 hover:stroke-indigo-300';

  const GithubLink = (
    <a
      target="_blank"
      href={'https://github.com/oeyoews/next-remote-mdx-with-tailwindcss'}
    >
      <FiGithub className={iconClasses} />{' '}
    </a>
  );
  const AboutPage = (
    <Link href="/about" className="scale-110">
      <FcInfo className={iconClasses} />
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 mx-auto flex items-center justify-between rounded p-2 text-xl backdrop-blur-lg print:hidden sm:w-full lg:w-1/2">
      <div className="flex items-center">
        <Link href="/">
          <Image src="/next.svg" alt="Next.js Logo" width={100} height={37} />
        </Link>
      </div>
      <div className="flex space-x-2">
        {GithubLink}
        {AboutPage}
      </div>
    </nav>
  );
}
