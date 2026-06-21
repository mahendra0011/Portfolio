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

    const lenis = new Lenis({
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

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // CRITICAL: scrollerProxy with BOTH getter + setter
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

    // Add Lenis CSS for sticky to work
    const styleId = 'lenis-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        html.lenis, html.lenis body { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto !important; }
        .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
        .lenis.lenis-stopped { overflow: hidden; }
        .lenis.lenis-scrolling iframe { pointer-events: none; }
      `;
      document.head.appendChild(style);
    }

    return () => {
      lenis.off?.("scroll", ScrollTrigger.update);
      ScrollTrigger.defaults({ scroller: undefined });
      ScrollTrigger.scrollerProxy(window, {
        scrollTop: undefined,
        getBoundingClientRect: undefined,
        pinType: undefined,
      });
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      const s = document.getElementById(styleId);
      if (s) s.remove();
      if (window.__portfolioLenis === lenis) delete window.__portfolioLenis;
      lenis.destroy();
    };
  }, []);
};