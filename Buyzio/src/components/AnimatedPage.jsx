// src/components/AnimatedPage.jsx
import { motion } from 'framer-motion';

const animations = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  },
};

const AnimatedPage = ({ children }) => (
  <motion.div
    variants={animations}
    initial="initial"
    animate="animate"
    exit="exit"
    style={{
      willChange: 'transform, opacity',
      transformOrigin: 'center center',
      backfaceVisibility: 'hidden',
    }}
  >
    {children}
  </motion.div>
);

export default AnimatedPage;
