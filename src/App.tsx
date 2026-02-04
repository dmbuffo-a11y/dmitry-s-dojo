import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";

import Index from "./pages/Index";
import MyThrows from "./pages/MyThrows";
import MyVideos from "./pages/MyVideos";
import BeforeCompetition from "./pages/BeforeCompetition";
import WorkInProgress from "./pages/WorkInProgress";
import LondonJudo from "./pages/LondonJudo";
import TrendingNow from "./pages/TrendingNow";
import TechniqueAnalysis from "./pages/TechniqueAnalysis";
import Install from "./pages/Install";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function isYouTubeHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  return (
    h === "youtu.be" ||
    h === "youtube.com" ||
    h.endsWith(".youtube.com") ||
    h === "youtube-nocookie.com" ||
    h.endsWith(".youtube-nocookie.com")
  );
}

function normalizeYouTubeUrl(rawHref: string): string | null {
  const raw = (rawHref || "").trim();
  if (!raw) return null;

  // If a YouTube link was incorrectly routed through HashRouter,
  // it often looks like "#/https://youtube.com/..." or "#/www.youtube.com/..."
  const unwrapped = raw.replace(/^\/?#\/+/, ""); // removes "#/" or "/#/" prefixes

  let candidate = unwrapped;

  // Already absolute
  if (/^https?:\/\//i.test(candidate)) {
    // keep as-is
  } else if (candidate.startsWith("//")) {
    candidate = "https:" + candidate;
  } else if (
    /^www\./i.test(candidate) ||
    /^m\.youtube\.com/i.test(candidate) ||
    /^youtube\.com/i.test(candidate) ||
    /^youtu\.be/i.test(candidate) ||
    /^youtube-nocookie\.com/i.test(candidate)
  ) {
    candidate = "https://" + candidate;
  } else {
    return null;
  }

  try {
    const url = new URL(candidate);
    if (!isYouTubeHost(url.hostname)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function openExternal(url: string) {
  // Try new tab first; if blocked, fall back to same tab (important for Safari/iOS)
  const w = window.open(url, "_blank", "noopener,noreferrer");
  if (!w) window.location.assign(url);
}

function isLikelyInternalRoute(href: string): boolean {
  const h = href.trim();

  // ignore hash links already handled by HashRouter (like "#/my-throws")
  if (h.startsWith("#")) return false;

  // ignore external protocol-relative URLs
  if (h.startsWith("//")) return false;

  // internal routes usually start with "/" (e.g. "/my-throws")
  if (!h.startsWith("/")) return false;

  // if it's already "/#/" or "/#", it's already hash routing
  if (h.startsWith("/#")) return false;

  // Don't hijack file links like "/logo.png"
  const pathOnly = h.split(/[?#]/)[0];
  const lastSegment = pathOnly.split("/").filter(Boolean).pop() || "";
  if (lastSegment.includes(".")) return false;

  return true;
}

function GlobalLinkInterceptor() {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // Left click only, no modifier keys (so user can still Cmd+Click etc)
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as Element | null;
      if (!target) return;

      const a = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!a) return;

      const rawHref = (a.getAttribute("href") || "").trim();
      if (!rawHref || rawHref === "#") return;

      // 1) Fix YouTube links (even broken ones routed through #/)
      const yt = normalizeYouTubeUrl(rawHref);
      if (yt) {
        e.preventDefault();
        e.stopPropagation();
        openExternal(yt);
        return;
      }

      // 2) Fix internal navigation that mistakenly uses <a href="/route">
      if (isLikelyInternalRoute(rawHref)) {
        e.preventDefault();
        e.stopPropagation();
        navigate(rawHref);
        return;
      }
    };

    // Capture phase so we can intercept BEFORE React Router's <Link> logic if needed
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [navigate]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <GlobalLinkInterceptor />

        <Routes>
          <Route path="/" element={<Index />} />

          {/* Main routes */}
          <Route path="/my-throws" element={<MyThrows />} />
          <Route path="/my-videos" element={<MyVideos />} />
          <Route path="/before-competition" element={<BeforeCompetition />} />
          <Route path="/work-in-progress" element={<WorkInProgress />} />
          <Route path="/london-judo" element={<LondonJudo />} />
          <Route path="/trending" element={<TrendingNow />} />
          <Route path="/analysis" element={<TechniqueAnalysis />} />
          <Route path="/install" element={<Install />} />

          {/* Optional aliases (helps if somewhere links are shorter) */}
          <Route path="/throws" element={<MyThrows />} />
          <Route path="/videos" element={<MyVideos />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
