import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/useTheme";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { scrollToHash } from "@/lib/scrollToHash";
import { store } from "@/store/portfolioStore";
import Index from "./pages/Index.jsx";
import NotFound from "./pages/NotFound.jsx";
import Resume from "./components/portfolio/Resume.jsx";
const queryClient = new QueryClient();
const loaderWords = ["MAHENDRA", "PRAJAPATI"];

const AppRoutes = () => {
  const location = useLocation();

  useSmoothScroll();

  useEffect(() => {
    if (!location.hash) return undefined;

    let timeoutId;
    let attempts = 0;

    const tryScrollToHash = () => {
      if (scrollToHash(location.hash, { updateHash: false })) {
        return;
      }

      if (attempts < 20) {
        attempts += 1;
        timeoutId = window.setTimeout(tryScrollToHash, 50);
      }
    };

    timeoutId = window.setTimeout(tryScrollToHash, 50);

    return () => window.clearTimeout(timeoutId);
  }, [location.hash, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Index />}/>
      <Route path="/resume" element={<Resume />}/>
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />}/>
    </Routes>
  );
};

const LoadingScreen = () => (
  <div className="portfolio-loader" role="status" aria-live="polite" aria-label="Mahendra Prajapati. Rendering dynamic state...">
    <div className="portfolio-loader-content">
      <h1 className="portfolio-loader-name" aria-label="Mahendra Prajapati">
        {loaderWords.map((word, wordIndex) => (
          <span key={word} className="portfolio-loader-word" style={{ "--word-index": wordIndex }} aria-hidden="true">
            {[...word].map((letter, index) => (
              <span key={`${letter}-${index}`} style={{ "--char-index": index }}>{letter}</span>
            ))}
          </span>
        ))}
      </h1>
      <p className="portfolio-loader-status">Rendering dynamic state...</p>
      <div className="portfolio-loader-progress" aria-hidden="true">
        <span />
      </div>
    </div>
  </div>
);

const App = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const minDuration = 500;
    const startTime = performance.now();
    let fallbackId;
    let hideId;

    const hideLoader = () => {
      window.clearTimeout(fallbackId);
      const remaining = Math.max(0, minDuration - (performance.now() - startTime));
      hideId = window.setTimeout(() => setShowLoader(false), remaining);
    };

    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader, { once: true });
      fallbackId = window.setTimeout(hideLoader, 1200);
    }

    return () => {
      window.removeEventListener("load", hideLoader);
      window.clearTimeout(fallbackId);
      window.clearTimeout(hideId);
    };
  }, []);

  useEffect(() => {
    if (!showLoader) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [showLoader]);

  return (<QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ThemeProvider>
        <TooltipProvider>
          {showLoader && <LoadingScreen />}
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </Provider>
  </QueryClientProvider>);
};
export default App;
