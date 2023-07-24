import { FaGithub } from 'react-icons/fa';

import Pre from './CopyCode';
import { ImageZoom } from './ImageZoom';

function Star() {
  return (
    <div className="rounded bg-neutral-200 p-2">
      <FaGithub className="h-5 w-5 text-cyan-300" />
    </div>
  );
}

const mdxCustomComponents = {
  pre: Pre,
  Star: (props: {}) => <Star />,
  Image: (props: {
    src: string;
    alt: string;
    height: number;
    width: number;
  }) => (
    <ImageZoom
      width={props.width}
      height={props.height}
      src={props.src}
      alt={props.alt}
    />
  ),
};

export default mdxCustomComponents;
