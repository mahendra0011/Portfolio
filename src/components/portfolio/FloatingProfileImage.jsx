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

  useEffect(() => {
    const isAndroid = /Android/i.test(navigator.userAgent);

    // ── ANDROID FIX #1 ────────────────────────────────────────────────────────
    // ignoreMobileResize: Android Chrome's address bar fires resize events every
    // scroll. Without this, ScrollTrigger recalculates on EVERY pixel of scroll,
    // causing visible jitter and position jumps.
    // autoRefreshEvents: limits when ScrollTrigger re-measures layout to only
    // real page-load/visibility events, not address-bar noise.
    // (Windows/desktop: this block never runs — zero impact on desktop behaviour)
    // ─────────────────────────────────────────────────────────────────────────
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

    // ── ANDROID FIX #2 ────────────────────────────────────────────────────────
    // REMOVED: `window.deviceMemory <= 4` check.
    //
    // This was silently killing the entire floating-image animation on virtually
    // every Android device. Why: browsers intentionally cap the reported value of
    // `window.deviceMemory` at 8 GB to prevent fingerprinting, but Samsung,
    // Pixel, OnePlus and most other Android phones ALSO cap it at 4 GB regardless
    // of physical RAM. So a Galaxy S24 Ultra with 12 GB RAM reports deviceMemory
    // = 4, hits the `<= 4` check, and returns early — no animation at all.
    //
    // The check was supposed to skip low-end devices; it instead blocked ALL
    // Android. Removed entirely — modern Android handles this animation fine.
    // ─────────────────────────────────────────────────────────────────────────

    let startRect = null;
    let endRect = null;
    let rafId = 0;
    let resizeTimerId = 0;

    // ── ANDROID FIX #3 ────────────────────────────────────────────────────────
    // `window.scrollY` is undefined on very old Android WebViews and some
    // in-app browsers (Instagram, WhatsApp). `pageYOffset` is the safe fallback.
    // ─────────────────────────────────────────────────────────────────────────
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
      // ── ANDROID FIX #4 ──────────────────────────────────────────────────────
      // scrub: 1.2 on desktop gives a silky trailing feel with a mouse.
      // On Android, momentum scroll + scrub: 1.2 means the image lags visibly
      // behind the finger — the animation finishes AFTER the section has passed.
      // scrub: 0.6 on Android tracks the finger closely while still feeling smooth.
      // (Windows: still gets 1.2 — no change to desktop experience)
      // ────────────────────────────────────────────────────────────────────────
      scrub: isAndroid ? 0.6 : 1.2,
      invalidateOnRefresh: true,
      onUpdate: (self) => moveImage(self.progress),
      onLeave: () => {
        captureRects();
        placeAt(endRect);
      },
      onLeaveBack: () => {
        captureRects();
        placeAt(startRect);
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
      },
      onUpdate: () => {
        if (endRect) {
          gsap.set(frame, { top: endRect.top - getScrollY() });
        }
      },
      onEnterBack: () => {
        captureRects();
        placeAt(endRect);
      },
      onLeave: () => gsap.set(frame, { opacity: 0 }),
      onLeaveBack: () => {
        captureRects();
        placeAt(endRect);
      },
    });

    // ── ANDROID FIX #5 ────────────────────────────────────────────────────────
    // Debounce: 80ms was designed for desktop resize (window snap, browser chrome
    // toggle). Android fires rapid-fire resize events as the address bar shows
    // and hides during scroll — 80ms triggers on almost every event.
    // 220ms on Android batches the whole address-bar animation into one refresh.
    // ─────────────────────────────────────────────────────────────────────────
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

    // ── ANDROID FIX #6 ────────────────────────────────────────────────────────
    // Android lays out DOM slower than desktop due to:
    //   • Font loading (system fonts load asynchronously)
    //   • JS-heavy React renders (single threaded, slower CPU)
    //   • Chrome compositing layers being set up after first paint
    //
    // A single rAF fires before getBoundingClientRect() has stable values.
    // Extra delayed inits at 300ms + 900ms catch late layout reflows so the
    // image starts in exactly the right position.
    // ─────────────────────────────────────────────────────────────────────────
    rafId = requestAnimationFrame(() => {
      init();
      if (isAndroid) {
        setTimeout(init, 300);
        setTimeout(init, 900);
      }
    });

    // ── ANDROID FIX #7 ────────────────────────────────────────────────────────
    // ResizeObserver watches the anchor elements directly. On Android, the hero
    // and about anchors can shift in size after init (lazy images loading, font
    // metrics settling, keyboard popping up). This catches those mid-session
    // layout changes without needing the user to scroll to trigger a re-measure.
    // ─────────────────────────────────────────────────────────────────────────
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
    // ── ANDROID FIX #8 ──────────────────────────────────────────────────────
    // Added `willChange: "transform"` to the frame wrapper. This forces the
    // browser to promote this element to its own GPU compositing layer BEFORE
    // GSAP starts animating it. Without this, Android repaints the element on
    // every frame instead of compositing it — causing dropped frames / jank.
    // `transform: translateZ(0)` is the fallback for older Android WebViews.
    // (Windows: GPU compositing was already happening implicitly via GSAP)
    // ────────────────────────────────────────────────────────────────────────
    <div
      ref={frameRef}
      className="pointer-events-none fixed left-0 top-0 z-20 overflow-visible"
      style={{
        opacity: 0,
        willChange: "transform",
        transform: "translateZ(0)",
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