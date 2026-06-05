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
    };

    const placeAt = (rect) => {
      gsap.set(frame, {
        position: "fixed",
        left: rect.left,
        top: rect.top - window.scrollY,
        width: rect.width,
        height: rect.height,
        opacity: 1,
      });
    };

    const moveImage = (progress) => {
      captureRects();

      const left = startRect.left + (endRect.left - startRect.left) * progress;
      const top = startRect.top + (endRect.top - startRect.top) * progress;
      const width = startRect.width + (endRect.width - startRect.width) * progress;
      const height = startRect.height + (endRect.height - startRect.height) * progress;

      gsap.set(frame, {
        left,
        top: top - window.scrollY,
        width,
        height,
        opacity: 1,
      });
    };

    captureRects();
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
      captureRects();
      moveImage(trigger.progress);
    };

    window.addEventListener("resize", handleResize);
    const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.cancelAnimationFrame(refreshId);
      window.removeEventListener("resize", handleResize);
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
      className="pointer-events-none fixed left-0 top-0 z-20 overflow-visible opacity-0"
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
          fetchPriority="high"
          draggable="false"
          className="h-full w-full select-none object-contain object-bottom drop-shadow-[0_34px_48px_rgba(15,23,42,0.42)]"
        />
      </motion.button>
    </div>
  );
};

export default FloatingProfileImage;
