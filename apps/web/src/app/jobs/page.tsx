import type { Metadata } from "next";
import { Suspense } from "react";
import JobsPageClient from "@/components/jobs/JobsPageClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `Overseas Jobs | ${siteConfig.name}` },
  description: "Explore sample overseas opportunities for Sri Lankan candidates. Search by destination, career field, experience and monthly salary in LKR.",
  alternates: { canonical: "/jobs" },
  openGraph: {
    title: `Overseas Jobs | ${siteConfig.name}`,
    description: "Explore sample overseas recruitment opportunities for Sri Lankan candidates.",
    url: `${siteConfig.url}/jobs`,
  },
};

export default function JobsPage() {
  return <Suspense fallback={<div className="container-padded py-16" role="status">Loading opportunities…</div>}><JobsPageClient /></Suspense>;
}
