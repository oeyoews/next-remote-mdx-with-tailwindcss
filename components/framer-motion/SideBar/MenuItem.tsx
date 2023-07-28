import Link from 'next/link';

import { motion } from 'framer-motion';

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const MenuItem = ({ i }: any) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-1/2 mx-auto flex flex-row justify-center items-center"
    >
      <Link className="h-6 w-6 rounded m-2 " href="/">
        d
      </Link>
    </motion.div>
  );
};
