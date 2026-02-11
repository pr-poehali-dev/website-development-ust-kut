import { useEffect } from "react";

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
  }
}
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Development from "./pages/Development";
import SEO from "./pages/SEO";
import Design from "./pages/Design";
import Marketing from "./pages/Marketing";
import Marketplaces from "./pages/Marketplaces";
import Portfolio from "./pages/Portfolio";
import PortfolioProject from "./pages/PortfolioProject";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Yandex.Metrika hook for tracking page views
function useYandexMetrika() {
  const location = useLocation();

  useEffect(() => {
    // Send pageview to Yandex.Metrika on route change
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(106521597, 'hit', location.pathname + location.search);
    }
  }, [location]);
}

function AppRoutes() {
  useYandexMetrika();

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/development" element={<Development />} />
      <Route path="/seo" element={<SEO />} />
      <Route path="/design" element={<Design />} />
      <Route path="/marketing" element={<Marketing />} />
      <Route path="/marketplaces" element={<Marketplaces />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/portfolio/:slug" element={<PortfolioProject />} />
      <Route path="/blog" element={<Blog />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;