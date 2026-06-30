import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImg from "@/assets/profile-yes2.png";

gsap.registerPlugin(ScrollTrigger);

const FloatingProfileImage = () => {
  const frameRef = useRef(null);
  const zoomTimer = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const [frameZ, setFrameZ] = useState(20);
  const frameZRef = useRef(20);

  const safeSetZ = (z) => {
    if (frameZRef.current !== z) {
      frameZRef.current = z;
      setFrameZ(z);
    }
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const isAndroid = /Android/i.test(navigator.userAgent);

    const frame = frameRef.current;
    const heroAnchor = document.getElementById("hero-photo-anchor");
    const aboutAnchor = document.getElementById("about-photo-anchor");
    const aboutSection = document.getElementById("about");

    if (!frame || !heroAnchor || !aboutAnchor || !aboutSection) return;

    const getScrollY = () => {
      // Use visual viewport offset for mobile (handles Android address bar changes)
      if (isAndroid && window.visualViewport) {
        return window.scrollY + (window.visualViewport.offsetTop || 0);
      }
      return window.scrollY || 0;
    };

    // Page-absolute measurements — recalculated on every measureAll() call
    let hero = { pageTop: 0, left: 0, w: 0, h: 0 };
    let about = { pageTop: 0, left: 0, w: 0, h: 0 };
    let aboutSecPageTop = 0;
    let aboutSecPageBottom = 0; // actual bottom of #about section in page coords
    let aboutGridPageBottom = 0;

    const measureAll = () => {
      const sy = getScrollY();

      const hr = heroAnchor.getBoundingClientRect();
      hero = { pageTop: hr.top + sy, left: hr.left, w: hr.width, h: hr.height };

      const ar = aboutAnchor.getBoundingClientRect();
      about = { pageTop: ar.top + sy, left: ar.left, w: ar.width, h: ar.height };

      const sr = aboutSection.getBoundingClientRect();
      aboutSecPageTop = sr.top + sy;
      aboutSecPageBottom = sr.bottom + sy;

      const grid = document.getElementById("about-content-grid");
      if (grid) {
        const gr = grid.getBoundingClientRect();
        aboutGridPageBottom = gr.bottom + sy;
      } else {
        aboutGridPageBottom = aboutSecPageBottom;
      }
    };

    // ─────────────────────────────────────────────────────────────
    //  MOBILE / ANDROID  →  rAF tick
    // ─────────────────────────────────────────────────────────────
    if (isMobile || isAndroid) {
      let rafId = 0;
      let resizeTimer = 0;
      let lockedAtAbout = false;

      const tick = () => {
        rafId = requestAnimationFrame(tick);

        const sy = getScrollY();
        const vph = window.innerHeight;

        // viewport-space tops (recalculated every frame from page-absolute values)
        const heroVT = hero.pageTop - sy;
        const aboutVT = about.pageTop - sy;

        // ── Phase boundaries ──────────────────────────────────────
        const phase2Start = aboutSecPageTop - vph;
        const phase3Start = aboutSecPageTop;

        // Phase 1 — hero (scrolling naturally with page)
        if (sy < phase2Start) {
          lockedAtAbout = false;
          frame.style.opacity = "1";
          frame.style.left = hero.left + "px";
          frame.style.top = hero.pageTop + "px"; // Page coordinate - scrolls naturally
          frame.style.width = hero.w + "px";
          frame.style.height = hero.h + "px";
          safeSetZ(-1); // Push behind text and buttons
          return;
        }

        // Phase 2 — lerp hero→about (scrolling naturally)
        if (sy < phase3Start) {
          lockedAtAbout = false;
          const range = phase3Start - phase2Start;
          const p = range <= 0 ? 1 : (sy - phase2Start) / range;
          const left = hero.left + (about.left - hero.left) * p;
          const top = hero.pageTop + (about.pageTop - hero.pageTop) * p; // Smooth scrolling with page
          const w = hero.w + (about.w - hero.w) * p;
          const h = hero.h + (about.h - hero.h) * p;
          frame.style.opacity = "1";
          frame.style.left = left + "px";
          frame.style.top = top + "px";
          frame.style.width = w + "px";
          frame.style.height = h + "px";
          safeSetZ(-1); // Push behind text and buttons
          return;
        }

        // Phase 3 — locked to about anchor (scrolling naturally with page)
        if (!lockedAtAbout) {
          lockedAtAbout = true;
          frame.style.left = about.left + "px";
          frame.style.top = about.pageTop + "px"; // Page coordinate - scrolls naturally
          frame.style.width = about.w + "px";
          frame.style.height = about.h + "px";
        }

        // Phase 4 — hidden
        // Hide only when the anchor is fully above the viewport
        const aboutViewportTop = about.pageTop - sy;
        if (aboutViewportTop + about.h <= 0) {
          frame.style.opacity = "0";
          return;
        }

        frame.style.opacity = "1";
        safeSetZ(0);
      };

      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(measureAll, 150);
      };

      measureAll();
      frame.style.position = "absolute";
      frame.style.top = "0px";
      rafId = requestAnimationFrame(tick);

      window.addEventListener("resize", onResize, { passive: true });
      window.visualViewport?.addEventListener("resize", onResize, { passive: true });
      window.addEventListener("orientationchange", onResize, { passive: true });
      // On Android, visual viewport scroll affects position calculations
      window.visualViewport?.addEventListener("scroll", onResize, { passive: true });

      const img = frame.querySelector("img");
      img?.addEventListener("load", measureAll, { once: true });
      document.fonts?.ready?.then(measureAll).catch(measureAll);
      setTimeout(measureAll, 400);
      setTimeout(measureAll, 1000);

      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
        window.visualViewport?.removeEventListener("resize", onResize);
        window.removeEventListener("orientationchange", onResize);
        window.visualViewport?.removeEventListener("scroll", onResize);
        img?.removeEventListener("load", measureAll);
      };
    }

    // ─────────────────────────────────────────────────────────────
    //  DESKTOP  →  GSAP ScrollTrigger
    // ─────────────────────────────────────────────────────────────
    let resizeTimer = 0;

    const heroVT = () => hero.pageTop - getScrollY();
    const aboutVT = () => about.pageTop - getScrollY();

    const placeAtHero = () => {
      gsap.set(frame, {
        position: "fixed",
        left: hero.left, top: heroVT(),
        width: hero.w, height: hero.h,
        opacity: 1,
      });
    };

    const placeAtAbout = () => {
      const top = aboutVT();

      const visible = (top + about.h) > 0;
      gsap.set(frame, {
        position: "fixed",
        left: about.left, top,
        width: about.w, height: about.h,
        opacity: visible ? 1 : 0,
      });
    };

    const lerp = (p) => {
      p = gsap.utils.clamp(0, 1, p);
      gsap.set(frame, {
        position: "fixed",
        left: hero.left + (about.left - hero.left) * p,
        top: heroVT() + (aboutVT() - heroVT()) * p,
        width: hero.w + (about.w - hero.w) * p,
        height: hero.h + (about.h - hero.h) * p,
        opacity: 1,
      });
    };

    const init = () => { measureAll(); placeAtHero(); ScrollTrigger.refresh(); };

    // Trigger 1: hero→about transition while about section enters from bottom
    const tTransition = ScrollTrigger.create({
      trigger: aboutSection,
      start: "top bottom",
      end: "top top",
      scrub: 1.0,
      invalidateOnRefresh: true,
      onUpdate: (self) => { measureAll(); lerp(self.progress); safeSetZ(20); },
      onLeave: () => { measureAll(); placeAtAbout(); safeSetZ(10); },
      onLeaveBack: () => { measureAll(); placeAtHero(); safeSetZ(20); },
      onRefresh: (self) => { measureAll(); lerp(self.progress); },
    });

    // Trigger 2: image pinned to about-anchor while about section fills viewport
    const tSettle = ScrollTrigger.create({
      trigger: aboutSection,
      start: "top top",
      end: "bottom top",
      onEnter: () => { measureAll(); placeAtAbout(); safeSetZ(10); },
      onEnterBack: () => { measureAll(); placeAtAbout(); safeSetZ(10); },
      onLeave: () => { gsap.set(frame, { opacity: 0 }); safeSetZ(20); },
      onLeaveBack: () => { measureAll(); lerp(tTransition.progress ?? 1); safeSetZ(20); },
      onUpdate: () => { measureAll(); placeAtAbout(); },
    });

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { measureAll(); ScrollTrigger.refresh(); }, 80);
    };

    window.addEventListener("resize", onResize, { passive: true });
    const img = frame.querySelector("img");
    img?.addEventListener("load", init, { once: true });
    document.fonts?.ready?.then(init).catch(init);
    requestAnimationFrame(init);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      img?.removeEventListener("load", init);
      tTransition.kill();
      tSettle.kill();
    };
  }, []);

  useEffect(() => () => clearTimeout(zoomTimer.current), []);

  const handlePhotoClick = () => {
    clearTimeout(zoomTimer.current);
    setZoomed(true);
    zoomTimer.current = setTimeout(() => setZoomed(false), 520);
  };

  return (
    <div
      ref={frameRef}
      className="pointer-events-none fixed left-0 top-0 overflow-hidden floating-profile-frame"
      style={{ opacity: 0, willChange: "transform", transform: "translateZ(0)", zIndex: frameZ }}
      aria-hidden="false"
    >
      <motion.button
        type="button"
        aria-label="Zoom Mahendra photo"
        onClick={handlePhotoClick}
        animate={{ scale: zoomed ? 1.07 : 1 }}
        whileHover={{ scale: 1.035 }}
        whileTap={{ scale: 1.09 }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
        className="pointer-events-auto h-full w-full cursor-pointer bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <img
          src={profileImg}
          alt="Mahendra Prajapati portrait"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          draggable="false"
          className="h-full w-full select-none object-contain object-bottom drop-shadow-[0_34px_48px_rgba(15,23,42,0.42)]"
        />
      </motion.button>
    </div>
  );
};

export default FloatingProfileImage;