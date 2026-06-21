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

    // Lenis v1.3 ke liye sahi API
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: easeOutCubic,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
    });
    window.__portfolioLenis = lenis;

    // CRITICAL: Lenis ko GSAP ScrollTrigger ke saath sync karo
    // Yeh batata hai ki scroll position lenis se aayegi, browser native se nahi
    ScrollTrigger.scrollerProxy(window, {
      scrollTop() {
        const top = lenis.scroll ?? window.scrollY;
        return top;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: "transform",
    });

    // IMPORTANT: normalizeScroll Lenis ke saath use mat karo.
    // Sirf lenis.on("scroll", ScrollTrigger.update) kaafi hai.

    // Yeh batata hai ki saare ScrollTrigger window ko scroller maane
    ScrollTrigger.defaults({ scroller: window });

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.refresh();

    return () => {
      lenis.off?.("scroll", ScrollTrigger.update);
      ScrollTrigger.defaults({ scroller: undefined });
      ScrollTrigger.scrollerProxy(window, {
        scrollTop: undefined,
        getBoundingClientRect: undefined,
        pinType: undefined,
      });
      if (window.__portfolioLenis === lenis) {
        delete window.__portfolioLenis;
      }
      lenis.destroy();
    };
  }, []);
};