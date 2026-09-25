import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { jobCategories, jobs } from "@/data";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Job Categories | ${siteConfig.shortName}`,
  description:
    "Browse overseas employment by job category: Drivers, Construction, Hospitality, Healthcare, Security, Electricians, Technicians, and more.",
  alternates: { canonical: "/job-categories" },
};

export default function JobCategoriesPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="bg-brand-black">
        <div className="container-padded py-8">
          <Breadcrumbs items={[{ label: "Job Categories" }]} className="text-slate-400 mb-3" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Job Categories Directory
          </h1>
          <p className="text-slate-400 text-sm">
            Explore overseas employment opportunities by profession and skill category.
          </p>
        </div>
      </div>

      <div className="container-padded py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobCategories.map((cat) => {
            const categoryJobs = jobs.filter(
              (job) => job.status === "active" && job.categorySlug === cat.slug
            );
            const hiringCountries = Array.from(
              new Set(categoryJobs.map((job) => job.countryName))
            );
            return (
            <article
              key={cat.slug}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col hover:border-[#0f1f3d] hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-brand-black text-teal-400 flex items-center justify-center font-bold text-xl">
                  {cat.name.charAt(0)}
                </div>
                <span className="badge badge-new">{categoryJobs.length} Sample Jobs</span>
              </div>

              <h2 className="text-xl font-bold text-[#0f1f3d] mb-2">{cat.name}</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                {cat.description}
              </p>

              <div className="border-t border-slate-100 pt-4 mb-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Destinations in Demo Jobs
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {hiringCountries.length ? hiringCountries.map((countryName) => (
                    <span
                      key={countryName}
                      className="text-xs bg-slate-100 text-slate-700 rounded-md px-2.5 py-1 capitalize"
                    >
                      {countryName}
                    </span>
                  )) : <span className="text-xs text-slate-500">No sample vacancies yet</span>}
                </div>
              </div>

              <Link
                href={`/job-categories/${cat.slug}`}
                className="btn btn-secondary btn-sm justify-between"
                aria-label={`View ${cat.name} vacancies`}
              >
                <span>View {cat.name} Jobs</span>
                <ArrowRight size={14} />
              </Link>
            </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
