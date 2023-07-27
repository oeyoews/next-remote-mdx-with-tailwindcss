'use client';

import { AnimatePresence, motion } from 'framer-motion';

const TransitionWrapper = ({ children }: any) => {
  return (
    <motion.div className="">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          layout
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <motion.main>{children}</motion.main>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default TransitionWrapper;
