import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MyThrows from "./pages/MyThrows";
import BeforeCompetition from "./pages/BeforeCompetition";
import WorkInProgress from "./pages/WorkInProgress";
import LondonJudo from "./pages/LondonJudo";
import TrendingNow from "./pages/TrendingNow";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/my-throws" element={<MyThrows />} />
          <Route path="/before-competition" element={<BeforeCompetition />} />
          <Route path="/work-in-progress" element={<WorkInProgress />} />
          <Route path="/london-judo" element={<LondonJudo />} />
          <Route path="/trending" element={<TrendingNow />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
