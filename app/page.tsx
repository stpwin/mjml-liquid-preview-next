"use client";

import { PreviewBuilder } from "@/components/previewer/preview-builder";
import { useReportWebVitals } from "next/web-vitals";
import { reportWebVitals } from "@/lib/analytics";

export default function Page() {
  useReportWebVitals(reportWebVitals);

  return <PreviewBuilder />;
}
