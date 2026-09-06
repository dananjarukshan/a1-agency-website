import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import JobCard from "@/components/jobs/JobCard";
import EmptyState from "@/components/common/EmptyState";
import { jobCategories, jobs } from "@/data";
import { siteConfig } from "@/config/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return jobCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = jobCategories.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.name} Overseas Jobs | ${siteConfig.shortName}`,
    description: `Find ${category.name} job vacancies abroad for Sri Lankans. ${category.description}`,
    alternates: { canonical: `/job-categories/${category.slug}` },
  };
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const category = jobCategories.find((c) => c.slug === slug);

  if (!category) notFound();

  const categoryJobs = jobs.filter((j) => j.categorySlug === category.slug && j.status === "active");

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="bg-[#0f1f3d]">
        <div className="container-padded py-10">
          <Breadcrumbs
            items={[
              { label: "Job Categories", href: "/job-categories" },
              { label: category.name },
            ]}
            className="text-slate-400 mb-4"
          />
          <h1 className="text-3xl font-bold text-white leading-tight mb-2">
            {category.name} Overseas Jobs
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl">
            {category.description}
          </p>
        </div>
      </div>

      <div className="container-padded py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#0f1f3d]">
            Sample {category.name} Vacancies ({categoryJobs.length})
          </h2>
          <Link href="/jobs" className="text-sm font-semibold text-teal-700 hover:underline">
            View All Categories & Jobs
          </Link>
        </div>

        {categoryJobs.length === 0 ? (
          <EmptyState
            title={`No Sample Jobs in ${category.name}`}
            description="There are no demonstration vacancies in this category yet. Browse the other sample roles or connect live job data later."
            actionLabel="View All Jobs"
            actionHref="/jobs"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
