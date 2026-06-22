import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useSmoothScroll = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.06,
      smoothWheel: true,
      smoothTouch: false,
    });

    // CRITICAL: Sync Lenis with GSAP
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // CRITICAL: scrollerProxy so ScrollTrigger reads Lenis scroll position
    ScrollTrigger.scrollerProxy(window, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll ?? window.scrollY;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: "transform",
    });

    ScrollTrigger.defaults({ scroller: window });

    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis CSS classes for sticky to work
    document.documentElement.classList.add("lenis", "lenis-smooth");

    // Initial refresh after a frame to measure properly
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
};