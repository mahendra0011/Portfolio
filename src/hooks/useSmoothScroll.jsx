import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export const useSmoothScroll = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // 🔥 Fast & Snappy Lenis Config (Lag khatam)
    const lenis = new Lenis({
      lerp: 0.09,             // Quick response
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,     // Fast mobile swipe
      wheelMultiplier: 1.2,   // Fast mouse wheel
      infinite: false,
    });

    window.__portfolioLenis = lenis;

    // Sync Lenis scroll with GSAP
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.lagSmoothing(0);
    const rafCb = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCb);

    document.documentElement.classList.add("lenis", "lenis-smooth");

    return () => {
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(rafCb);
      window.__portfolioLenis = null;
      lenis.destroy();
    };
  }, []);

  // Jab page change ho toh ScrollTrigger ko refresh karo
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [location.pathname]);
};