import { type Metric } from "web-vitals";

export function reportWebVitals(metric: Metric) {
  // You can send the metric to any analytics service
  // For example, if using Vercel Analytics:
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    const body = JSON.stringify({
      dsn: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID, // Analytics ID
      event: "web-vitals",
      payload: {
        name: metric.name,
        value: metric.value,
        id: metric.id,
        page: window.location.pathname,
        href: window.location.href,
      },
    });

    // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
    const url = "https://vitals.vercel-analytics.com/v1/vitals";
    (navigator.sendBeacon && navigator.sendBeacon(url, body)) ||
      fetch(url, {
        body,
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
      });
  } else {
    // Log metrics in development
    console.log({
      name: metric.name,
      value: metric.value,
      id: metric.id,
      startTime: metric.startTime,
      label: metric.label,
      attribution: metric.attribution,
    });
  }
} 