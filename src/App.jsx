import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { useEffect } from "react";
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
import OakameLoader from "@/components/portfolio/OakameLoader";

const queryClient = new QueryClient();

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
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />}/>
    </Routes>
  );
};

const App = () => {
  return (<QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ThemeProvider>
        <TooltipProvider>
          <OakameLoader />
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
