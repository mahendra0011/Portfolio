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
  const [frameZ] = useState(5);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const isAndroid = /Android/i.test(navigator.userAgent);

    const frame = frameRef.current;
    const heroAnchor   = document.getElementById("hero-photo-anchor");
    const aboutAnchor  = document.getElementById("about-photo-anchor");
    const aboutSection = document.getElementById("about");

    if (!frame || !heroAnchor || !aboutAnchor || !aboutSection) return;

    const getScrollY = () => window.scrollY || 0;

    // Page-absolute measurements — recalculated on every measureAll() call
    let hero  = { pageTop: 0, left: 0, w: 0, h: 0 };
    let about = { pageTop: 0, left: 0, w: 0, h: 0 };
    let aboutSecPageTop    = 0;
    let aboutSecPageBottom = 0; // actual bottom of #about section in page coords
    let aboutGridPageBottom = 0;

    const measureAll = () => {
      const sy = getScrollY();

      const hr = heroAnchor.getBoundingClientRect();
      hero = { pageTop: hr.top + sy, left: hr.left, w: hr.width, h: hr.height };

      const ar = aboutAnchor.getBoundingClientRect();
      about = { pageTop: ar.top + sy, left: ar.left, w: ar.width, h: ar.height };

      const sr = aboutSection.getBoundingClientRect();
      aboutSecPageTop    = sr.top    + sy;
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
    //  ALL DEVICES  →  GSAP ScrollTrigger
    // ─────────────────────────────────────────────────────────────
    if (isMobile || isAndroid) {
      ScrollTrigger.config({ ignoreMobileResize: true });
    }

    let resizeTimer = 0;

    const placeAtHero = () => {
      gsap.set(frame, {
        position: "absolute",
        x: hero.left, y: hero.pageTop,
        width: hero.w,   height: hero.h,
        opacity: 1,
        force3D: true,
      });
    };

    const placeAtAbout = () => {
      // It stays visible if it's anywhere in the document, but we want it to hide if it scrolls completely off top
      const visible = (about.pageTop - getScrollY() + about.h) > 0;
      gsap.set(frame, {
        position: "absolute",
        x: about.left, y: about.pageTop,
        width: about.w,   height: about.h,
        opacity: visible ? 1 : 0,
        force3D: true,
      });
    };

    const lerp = (p) => {
      p = gsap.utils.clamp(0, 1, p);
      gsap.set(frame, {
        position: "absolute",
        x:   hero.left + (about.left - hero.left) * p,
        y:    hero.pageTop + (about.pageTop - hero.pageTop) * p,
        width:  hero.w    + (about.w    - hero.w)    * p,
        height: hero.h    + (about.h    - hero.h)    * p,
        opacity: 1,
        force3D: true,
      });
    };

    const init = () => { measureAll(); placeAtHero(); ScrollTrigger.refresh(); };

    // Trigger 1: hero→about transition while about section enters from bottom
    const tTransition = ScrollTrigger.create({
      trigger: aboutSection,
      start: "top bottom",
      end:   "top top",
      scrub: 0.5,
      invalidateOnRefresh: true,
      onUpdate    : (self) => { lerp(self.progress); gsap.set(frame, { zIndex: 5 }); },
      onLeave     : ()     => { placeAtAbout();      gsap.set(frame, { zIndex: 0 }); },
      onLeaveBack : ()     => { placeAtHero();       gsap.set(frame, { zIndex: 5 }); },
      onRefresh   : (self) => { measureAll(); lerp(self.progress); },
    });

    // Trigger 2: image pinned to about-anchor while about section fills viewport
    const tSettle = ScrollTrigger.create({
      trigger: aboutSection,
      start: "top top",
      end:   "bottom top",
      onEnter     : () => { placeAtAbout(); gsap.set(frame, { zIndex: 5 }); },
      onEnterBack : () => { placeAtAbout(); gsap.set(frame, { zIndex: 5 }); },
      onLeave     : () => { gsap.set(frame, { opacity: 0 }); },
      onLeaveBack : () => { lerp(tTransition.progress ?? 1); gsap.set(frame, { zIndex: 5 }); },
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

    // Watch for dynamic height changes (e.g. Typewriter effect)
    let roTimer = 0;
    const ro = new ResizeObserver(() => {
      clearTimeout(roTimer);
      roTimer = setTimeout(() => { measureAll(); ScrollTrigger.refresh(); }, 50);
    });
    ro.observe(heroAnchor);
    ro.observe(aboutAnchor);

    return () => {
      clearTimeout(resizeTimer);
      clearTimeout(roTimer);
      window.removeEventListener("resize", onResize);
      img?.removeEventListener("load", init);
      ro.disconnect();
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
      className="pointer-events-none absolute left-0 top-0 overflow-hidden floating-profile-frame"
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