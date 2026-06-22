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
  const [frameZ, setFrameZ] = useState(20); // FIX 2 & 3: dynamic z-index

  useEffect(() => {
    const isAndroid = /Android/i.test(navigator.userAgent);

    if (isAndroid) {
      ScrollTrigger.config({
        ignoreMobileResize: true,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      });
    }

    const frame = frameRef.current;
    const heroAnchor = document.getElementById("hero-photo-anchor");
    const aboutAnchor = document.getElementById("about-photo-anchor");
    const aboutSection = document.getElementById("about");

    if (!frame || !heroAnchor || !aboutAnchor || !aboutSection) {
      console.log("[FloatingImage] Missing elements:", {
        frame: !!frame,
        hero: !!heroAnchor,
        about: !!aboutAnchor,
        section: !!aboutSection,
      });
      return;
    }

    let startRect = null;
    let endRect = null;
    let rafId = 0;
    let resizeTimerId = 0;

    const getScrollY = () => window.scrollY ?? window.pageYOffset ?? 0;

    const captureRects = () => {
      const heroRect = heroAnchor.getBoundingClientRect();
      const aboutRect = aboutAnchor.getBoundingClientRect();
      const scrollY = getScrollY();

      startRect = {
        left: heroRect.left,
        top: heroRect.top + scrollY,
        width: heroRect.width,
        height: heroRect.height,
      };

      endRect = {
        left: aboutRect.left,
        top: aboutRect.top + scrollY,
        width: aboutRect.width,
        height: aboutRect.height,
      };

      return startRect.width > 0 && endRect.width > 0;
    };

    const placeAt = (rect) => {
      if (!rect || rect.width === 0) return;
      gsap.set(frame, {
        position: "fixed",
        left: rect.left,
        top: rect.top - getScrollY(),
        width: rect.width,
        height: rect.height,
        opacity: 1,
      });
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

    const init = () => {
      captureRects();
      placeAt(startRect);
      ScrollTrigger.refresh();
    };

    const trigger = ScrollTrigger.create({
      trigger: aboutSection,
      start: "top bottom",
      end: "top top",
      scrub: isAndroid ? 0.6 : 1.2,
      invalidateOnRefresh: true,

      // FIX 1: direction === 1 means scrolling DOWN only
      // Scroll up karne par image hero pe wapas nahi jayegi
      onUpdate: (self) => {
        if (self.direction === 1) {
          moveImage(self.progress);
        }
      },

      onLeave: () => {
        captureRects();
        placeAt(endRect);
        setFrameZ(0); // FIX 2: about section mein text ke PEECHE
      },

      onLeaveBack: () => {
        captureRects();
        placeAt(startRect);
        setFrameZ(20); // Hero pe wapas — z-index restore
      },

      onRefresh: (self) => {
        captureRects();
        moveImage(self.progress);
      },
    });

    const settleTrigger = ScrollTrigger.create({
      trigger: aboutSection,
      start: "top top",
      end: "bottom top",

      onEnter: () => {
        captureRects();
        placeAt(endRect);
        setFrameZ(0); // FIX 3: about mein settle — text visible rahega
      },

      onUpdate: () => {
        if (endRect) {
          gsap.set(frame, { top: endRect.top - getScrollY() });
        }
      },

      onEnterBack: () => {
        captureRects();
        placeAt(endRect);
        setFrameZ(0); // About mein wapas aane par bhi text ke peeche
      },

      onLeave: () => {
        gsap.set(frame, { opacity: 0 });
        setFrameZ(20); // About section se baad — restore
      },

      onLeaveBack: () => {
        captureRects();
        placeAt(endRect);
        setFrameZ(10); // Transition state — thoda visible
      },
    });

    const handleResize = () => {
      clearTimeout(resizeTimerId);
      resizeTimerId = setTimeout(
        () => { captureRects(); ScrollTrigger.refresh(); },
        isAndroid ? 220 : 80
      );
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.visualViewport?.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });

    const img = frame.querySelector("img");
    img?.addEventListener("load", init, { once: true });
    document.fonts?.ready?.then(init).catch(init);

    rafId = requestAnimationFrame(() => {
      init();
      if (isAndroid) {
        setTimeout(init, 300);
        setTimeout(init, 900);
      }
    });

    let resizeObserver = null;
    if (isAndroid && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        clearTimeout(resizeTimerId);
        resizeTimerId = setTimeout(() => {
          captureRects();
          ScrollTrigger.refresh();
        }, 120);
      });
      resizeObserver.observe(heroAnchor);
      resizeObserver.observe(aboutAnchor);
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimerId);
      window.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      img?.removeEventListener("load", init);
      trigger.kill();
      settleTrigger.kill();
      resizeObserver?.disconnect();
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
        zIndex: frameZ, // FIX 2 & 3: dynamic z-index via state
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