import { useEffect } from "react";

export const useSmoothScroll = () => {
  useEffect(() => {
    // No Lenis. framer-motion useScroll reads native window.scrollY.
    // CSS position: sticky needs native scroll.
    // Use CSS scroll-behavior for smooth scrolling instead.
    const html = document.documentElement;
    html.style.scrollBehavior = 'smooth';
    return () => {
      html.style.scrollBehavior = '';
    };
  }, []);
};