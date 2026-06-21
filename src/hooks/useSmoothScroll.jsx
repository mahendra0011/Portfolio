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

    // Lenis v1.3+ ke liye correct API — lerp nahi, duration aur smoothWheel use karo
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,          // v1.3+ — duration = lerp ka ulta (higher = smoother)
      easing: easeOutCubic,
      smoothWheel: true,       // v1.3+ — replaces `smooth: true`
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
    });
    window.__portfolioLenis = lenis;

    // GSAP ScrollTrigger ko Lenis ke saath sync karo
    lenis.on("scroll", ScrollTrigger.update);

    // ScrollTrigger normalize for Lenis compatibility
    ScrollTrigger.normalizeScroll(true);

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      ScrollTrigger.normalizeScroll(false);
      if (window.__portfolioLenis === lenis) {
        delete window.__portfolioLenis;
      }
    };
  }, []);
};