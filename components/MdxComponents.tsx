import { FaGithub } from 'react-icons/fa';

import Pre from './CopyCode';

function Star() {
  return <FaGithub className={`h-12 w-12 text-cyan-300`} />;
}

const mdxCustomComponents = {
  pre: Pre,
  Star,
};

export default mdxCustomComponents;
