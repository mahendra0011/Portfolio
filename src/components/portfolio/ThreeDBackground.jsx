import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";

const ThreeDBackground = () => {
  const { theme } = useTheme();
  const [src, setSrc] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (window.matchMedia("(pointer: coarse)").matches) return undefined; // Disable 3D on mobile
    if (window.deviceMemory && window.deviceMemory <= 4) return undefined;

    const load = () => setSrc(`/3d-background.html?theme=${theme}`);
    const idle = window.requestIdleCallback?.(load, { timeout: 900 });

    if (idle === undefined) {
      const timeout = window.setTimeout(load, 900);
      return () => window.clearTimeout(timeout);
    }

    return () => window.cancelIdleCallback?.(idle);
  }, [theme]);

  return (
    <div className="three-d-background" aria-hidden="true">
      {src && (
        <iframe
          key={src}
          src={src}
          title="3D Background"
          loading="lazy"
          scrolling="no"
        />
      )}
    </div>
  );
};

export default ThreeDBackground;``