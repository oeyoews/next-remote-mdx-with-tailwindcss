'use client';

// TODO: not support clicke directly
import { AnimatePresence, motion } from 'framer-motion';

const TransitionWrapper = ({ children }: any) => {
  return (
    <motion.div className="min-h-screen">
      <AnimatePresence initial={true} mode="sync">
        <motion.div
          initial={{
            opacity: 0,
            y: 70,
          }}
          layout
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 70 }}
        >
          <motion.main>{children}</motion.main>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default TransitionWrapper;
