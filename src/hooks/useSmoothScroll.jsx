import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 2.4);

export const useSmoothScroll = () => {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (window.deviceMemory && window.deviceMemory <= 4) return undefined;

    const lenis = new Lenis({
      autoRaf: false,
      duration: 0.42,
      easing: easeOutCubic,
      smoothWheel: true,
      wheelMultiplier: 1.08,
      touchMultiplier: 1.12,
      infinite: false,
    });
    window.__portfolioLenis = lenis;

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.off?.("scroll", ScrollTrigger.update);
      if (window.__portfolioLenis === lenis) {
        delete window.__portfolioLenis;
      }
      lenis.destroy();
    };
  }, []);
};
