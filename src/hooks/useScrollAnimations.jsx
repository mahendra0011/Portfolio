import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const numberFromDataset = (value, fallback) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

export const useScrollAnimations = () => {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-scroll-parallax]").forEach((element) => {
        const distance = numberFromDataset(element.dataset.scrollParallax, -72);
        const trigger = element.dataset.scrollTrigger
          ? document.querySelector(element.dataset.scrollTrigger)
          : element.parentElement || element;

        gsap.to(element, {
          y: distance,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.75,
          },
        });
      });
    }, document.documentElement);

    const refresh = () => ScrollTrigger.refresh();
    const refreshId = window.requestAnimationFrame(refresh);
    window.addEventListener("load", refresh, { once: true });

    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }

    const pendingImages = Array.from(document.images).filter((image) => !image.complete);
    pendingImages.forEach((image) => {
      image.addEventListener("load", refresh, { once: true });
      image.addEventListener("error", refresh, { once: true });
    });

    return () => {
      window.cancelAnimationFrame(refreshId);
      window.removeEventListener("load", refresh);
      pendingImages.forEach((image) => {
        image.removeEventListener("load", refresh);
        image.removeEventListener("error", refresh);
      });
      ctx.revert();
    };
  }, []);
};
