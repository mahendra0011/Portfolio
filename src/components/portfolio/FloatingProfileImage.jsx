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

    let hero  = { pageTop: 0, left: 0, w: 0, h: 0 };
    let about = { pageTop: 0, left: 0, w: 0, h: 0 };

    const getParentOffset = () => {
      if (!frame) return { top: 0, left: 0 };
      const ost = frame.offsetParent;
      if (!ost || ost === document.body || ost === document.documentElement) return { top: 0, left: 0 };
      const rect = ost.getBoundingClientRect();
      return { top: rect.top + getScrollY(), left: rect.left + window.scrollX };
    };

    const measureAll = () => {
      const sy = getScrollY();

      const hr = heroAnchor.getBoundingClientRect();
      hero = { pageTop: hr.top + sy, left: hr.left, w: hr.width, h: hr.height };

      const ar = aboutAnchor.getBoundingClientRect();
      about = { pageTop: ar.top + sy, left: ar.left, w: ar.width, h: ar.height };
    };

    if (isMobile || isAndroid) {
      ScrollTrigger.config({ ignoreMobileResize: true });
    }

    let resizeTimer = 0;

    const placeAtHero = () => {
      if (isAndroid) {
        const po = getParentOffset();
        gsap.set(frame, {
          position: "absolute",
          left: hero.left - po.left,
          top: hero.pageTop - po.top,
          width: hero.w,
          height: hero.h,
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
        });
        return;
      }
      gsap.set(frame, {
        position: "absolute",
        left: hero.left, top: hero.pageTop,
        width: hero.w,   height: hero.h,
        x: 0, y: 0, scale: 1,
        opacity: 1,
      });
    };

    const placeAtAbout = () => {
      const po = getParentOffset();
      const visible = (about.pageTop - getScrollY() + about.h) > 0;
      if (isAndroid) {
        gsap.set(frame, {
          position: "absolute",
          left: about.left - po.left,
          top: about.pageTop - po.top,
          width: hero.w, // strictly lock size to original hero width
          height: hero.h, // strictly lock size to original hero height
          x: 0,
          y: 0,
          scale: 1,
          opacity: visible ? 1 : 0,
        });
        return;
      }
      gsap.set(frame, {
        position: "absolute",
        left: about.left, top: about.pageTop,
        width: about.w,   height: about.h,
        x: 0, y: 0, scale: 1,
        opacity: visible ? 1 : 0,
      });
    };

    let pendingProgress = null;
    let rafId = 0;

    const applyLerp = (p) => {
      p = gsap.utils.clamp(0, 1, p);

      if (isAndroid) {
        const sy = getScrollY();
        
        // Linear vertical interpolation in window view coordinates
        const curX = hero.left;
        const curY = (hero.pageTop + (about.pageTop - hero.pageTop) * p) - sy;

        // Uses fixed container layout to bypass compositor delay on Android
        gsap.set(frame, {
          position: "fixed",
          left: 0,
          top: 0,
          width: hero.w,
          height: hero.h,
          x: curX,
          y: curY,
          scale: 1,
          force3D: true,
          opacity: 1,
        });
        return;
      }

      // Windows/iOS path (Original responsive interpolation unchanged)
      gsap.set(frame, {
        position: "absolute",
        left:   hero.left + (about.left - hero.left) * p,
        top:    hero.pageTop + (about.pageTop - hero.pageTop) * p,
        width:  hero.w    + (about.w    - hero.w)    * p,
        height: hero.h    + (about.h    - hero.h)    * p,
        x: 0, y: 0, scale: 1,
        opacity: 1,
      });
    };

    const lerp = (p) => {
      if (!isAndroid) {
        applyLerp(p);
        return;
      }
      pendingProgress = p;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        if (pendingProgress !== null) {
          applyLerp(pendingProgress);
          pendingProgress = null;
        }
      });
    };

    const init = () => { measureAll(); placeAtHero(); ScrollTrigger.refresh(); };

    const tTransition = ScrollTrigger.create({
      trigger: aboutSection,
      start: "top bottom",
      end:   "top top",
      scrub: isAndroid ? 0.4 : 0.5,
      invalidateOnRefresh: true,
      onUpdate    : (self) => { lerp(self.progress); },
      onLeave     : ()     => { placeAtAbout(); },
      onLeaveBack : ()     => { placeAtHero(); },
      onRefresh   : (self) => { measureAll(); lerp(self.progress); },
    });

    const tSettle = ScrollTrigger.create({
      trigger: aboutSection,
      start: "top top",
      end:   "bottom top",
      onEnter     : () => { placeAtAbout(); },
      onEnterBack : () => { placeAtAbout(); },
      onLeave     : () => { gsap.set(frame, { opacity: 0 }); },
      onLeaveBack : () => { lerp(tTransition.progress ?? 1); },
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
      if (rafId) cancelAnimationFrame(rafId);
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