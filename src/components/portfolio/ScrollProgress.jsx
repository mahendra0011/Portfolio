import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 700 : 130,
    damping: reduceMotion ? 90 : 24,
    mass: 0.32,
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
