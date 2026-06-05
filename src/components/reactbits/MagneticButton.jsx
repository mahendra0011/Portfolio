import { useCallback, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

const MagneticButton = ({ children, className, strength = 0.22 }) => {
  const ref = useRef(null);

  const handlePointerMove = useCallback((event) => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * strength;
    const y = (event.clientY - rect.top - rect.height / 2) * strength;

    gsap.to(element, {
      x,
      y,
      scale: 1.035,
      duration: 0.38,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, [strength]);

  const handlePointerLeave = useCallback(() => {
    const element = ref.current;
    if (!element) return;

    gsap.to(element, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.55,
      ease: "elastic.out(1, 0.42)",
      overwrite: "auto",
    });
  }, []);

  return (
    <span
      ref={ref}
      className={cn("reactbits-magnetic inline-flex will-change-transform", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </span>
  );
};

export default MagneticButton;
