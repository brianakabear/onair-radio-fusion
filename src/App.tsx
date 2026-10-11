import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AudioProvider } from "@/contexts/AudioContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { runDailyValidation } from "@/utils/routeValidation";
import MiniPlayer from "@/components/MiniPlayer";
import Index from "./pages/Index";
import About from "./pages/About";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import Contact from "./pages/Contact";
import ListenLive from "./pages/ListenLive";
import Videos from "./pages/Videos";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Chat from "./pages/Chat";
import Admin from "./pages/Admin";
import Requests from "./pages/Requests";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  // Run validation on app startup and then daily
  useEffect(() => {
    // Run initial validation
    runDailyValidation();
    
    // Set up daily validation (every 24 hours)
    const dailyValidation = setInterval(() => {
      runDailyValidation();
    }, 24 * 60 * 60 * 1000); // 24 hours
    
    return () => clearInterval(dailyValidation);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <AuthProvider>
          <AudioProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsArticle />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/listen-live" element={<ListenLive />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/requests" element={<Requests />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <MiniPlayer />
          </BrowserRouter>
          </AudioProvider>
        </AuthProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
