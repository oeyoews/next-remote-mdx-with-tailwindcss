import { FaGithub } from 'react-icons/fa';
import { Tweet } from 'react-tweet';

import Pre from './CopyCode';
import { ImageZoom as Image } from './ImageZoom';

function Star() {
  return <FaGithub className={`h-12 w-12 text-cyan-300`} />;
}

const mdxCustomComponents = {
  Tweet,
  pre: Pre,
  Star,
  Image,
};

export default mdxCustomComponents;
