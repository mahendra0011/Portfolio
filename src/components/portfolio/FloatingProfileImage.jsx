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

  useEffect(() => {
    const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    const frame = frameRef.current;
    const heroAnchor   = document.getElementById("hero-photo-anchor");
    const aboutAnchor  = document.getElementById("about-photo-anchor");
    const aboutSection = document.getElementById("about");

    if (!frame || !heroAnchor || !aboutAnchor || !aboutSection) return;

    const getScrollY = () => window.scrollY || 0;

    let hero  = { pageTop: 0, left: 0, w: 0, h: 0 };
    let about = { pageTop: 0, left: 0, w: 0, h: 0 };
    let aboutSecPageTop    = 0;
    let aboutSecPageBottom = 0;

    const measureAll = () => {
      const sy = getScrollY();
      const hr = heroAnchor.getBoundingClientRect();
      hero = { pageTop: hr.top + sy, left: hr.left, w: hr.width, h: hr.height };

      const ar = aboutAnchor.getBoundingClientRect();
      about = { pageTop: ar.top + sy, left: ar.left, w: ar.width, h: ar.height };

      const sr = aboutSection.getBoundingClientRect();
      aboutSecPageTop    = sr.top + sy;
      aboutSecPageBottom = sr.bottom + sy;
    };

    if (isMobile || isAndroid) {
      let rafId = 0;
      let resizeTimer = 0;

      const tick = () => {
        rafId = requestAnimationFrame(tick);
        const sy  = getScrollY();
        const vph = window.innerHeight;

        const heroVT  = hero.pageTop  - sy;
        const aboutVT = about.pageTop - sy;

        const phase2Start = aboutSecPageTop - vph;
        const phase3Start = aboutSecPageTop;

        if (sy < phase2Start) {
          frame.style.opacity = "1";
          frame.style.left = hero.left + "px";
          frame.style.top = heroVT + "px";
          frame.style.width = hero.w + "px";
          frame.style.height = hero.h + "px";
          frame.style.zIndex = "5";
          return;
        }

        if (sy < phase3Start) {
          const range = phase3Start - phase2Start;
          const p = range <= 0 ? 1 : (sy - phase2Start) / range;
          frame.style.opacity = "1";
          frame.style.left = (hero.left + (about.left - hero.left) * p) + "px";
          frame.style.top = (heroVT + (aboutVT - heroVT) * p) + "px";
          frame.style.width = (hero.w + (about.w - hero.w) * p) + "px";
          frame.style.height = (hero.h + (about.h - hero.h) * p) + "px";
          frame.style.zIndex = "5";
          return;
        }

        const top = aboutVT;

        if (top + about.h <= 0) {
          frame.style.opacity = "0";
          return;
        }

        frame.style.opacity = "1";
        frame.style.left = about.left + "px";
        frame.style.top = top + "px";
        frame.style.width = about.w + "px";
        frame.style.height = about.h + "px";
        frame.style.zIndex = "0";
      };

      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(measureAll, 150);
      };

      measureAll();
      frame.style.position = "fixed";
      rafId = requestAnimationFrame(tick);

      window.addEventListener("resize", onResize, { passive: true });
      window.visualViewport?.addEventListener("resize", onResize, { passive: true });
      window.addEventListener("orientationchange", onResize, { passive: true });

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
        img?.removeEventListener("load", measureAll);
      };
    }

    // ───── DESKTOP ─────
    let startRect = null;
    let endRect = null;
    let desktopRafId = 0;
    let resizeTimerId = 0;

    const captureRects = () => {
      const heroRect = heroAnchor.getBoundingClientRect();
      const aboutRect = aboutAnchor.getBoundingClientRect();
      const scrollY = getScrollY();
      startRect = { left: heroRect.left, top: heroRect.top + scrollY, width: heroRect.width, height: heroRect.height };
      endRect   = { left: aboutRect.left, top: aboutRect.top + scrollY, width: aboutRect.width, height: aboutRect.height };
      return startRect.width > 0 && endRect.width > 0;
    };

    const placeAt = (rect) => {
      if (!rect || rect.width === 0) return;
      gsap.set(frame, { position: "fixed", left: rect.left, top: rect.top - getScrollY(), width: rect.width, height: rect.height, opacity: 1 });
    };

    const moveImage = (progress) => {
      if (!startRect || !endRect) return;
      const p = gsap.utils.clamp(0, 1, progress);
      gsap.set(frame, {
        left: startRect.left + (endRect.left - startRect.left) * p,
        top: (startRect.top + (endRect.top - startRect.top) * p) - getScrollY(),
        width: startRect.width + (endRect.width - startRect.width) * p,
        height: startRect.height + (endRect.height - startRect.height) * p,
        opacity: 1,
      });
    };

    const init = () => { captureRects(); placeAt(startRect); ScrollTrigger.refresh(); };

    const trigger = ScrollTrigger.create({
      trigger: aboutSection, start: "top bottom", end: "top top",
      scrub: 1.2, invalidateOnRefresh: true,
      onUpdate: (self) => { moveImage(self.progress); },
      onLeave: () => { captureRects(); placeAt(endRect); setFrameZ(0); },
      onLeaveBack: () => { captureRects(); placeAt(startRect); setFrameZ(20); },
      onRefresh: (self) => { captureRects(); moveImage(self.progress); },
    });

    const settleTrigger = ScrollTrigger.create({
      trigger: aboutSection, start: "top top", end: "bottom top",
      onEnter: () => { captureRects(); placeAt(endRect); setFrameZ(0); },
      onUpdate: () => { if (endRect) gsap.set(frame, { top: endRect.top - getScrollY() }); },
      onEnterBack: () => { captureRects(); placeAt(endRect); setFrameZ(0); },
      onLeave: () => { gsap.set(frame, { opacity: 0 }); setFrameZ(20); },
      onLeaveBack: () => { captureRects(); placeAt(endRect); setFrameZ(10); },
    });

    const handleResize = () => {
      clearTimeout(resizeTimerId);
      resizeTimerId = setTimeout(() => { captureRects(); ScrollTrigger.refresh(); }, 80);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.visualViewport?.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });

    const img = frame.querySelector("img");
    img?.addEventListener("load", init, { once: true });
    document.fonts?.ready?.then(init).catch(init);
    desktopRafId = requestAnimationFrame(init);

    return () => {
      cancelAnimationFrame(desktopRafId);
      clearTimeout(resizeTimerId);
      window.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      img?.removeEventListener("load", init);
      trigger.kill();
      settleTrigger.kill();
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
      className="pointer-events-none fixed left-0 top-0 overflow-visible"
      style={{
        opacity: 0,
        willChange: "transform",
        transform: "translateZ(0)",
        zIndex: frameZ,
      }}
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