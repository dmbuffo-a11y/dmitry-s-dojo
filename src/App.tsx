import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";

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

/**
 * Extracts a usable YouTube URL from a messy string.
 * Handles cases like:
 * - "www.youtube.com/..."
 * - "#/https://youtube.com/..."
 * - "#/https:%2F%2Fyoutube.com%2Fwatch%3Fv%3D..."
 * - "some text ... https://youtu.be/ID ... other text"
 */
function extractYouTubeUrl(raw: string): string | null {
  let s = (raw || "").trim();
  if (!s) return null;

  // Remove common wrappers from HashRouter / accidental prefixes
  s = s.replace(/^\/?#\/+/, ""); // "#/..." or "/#/..."
  s = s.replace(/^\/+/, ""); // leading slashes

  // Try decodeURIComponent if it looks encoded
  if (/%[0-9A-Fa-f]{2}/.test(s)) {
    try {
      const decoded = decodeURIComponent(s);
      if (decoded) s = decoded.trim();
    } catch {
      // ignore decode failures
    }
  }

  // Fix "https:/youtube.com" (single slash) into "https://youtube.com"
  s = s.replace(/^https:\/(?!\/)/i, "https://");
  s = s.replace(/^http:\/(?!\/)/i, "http://");

  // Find first youtube-looking URL inside the string
  const re = /(https?:\/\/[^\s"'<>]+|(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be|youtube-nocookie\.com)\/[^\s"'<>]+)/i;

  const m = s.match(re);
  if (!m) return null;

  let candidate = m[0].trim();

  // Remove trailing punctuation that often gets stuck to links
  candidate = candidate.replace(/[)\].,;!?]+$/g, "");

  // Add scheme if missing
  if (!/^https?:\/\//i.test(candidate)) {
    candidate = "https://" + candidate.replace(/^\/+/, "");
  }

  // Force https (Safari + mixed content can be annoying)
  candidate = candidate.replace(/^http:\/\//i, "https://");

  try {
    const url = new URL(candidate);
    if (!isYouTubeHost(url.hostname)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function goToYouTube(url: string) {
  // The most Safari-proof way: same-tab navigation
  window.location.assign(url);
}

function isLikelyInternalRoute(href: string): boolean {
  const h = href.trim();
  if (!h) return false;

  // Already hash-based
  if (h.startsWith("#")) return false;

  // Protocol relative external
  if (h.startsWith("//")) return false;

  // Internal routes usually start with "/"
  if (!h.startsWith("/")) return false;

  // Already "/#..."
  if (h.startsWith("/#")) return false;

  // Don't hijack "/file.ext"
  const pathOnly = h.split(/[?#]/)[0];
  const last = pathOnly.split("/").filter(Boolean).pop() || "";
  if (last.includes(".")) return false;

  return true;
}

/**
 * 1) Intercepts <a href="..."> clicks:
 *    - If it's YouTube (even messy), open it reliably in Safari
 *    - If it's internal "/route" (but coded as <a>), use SPA navigate (no 404)
 */
function GlobalClickInterceptor() {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as Element | null;
      if (!target) return;

      const a = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!a) return;

      const rawHref = (a.getAttribute("href") || "").trim();
      if (!rawHref || rawHref === "#") return;

      const yt = extractYouTubeUrl(rawHref);
      if (yt) {
        e.preventDefault();
        e.stopPropagation();
        goToYouTube(yt);
        return;
      }

      if (isLikelyInternalRoute(rawHref)) {
        e.preventDefault();
        e.stopPropagation();
        navigate(rawHref);
      }
    };

    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [navigate]);

  return null;
}

/**
 * 2) Safety net: if ANY code navigates to a youtube-looking "route"
 * (e.g. navigate("youtube.com/...") or <Link to="...">), we redirect anyway.
 */
function ExternalNavigationGuard() {
  const location = useLocation();

  useEffect(() => {
    const combined = `${location.pathname}${location.search}${location.hash}`;
    const yt = extractYouTubeUrl(combined);
    if (yt) {
      // Replace so we don't keep broken internal routes in history
      window.location.replace(yt);
    }
  }, [location]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <GlobalClickInterceptor />
        <ExternalNavigationGuard />

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/my-throws" element={<MyThrows />} />
          <Route path="/my-videos" element={<MyVideos />} />
          <Route path="/before-competition" element={<BeforeCompetition />} />
          <Route path="/work-in-progress" element={<WorkInProgress />} />
          <Route path="/london-judo" element={<LondonJudo />} />
          <Route path="/trending" element={<TrendingNow />} />
          <Route path="/analysis" element={<TechniqueAnalysis />} />
          <Route path="/install" element={<Install />} />

          {/* Aliases just in case */}
          <Route path="/throws" element={<MyThrows />} />
          <Route path="/videos" element={<MyVideos />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
