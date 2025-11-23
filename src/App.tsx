import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import WhereToFindUs from "./pages/WhereToFindUs";
import NotFound from "./pages/NotFound";

// Cal.com type declaration
declare global {
  interface Window {
    Cal?: (action: string, options?: Record<string, unknown>) => void;
  }
}

const queryClient = new QueryClient();

const App = () => {
  // Load Cal.com embed script globally once using the inline method
  useEffect(() => {
    // Check if Cal namespace already exists
    if (!document.querySelector('script[src*="cal.com/embed"]')) {
      console.log("Loading Cal.com embed script (inline method)...");
      
      // Use Cal.com's recommended inline embed method
      const calInlineScript = `
        (function (C, A, L) { 
          let p = function (a, ar) { 
            a.q.push(ar); 
          }; 
          let d = C.document; 
          C.Cal = C.Cal || function () { 
            let cal = C.Cal; 
            let ar = arguments; 
            if (!cal.q) { 
              cal.q = []; 
            } 
            cal.q.push(ar); 
            return cal; 
          }; 
          let s = d.createElement("script"); 
          s.src = A; 
          s.async = true; 
          s.onload = function() {
            console.log("✅ Cal.com script loaded and initialized");
            if (window.Cal && window.Cal.q) {
              console.log("✅ Cal namespace is ready");
            }
          };
          s.onerror = function() {
            console.error("❌ Failed to load Cal.com script");
          };
          d.head.appendChild(s); 
        })(window, "https://app.cal.com/embed/embed.js", "init");
      `;
      
      const script = document.createElement("script");
      script.innerHTML = calInlineScript;
      script.id = "cal-com-inline-script";
      document.head.appendChild(script);
      
      console.log("✅ Cal.com inline embed initialized");
    } else {
      console.log("Cal.com script already loaded");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/about" element={<About />} />
              <Route path="/location" element={<WhereToFindUs />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
