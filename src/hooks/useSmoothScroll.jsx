import { useEffect } from "react";

export const useSmoothScroll = () => {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const html = document.documentElement;
    html.style.scrollBehavior = 'smooth';
    return () => {
      html.style.scrollBehavior = '';
    };
  }, []);
};