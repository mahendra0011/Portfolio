const HEADER_OFFSET = 80;
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export const scrollToHash = (hash, { updateHash = true } = {}) => {
  if (typeof window === "undefined" || !hash?.startsWith("#")) return false;

  const target = document.querySelector(hash);
  if (!target) return false;

  const top = Math.max(target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET, 0);

  if (updateHash && window.location.hash !== hash) {
    window.history.pushState(null, "", `${window.location.pathname}${window.location.search}${hash}`);
  }

  if (window.__portfolioLenis?.scrollTo) {
    window.__portfolioLenis.scrollTo(top, {
      duration: 1.05,
      easing: easeOutCubic,
    });
  } else {
    window.scrollTo({
      top,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }

  return true;
};

export const handleHashLinkClick = (event, hash) => {
  if (!hash?.startsWith("#")) return;

  if (scrollToHash(hash)) {
    event.preventDefault();
  }
};
