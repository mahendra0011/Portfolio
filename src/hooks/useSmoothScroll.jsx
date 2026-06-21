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
      autoRaf: true,
      duration: 1.2,
      easing: easeOutCubic,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
    });
    window.__portfolioLenis = lenis;

    // CRITICAL: scrollerProxy ko BOTH getter aur setter chahiye!
    // GSAP pin element ko scroll position SET karta hai, isliye setter zaroori hai
    // Sirf getter dene se pinning visually break ho jayegi - cards normally scroll karenge
    ScrollTrigger.scrollerProxy(window, {
      scrollTop(value) {
        if (arguments.length) {
          // SETTER — GSAP pin karne ke liye scroll position set karta hai
          lenis.scrollTo(value, { immediate: true });
        }
        // GETTER — GSAP current scroll position padhta hai
        return lenis.scroll ?? window.scrollY;
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