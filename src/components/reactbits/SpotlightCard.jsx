import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const SpotlightCard = forwardRef(({ as: Component = "div", className, children, ...props }, ref) => {
  return (
    <Component ref={ref} className={cn("reactbits-spotlight", className)} {...props}>
      {children}
    </Component>
  );
});

SpotlightCard.displayName = "SpotlightCard";

export default SpotlightCard;
