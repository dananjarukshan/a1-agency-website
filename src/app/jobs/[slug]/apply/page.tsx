import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ApplicationForm from "@/components/forms/ApplicationForm";
import { jobs } from "@/data";
import { siteConfig } from "@/config/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);
  if (!job) return {};
  return {
    title: `Apply for ${job.title} – ${job.countryName} | ${siteConfig.shortName}`,
    description: `Online job application for ${job.title} in ${job.countryName}. Ref: ${job.reference}. Submit your details and CV online.`,
    alternates: { canonical: `/jobs/${job.slug}/apply` },
  };
}

export default async function JobApplyPage({ params }: Props) {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);

  if (!job) notFound();

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Header */}
      <div className="bg-[#0f1f3d]">
        <div className="container-padded py-8">
          <Breadcrumbs
            items={[
              { label: "Jobs", href: "/jobs" },
              { label: job.title, href: `/jobs/${job.slug}` },
              { label: "Apply Online" },
            ]}
            className="text-slate-400 mb-3"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Online Job Application
          </h1>
          <p className="text-slate-400 text-sm">
            Complete the form below to apply for the {job.title} position in {job.countryName}.
          </p>
        </div>
      </div>

      {/* Form container */}
      <div className="container-padded py-8 max-w-3xl">
        <ApplicationForm job={job} />
      </div>
    </div>
  );
}
