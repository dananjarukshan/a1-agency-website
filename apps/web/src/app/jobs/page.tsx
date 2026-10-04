import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import JobsPageClient from "@/components/jobs/JobsPageClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Browse Overseas Jobs | ${siteConfig.shortName}`,
  description:
    "Search and browse overseas job vacancies for Sri Lankan workers. Filter by country, category, and experience level. Apply online.",
  alternates: { canonical: "/jobs" },
  openGraph: {
    title: `Browse Overseas Jobs | ${siteConfig.shortName}`,
    description: "Search overseas employment opportunities for Sri Lankans in the Middle East.",
    url: `${siteConfig.url}/jobs`,
  },
};

export default function JobsPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page header */}
      <div className="bg-brand-black">
        <div className="container-padded py-8">
          <Breadcrumbs
            items={[{ label: "Jobs" }]}
            className="text-slate-400 mb-3"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Overseas Job Vacancies
          </h1>
          <p className="text-slate-400 text-sm">
            Explore sample overseas employment opportunities for Sri Lankan professionals.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container-padded py-8">
        <Suspense fallback={<div className="text-center py-16 text-slate-500">Loading jobs...</div>}>
          <JobsPageClient />
        </Suspense>
      </div>
    </div>
  );
}
