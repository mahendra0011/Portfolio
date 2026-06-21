import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useSmoothScroll = () => {
  useEffect(() => {
    // No Lenis instance here — Projects.jsx now owns the Lenis instance.
    // This hook only keeps GSAP ScrollTrigger synced with whatever scroller is active.
    return () => {};
  }, []);
};