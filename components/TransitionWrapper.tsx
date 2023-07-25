'use client';

import { motion } from 'framer-motion';

const transition = {
  duration: 0.7,
  ease: 'easeInOut',
};

const TransitionWrapper = ({ children }: any) => {
  return (
    <motion.div
      // whileInView={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default TransitionWrapper;
