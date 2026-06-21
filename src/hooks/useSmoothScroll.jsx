import { useEffect } from "react";

export const useSmoothScroll = () => {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    // No Lenis — Lenis intercepts native scroll which breaks framer-motion's useScroll().
    // framer-motion reads window.scrollY directly. Lenis replaces it with virtual scroll.
    // So useScroll() returns 0 progress always, and parallax never fires.
    // Instead we use CSS smooth scrolling and let framer-motion handle the rest.
    
    // Set CSS smooth scroll on html element
    const html = document.documentElement;
    html.style.scrollBehavior = 'smooth';
    
    // Remove the Lenis CSS class that might conflict
    document.documentElement.classList.remove('lenis');

    return () => {
      html.style.scrollBehavior = '';
    };
  }, []);
};