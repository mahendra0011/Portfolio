const FALLBACK_DELAY_MS = 1400;

const linkedinWebUrl = "https://www.linkedin.com/in/mahendra-prajapati-73163930b";
const instagramWebUrl = "https://www.instagram.com/_mahendra._07";

const isPlainPrimaryClick = (event) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

const resolveAppUrl = (appUrl) => {
  if (!appUrl || typeof appUrl === "string") return appUrl;
  if (typeof window === "undefined") return appUrl.desktop || appUrl.ios || appUrl.android || "";

  const userAgent = window.navigator.userAgent;
  if (/android/i.test(userAgent) && appUrl.android) return appUrl.android;
  if (/iphone|ipad|ipod/i.test(userAgent) && appUrl.ios) return appUrl.ios;

  return appUrl.desktop || appUrl.ios || appUrl.android || "";
};

export const openInstalledApp = (event, appUrl, fallbackUrl) => {
  const resolvedAppUrl = resolveAppUrl(appUrl);

  if (!resolvedAppUrl || typeof window === "undefined" || !isPlainPrimaryClick(event)) {
    return;
  }

  event.preventDefault();

  let fallbackTimer;
  let cleanup = () => {};
  const onVisibilityChange = () => {
    if (document.visibilityState === "hidden") cleanup();
  };
  cleanup = () => {
    window.clearTimeout(fallbackTimer);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.removeEventListener("pagehide", cleanup);
  };

  document.addEventListener("visibilitychange", onVisibilityChange);
  window.addEventListener("pagehide", cleanup, { once: true });
  fallbackTimer = window.setTimeout(() => {
    cleanup();
    window.location.href = fallbackUrl;
  }, FALLBACK_DELAY_MS);

  window.location.href = resolvedAppUrl;
};

export const socialAppLinks = {
  linkedin: {
    href: linkedinWebUrl,
    appUrl: {
      android: `intent://www.linkedin.com/in/mahendra-prajapati-73163930b#Intent;scheme=https;package=com.linkedin.android;S.browser_fallback_url=${encodeURIComponent(linkedinWebUrl)};end`,
      ios: "linkedin://in/mahendra-prajapati-73163930b",
      desktop: "linkedin://in/mahendra-prajapati-73163930b",
    },
  },
  instagram: {
    href: instagramWebUrl,
    appUrl: {
      android: `intent://instagram.com/_mahendra._07#Intent;scheme=https;package=com.instagram.android;S.browser_fallback_url=${encodeURIComponent(instagramWebUrl)};end`,
      ios: "instagram://user?username=_mahendra._07",
      desktop: "instagram://user?username=_mahendra._07",
    },
  },
};
