import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 500 : 90,
    damping: reduceMotion ? 80 : 18,
    mass: 0.24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] origin-left accent-gradient-bg shadow-[0_0_18px_hsl(var(--primary)/0.38)]"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
