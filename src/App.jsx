import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/useTheme";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { store } from "@/store/portfolioStore";
import Index from "./pages/Index.jsx";
import NotFound from "./pages/NotFound.jsx";
import Resume from "./components/portfolio/Resume.jsx";
const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();

  useSmoothScroll();

  useEffect(() => {
    if (!location.hash) return undefined;

    let timeoutId;
    let attempts = 0;

    const scrollToHash = () => {
      const target = document.querySelector(location.hash);

      if (target) {
        const headerOffset = 80;
        const lenis = window.__portfolioLenis;

        if (lenis?.scrollTo) {
          lenis.scrollTo(target, { offset: -headerOffset });
        } else {
          const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;

          window.scrollTo({
            top: Math.max(top, 0),
            behavior: "smooth",
          });
        }
        return;
      }

      if (attempts < 20) {
        attempts += 1;
        timeoutId = window.setTimeout(scrollToHash, 50);
      }
    };

    timeoutId = window.setTimeout(scrollToHash, 50);

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

const App = () => (<QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </Provider>
  </QueryClientProvider>);
export default App;
