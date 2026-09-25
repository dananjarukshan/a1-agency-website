import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import JobCard from "@/components/jobs/JobCard";
import EmptyState from "@/components/common/EmptyState";
import { countries, jobs } from "@/data";
import { siteConfig } from "@/config/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const country = countries.find((c) => c.slug === slug);
  if (!country) return {};
  return {
    title: `Jobs in ${country.name} for Sri Lankans | ${siteConfig.shortName}`,
    description: `Browse sample overseas job vacancies in ${country.name} for Sri Lankan workers. Explore vacancy presentation, salaries, requirements, and application UX.`,
    alternates: { canonical: `/countries/${country.slug}` },
  };
}

export default async function CountryPage({ params }: Props) {
  const { slug } = await params;
  const country = countries.find((c) => c.slug === slug);

  if (!country) notFound();

  const countryJobs = jobs.filter((j) => j.country === country.slug && j.status === "active");

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="bg-brand-black">
        <div className="container-padded py-10">
          <Breadcrumbs
            items={[
              { label: "Countries", href: "/countries" },
              { label: country.name },
            ]}
            className="text-slate-400 mb-4"
          />
          <div className="flex items-center gap-4 mb-3">
            <span className="text-5xl">{country.flag}</span>
            <div>
              <h1 className="text-3xl font-bold text-white leading-tight">
                Jobs in {country.name}
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Foreign employment opportunities for Sri Lankan workers in {country.name}.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-padded py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Summary */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-[#0f1f3d] mb-3">
              Employment Overview – {country.name}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {country.summary}
            </p>
            <h3 className="text-sm font-bold text-[#0f1f3d] mb-3">
              Illustrative Job Categories for {country.name}:
            </h3>
            <div className="flex flex-wrap gap-2">
              {country.popularCategories.map((cat) => (
                <span
                  key={cat}
                  className="bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Quick info */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-base font-bold text-[#0f1f3d] mb-4">Recruitment Info</h2>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
                <span>Regulatory steps confirmed for each live role</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
                <span>Benefits and conditions shown separately for every published role</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
                <span>Country-specific visa and legal facts added only after verification</span>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href={`/jobs?country=${country.slug}`}
                className="btn btn-primary w-full justify-center text-sm"
              >
                Filter All {country.name} Jobs
              </Link>
            </div>
          </div>
        </div>

        {/* Jobs list */}
        <div>
          <h2 className="text-xl font-bold text-[#0f1f3d] mb-6">
            Sample Vacancies in {country.name} ({countryJobs.length})
          </h2>

          {countryJobs.length === 0 ? (
            <EmptyState
              title={`No Active Jobs in ${country.name}`}
              description="There are no sample vacancies for this country yet. Browse the other demonstration roles or connect live job data later."
              actionLabel="View All Jobs"
              actionHref="/jobs"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countryJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
