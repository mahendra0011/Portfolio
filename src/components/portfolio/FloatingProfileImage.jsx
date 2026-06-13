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
    const frame = frameRef.current;
    const heroAnchor = document.getElementById("hero-photo-anchor");
    const aboutAnchor = document.getElementById("about-photo-anchor");
    const aboutSection = document.getElementById("about");

    if (!frame || !heroAnchor || !aboutAnchor || !aboutSection) return undefined;

    let startRect = null;
    let endRect = null;
    let resizeTimer = 0;
    let scrollFrame = 0;
    const visualViewport = window.visualViewport;

    const hasUsableRect = (rect) => rect && rect.width > 0 && rect.height > 0;

    const getAboutPageTop = () => aboutSection.getBoundingClientRect().top + window.scrollY;

    const getManualProgress = () => {
      const aboutTop = getAboutPageTop();
      const start = aboutTop - window.innerHeight;
      const end = aboutTop;

      if (end <= start) return 1;
      return gsap.utils.clamp(0, 1, (window.scrollY - start) / (end - start));
    };

    const captureRects = () => {
      const scrollY = window.scrollY;
      const heroRect = heroAnchor.getBoundingClientRect();
      const aboutRect = aboutAnchor.getBoundingClientRect();

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

      return hasUsableRect(startRect) && hasUsableRect(endRect);
    };

    const placeAt = (rect) => {
      if (!hasUsableRect(rect)) return;

      gsap.set(frame, {
        position: "fixed",
        left: rect.left,
        top: rect.top - window.scrollY,
        width: rect.width,
        height: rect.height,
        opacity: 1,
        x: 0,
        y: 0,
      });
    };

    const moveImage = (progress = 0) => {
      if (!captureRects()) return;

      const safeProgress = gsap.utils.clamp(0, 1, progress);
      const left = startRect.left + (endRect.left - startRect.left) * safeProgress;
      const top = startRect.top + (endRect.top - startRect.top) * safeProgress;
      const width = startRect.width + (endRect.width - startRect.width) * safeProgress;
      const height = startRect.height + (endRect.height - startRect.height) * safeProgress;

      gsap.set(frame, {
        left,
        top: top - window.scrollY,
        width,
        height,
        opacity: 1,
      });
    };

    if (!captureRects()) return undefined;
    placeAt(startRect);

    const trigger = ScrollTrigger.create({
      trigger: aboutSection,
      start: "top bottom",
      end: "top top",
      scrub: true,
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
      onRefresh: (self) => moveImage(self.progress),
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
        captureRects();
        placeAt(endRect);
      },
      onEnterBack: () => {
        captureRects();
        placeAt(endRect);
      },
      onLeave: () => {
        gsap.set(frame, { opacity: 0 });
      },
      onLeaveBack: () => {
        captureRects();
        placeAt(endRect);
      },
    });

    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        moveImage(getManualProgress());
        ScrollTrigger.refresh();
      }, 80);
    };

    const syncToScroll = () => {
      scrollFrame = 0;

      if (window.scrollY > getAboutPageTop() + aboutSection.offsetHeight) {
        gsap.set(frame, { opacity: 0 });
        return;
      }

      moveImage(getManualProgress());
    };

    const handleScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(syncToScroll);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("orientationchange", handleResize);
    visualViewport?.addEventListener("resize", handleResize);

    const image = frame.querySelector("img");
    image?.addEventListener("load", handleResize, { once: true });
    document.fonts?.ready?.then(handleResize).catch(() => {});

    const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.cancelAnimationFrame(refreshId);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("orientationchange", handleResize);
      visualViewport?.removeEventListener("resize", handleResize);
      image?.removeEventListener("load", handleResize);
      trigger.kill();
      settleTrigger.kill();
    };
  }, []);

  useEffect(() => {
    return () => window.clearTimeout(zoomTimer.current);
  }, []);

  const handlePhotoClick = () => {
    window.clearTimeout(zoomTimer.current);
    setZoomed(true);
    zoomTimer.current = window.setTimeout(() => setZoomed(false), 520);
  };

  return (
    <div
      ref={frameRef}
      className="floating-profile-frame pointer-events-none fixed left-0 top-0 z-20 overflow-visible opacity-0"
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
