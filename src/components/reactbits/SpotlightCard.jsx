import { forwardRef, useCallback } from "react";
import { cn } from "@/lib/utils";

const SpotlightCard = forwardRef(({ as: Component = "div", className, children, ...props }, ref) => {
  const handlePointerMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  }, []);

  return (
    <Component ref={ref} onPointerMove={handlePointerMove} className={cn("reactbits-spotlight", className)} {...props}>
      {children}
    </Component>
  );
});

SpotlightCard.displayName = "SpotlightCard";

export default SpotlightCard;
