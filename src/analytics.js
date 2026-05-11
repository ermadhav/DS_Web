// ============================================================
// Dev Streaks — Unified Analytics Module
// Supports: Google Analytics 4, Microsoft Clarity, Vercel Analytics
// ============================================================

const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;
const CLARITY_ID = import.meta.env.VITE_CLARITY_PROJECT_ID;

// ── Google Analytics 4 ──────────────────────────────────────
export function initGA4() {
  if (!GA4_ID) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA4_ID, {
    send_page_view: true,
    cookie_flags: "SameSite=None;Secure",
  });
}

// ── Microsoft Clarity ───────────────────────────────────────
export function initClarity() {
  if (!CLARITY_ID) return;

  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_ID);
}

// ── Unified Event Tracking ──────────────────────────────────
export function trackEvent(eventName, params = {}) {
  if (window.gtag) {
    window.gtag("event", eventName, params);
  }
  if (window.clarity) {
    window.clarity("set", eventName, JSON.stringify(params));
  }
  if (import.meta.env.DEV) {
    console.log(`[Analytics] ${eventName}`, params);
  }
}

// ── Conversion: APK Download ────────────────────────────────
export function trackAPKDownload(source = "unknown") {
  trackEvent("apk_download", {
    event_category: "conversion",
    event_label: source,
    value: 1,
  });
  if (window.gtag && GA4_ID) {
    window.gtag("event", "conversion", {
      send_to: GA4_ID,
      event_category: "download",
      event_label: "apk_download",
    });
  }
}

// ── CTA Click ───────────────────────────────────────────────
export function trackCTAClick(ctaName, location) {
  trackEvent("cta_click", {
    event_category: "engagement",
    event_label: ctaName,
    cta_location: location,
  });
}

// ── Navigation Click ────────────────────────────────────────
export function trackNavClick(linkName) {
  trackEvent("nav_click", {
    event_category: "navigation",
    event_label: linkName,
  });
}

// ── Social Link Click ───────────────────────────────────────
export function trackSocialClick(platform) {
  trackEvent("social_click", {
    event_category: "engagement",
    event_label: platform,
    social_network: platform,
  });
}

// ── Screenshot Carousel ─────────────────────────────────────
export function trackScreenshotScroll(direction) {
  trackEvent("screenshot_scroll", {
    event_category: "engagement",
    scroll_direction: direction,
  });
}

// ── Feature Hover ───────────────────────────────────────────
export function trackFeatureHover(featureName) {
  trackEvent("feature_hover", {
    event_category: "engagement",
    event_label: featureName,
  });
}

// ── Contact Click ───────────────────────────────────────────
export function trackContactClick(type, value) {
  trackEvent("contact_click", {
    event_category: "engagement",
    event_label: type,
    contact_value: value,
  });
}

// ── Scroll Depth ────────────────────────────────────────────
export function initScrollTracking() {
  const thresholds = [25, 50, 75, 100];
  const tracked = new Set();

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const pct = Math.round((scrollTop / docHeight) * 100);

    thresholds.forEach((t) => {
      if (pct >= t && !tracked.has(t)) {
        tracked.add(t);
        trackEvent("scroll_depth", {
          event_category: "engagement",
          event_label: `${t}%`,
          value: t,
        });
      }
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}

// ── Session Start ───────────────────────────────────────────
export function trackSessionStart() {
  const isReturning = localStorage.getItem("ds_visited");

  trackEvent("session_start", {
    event_category: "session",
    user_type: isReturning ? "returning" : "new",
    referrer: document.referrer || "direct",
  });

  if (!isReturning) {
    localStorage.setItem("ds_visited", "true");
    localStorage.setItem("ds_first_visit", new Date().toISOString());
  }
}

// ── Time on Page ────────────────────────────────────────────
export function initTimeTracking() {
  const startTime = Date.now();

  const trackTime = () => {
    const seconds = Math.round((Date.now() - startTime) / 1000);
    trackEvent("time_on_page", {
      event_category: "engagement",
      value: seconds,
      event_label: `${seconds}s`,
    });
  };

  window.addEventListener("beforeunload", trackTime);
  return () => window.removeEventListener("beforeunload", trackTime);
}

// ── Master Init ─────────────────────────────────────────────
export function initAnalytics() {
  initGA4();
  initClarity();
  trackSessionStart();

  const cleanupScroll = initScrollTracking();
  const cleanupTime = initTimeTracking();

  return () => {
    cleanupScroll();
    cleanupTime();
  };
}
