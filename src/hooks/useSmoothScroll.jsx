import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 2.4);

export const useSmoothScroll = () => {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (window.deviceMemory && window.deviceMemory <= 4) return undefined;

    // CRITICAL: HTML file EXACT pattern - gsap.ticker.add drives Lenis, NOT autoRaf!
    // autoRaf: true + gsap.ticker.add together = conflict, Lenis doesn't work
    const lenis = new Lenis({
      // No autoRaf! HTML file doesn't use it
      lerp: 0.03,
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
      wheelMultiplier: 0.8,
      infinite: false,
    });
    window.__portfolioLenis = lenis;

    // HTML file exact pattern: gsap.ticker.add drives Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // scrollerProxy with BOTH getter + setter so GSAP know how to read/write Lenis scroll
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
    ScrollTrigger.refresh();

    return () => {
      lenis.off?.("scroll", ScrollTrigger.update);
      ScrollTrigger.defaults({ scroller: undefined });
      ScrollTrigger.scrollerProxy(window, {
        scrollTop: undefined,
        getBoundingClientRect: undefined,
        pinType: undefined,
      });
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      if (window.__portfolioLenis === lenis) {
        delete window.__portfolioLenis;
      }
      lenis.destroy();
    };
  }, []);
};