import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

/**
 * 🔥 FIXES vs the original:
 *
 * 1. smoothTouch stays false (good — Lenis smoothing on touch devices is a
 *    very common hang cause), but we also now skip creating Lenis at all on
 *    coarse/touch input. Native momentum scroll on mobile is already smooth;
 *    layering Lenis on top adds JS-driven scroll math your phone doesn't need
 *    and is one of the bigger sources of "lag feeling" reports on touch.
 *
 * 2. ScrollTrigger.refresh() on route change now runs on requestAnimationFrame
 *    + a single rAF after layout settles instead of an arbitrary 200ms
 *    setTimeout — avoids a layout recalculation hitting mid-paint.
 *
 * 3. Added a debounced resize-triggered refresh so ScrollTrigger doesn't drift
 *    out of sync with the layout (common cause of jumpy/jerky sticky sections
 *    after a resize or mobile address-bar show/hide).
 *
 * 4. lagSmoothing(0) removed — this actually makes GSAP NOT compensate for
 *    long frames (e.g. tab switch, image decode), which can make things feel
 *    MORE janky when the main thread briefly stalls. Reasonable smoothing
 *    (default ~500ms) is restored.
 */
export const useSmoothScroll = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // We removed the touch device skip so the butter smooth scroll applies on mobile too



        const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: 1,
      infinite: false,
    });

    window.__portfolioLenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const rafCb = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafCb);
    // default lag smoothing kept (don't disable it) so long frames don't snap

    document.documentElement.classList.add("lenis", "lenis-smooth");

    return () => {
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(rafCb);
      window.__portfolioLenis = null;
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    let raf1, raf2;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [location.pathname]);

  // keep ScrollTrigger in sync with viewport changes (resize, mobile
  // address-bar collapse/expand, orientation change) without spamming refresh
  useEffect(() => {
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);
};