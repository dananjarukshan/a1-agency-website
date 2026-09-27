import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { countries, jobs } from "@/data";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Recruitment Destinations | ${siteConfig.shortName}`,
  description:
    "Explore A-One's international recruitment markets across Asia, the Middle East, and Europe.",
  alternates: { canonical: "/countries" },
};

export default function CountriesPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="bg-brand-black">
        <div className="container-padded py-8">
          <Breadcrumbs items={[{ label: "Countries" }]} className="text-slate-400 mb-3" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Overseas Recruitment Destinations
          </h1>
          <p className="text-slate-400 text-sm">
            Discover foreign employment opportunities across key Middle Eastern and international destinations.
          </p>
        </div>
      </div>

      <div className="container-padded py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => {
            const jobCount = jobs.filter(
              (job) => job.status === "active" && job.country === country.slug
            ).length;
            return (
            <article
              key={country.slug}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col hover:border-[#0f1f3d] hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-4xl">{country.flag}</span>
                <span className="badge badge-new">{country.region}</span>
              </div>

              <h2 className="text-xl font-bold text-[#0f1f3d] mb-2">{country.name}</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                {country.summary}
              </p>

              <div className="border-t border-slate-100 pt-4 mb-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Popular Categories
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {country.popularCategories.map((cat) => (
                    <span
                      key={cat}
                      className="text-xs bg-slate-100 text-slate-700 rounded-md px-2.5 py-1"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-semibold text-teal-700 flex items-center gap-1.5">
                  <Briefcase size={14} />
                  {jobCount > 0
                    ? `${jobCount} Sample ${jobCount === 1 ? "Job" : "Jobs"}`
                    : "Recruiting market"}
                </span>
                <Link
                  href={`/countries/${country.slug}`}
                  className="btn btn-secondary btn-sm"
                  aria-label={`View jobs in ${country.name}`}
                >
                  Explore Jobs
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
