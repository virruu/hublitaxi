"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import {
  GA_MEASUREMENT_ID,
  isAnalyticsEnabled,
  trackContact,
  trackPageView,
} from "@/lib/analytics";

function AnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    trackPageView(query ? `${pathname}?${query}` : pathname);
  }, [pathname, searchParams]);

  return null;
}

/** Delegates click tracking for server-rendered tel / WhatsApp links. */
function AnalyticsClickListener() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest(
        "[data-analytics]"
      );
      if (!target) return;

      const action = target.getAttribute("data-analytics");
      const location = target.getAttribute("data-analytics-location") ?? "unknown";

      if (action === "call") trackContact("Phone", location);
      if (action === "whatsapp") trackContact("WhatsApp", location);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

export function Analytics() {
  if (!isAnalyticsEnabled() || !GA_MEASUREMENT_ID) return null;

  return (
    <>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      <AnalyticsClickListener />
      <Suspense fallback={null}>
        <AnalyticsPageView />
      </Suspense>
    </>
  );
}
