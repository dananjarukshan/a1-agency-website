import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin, Calendar, Briefcase, Users, Clock, DollarSign,
  ArrowRight, CheckCircle, AlertCircle, Building, FileText,
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import JobCard from "@/components/jobs/JobCard";
import ShareJobButton from "@/components/jobs/ShareJobButton";
import { jobs } from "@/data";
import { formatDate, isClosingSoon, whatsappUrl, jobWhatsappMessage } from "@/lib/utils";
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
    title: `${job.title} – ${job.countryName} | ${siteConfig.shortName}`,
    description: `${job.title} vacancy in ${job.countryName}. ${job.vacancies} vacancies. Salary: ${job.salaryDisplay}. Ref: ${job.reference}. Apply online.`,
    openGraph: {
      title: `${job.title} – ${job.countryName}`,
      description: job.description.slice(0, 155),
      url: `${siteConfig.url}/jobs/${job.slug}`,
    },
    alternates: { canonical: `/jobs/${job.slug}` },
  };
}

function InfoRow({ label, value, icon: Icon }: { label: string; value: string; icon: React.ElementType }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
      <Icon size={15} className="text-slate-400 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-xs text-slate-500 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-[#0f1f3d]">{value}</p>
      </div>
    </div>
  );
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);

  if (!job) notFound();

  const closingSoon = isClosingSoon(job.closingDate);
  const isClosed = new Date(job.closingDate) < new Date();
  const waMessage = jobWhatsappMessage(job.title, job.reference);

  const relatedJobs = jobs
    .filter((j) => j.id !== job.id && (j.categorySlug === job.categorySlug || j.country === job.country) && j.status === "active")
    .slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#0f1f3d]">
        <div className="container-padded py-8">
          <Breadcrumbs
            items={[
              { label: "Jobs", href: "/jobs" },
              { label: job.title },
            ]}
            className="text-slate-400 mb-4"
          />
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-4xl flex-shrink-0">
                {job.countryFlag}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="badge bg-blue-100 text-blue-800">Demo vacancy</span>
                  {job.featured && (
                    <span className="badge badge-featured">⭐ Featured</span>
                  )}
                  {closingSoon && !isClosed && (
                    <span className="badge badge-closing">Closing Soon</span>
                  )}
                  {isClosed && (
                    <span className="badge" style={{ background: "#fee2e2", color: "#991b1b" }}>Closed</span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    {job.city ? `${job.city}, ` : ""}{job.countryName}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase size={14} />
                    {job.categoryName}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Building size={14} />
                    {job.employer}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Ref: {job.reference}</p>
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex gap-3 flex-shrink-0">
              {!isClosed && (
                <Link
                  href={`/jobs/${job.slug}/apply`}
                  className="btn btn-teal btn-lg"
                  aria-label={`Apply for ${job.title}`}
                >
                  Apply Now
                  <ArrowRight size={18} />
                </Link>
              )}
              <a
                href={whatsappUrl(siteConfig.whatsapp, waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-white btn-lg"
                aria-label="Enquire via WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Enquiry
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-padded py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <section className="bg-white rounded-xl border border-slate-200 p-6" aria-label="Job overview">
              <h2 className="font-bold text-[#0f1f3d] mb-4 text-lg">Job Overview</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: "Salary", value: job.salaryDisplay, icon: DollarSign },
                  { label: "Vacancies", value: `${job.vacancies} positions`, icon: Users },
                  { label: "Experience", value: job.experienceDisplay, icon: Briefcase },
                  { label: "Contract", value: job.contractPeriod, icon: FileText },
                  { label: "Working Hours", value: job.workingHours, icon: Clock },
                  { label: "Closing Date", value: formatDate(job.closingDate), icon: Calendar },
                ].map((item) => (
                  <div key={item.label} className="bg-slate-50 rounded-lg p-3">
                    <item.icon size={16} className="text-teal-600 mb-2" aria-hidden="true" />
                    <p className="text-xs text-slate-500 mb-0.5">{item.label}</p>
                    <p className="text-sm font-bold text-[#0f1f3d] leading-tight">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Description */}
            <section className="bg-white rounded-xl border border-slate-200 p-6" aria-label="Job description">
              <h2 className="font-bold text-[#0f1f3d] mb-3 text-lg">About This Role</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{job.description}</p>
            </section>

            {/* Responsibilities */}
            <section className="bg-white rounded-xl border border-slate-200 p-6" aria-label="Responsibilities">
              <h2 className="font-bold text-[#0f1f3d] mb-4 text-lg">Key Responsibilities</h2>
              <ul className="space-y-2.5" role="list">
                {job.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle size={15} className="text-teal-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section className="bg-white rounded-xl border border-slate-200 p-6" aria-label="Requirements">
              <h2 className="font-bold text-[#0f1f3d] mb-4 text-lg">Requirements</h2>
              <ul className="space-y-2.5" role="list">
                {job.requirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <AlertCircle size={15} className="text-navy-500 mt-0.5 flex-shrink-0 text-[#2d5096]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              {job.qualifications.length > 0 && (
                <>
                  <h3 className="font-semibold text-[#0f1f3d] mt-5 mb-3">Qualifications</h3>
                  <ul className="space-y-2" role="list">
                    {job.qualifications.map((q, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <CheckCircle size={15} className="text-teal-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>

            {/* Benefits & Package */}
            <section className="bg-white rounded-xl border border-slate-200 p-6" aria-label="Benefits and package">
              <h2 className="font-bold text-[#0f1f3d] mb-4 text-lg">Benefits & Package</h2>
              <ul className="space-y-2 mb-5" role="list">
                {job.benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <CheckCircle size={15} className="text-teal-500 flex-shrink-0" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                {[
                  { label: "Accommodation", value: job.accommodation },
                  { label: "Food", value: job.food },
                  { label: "Transportation", value: job.transportation },
                  { label: "Medical", value: job.medical },
                  { label: "Insurance", value: job.insurance },
                ].map(({ label, value }) => (
                  <div key={label} className="text-sm">
                    <span className="text-slate-500">{label}:</span>{" "}
                    <span className="text-slate-700 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Interview info */}
            {job.interviewInfo && (
              <section className="bg-amber-50 border border-amber-200 rounded-xl p-5" aria-label="Interview information">
                <h2 className="font-bold text-[#0f1f3d] mb-2 text-base">Interview Information</h2>
                <p className="text-sm text-slate-700 leading-relaxed">{job.interviewInfo}</p>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5" aria-label="Job apply sidebar">
            {/* Apply card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 sticky top-28">
              <div className="text-center mb-5">
                <p className="text-2xl font-bold text-[#0f1f3d]">{job.salaryDisplay}</p>
                <p className="text-sm text-slate-500 mt-0.5">Monthly compensation</p>
              </div>

              <InfoRow label="Location" value={`${job.city ? job.city + ", " : ""}${job.countryName}`} icon={MapPin} />
              <InfoRow label="Vacancies" value={`${job.vacancies} positions available`} icon={Users} />
              <InfoRow label="Closing Date" value={formatDate(job.closingDate)} icon={Calendar} />
              <InfoRow label="Reference" value={job.reference} icon={FileText} />

              <div className="mt-5 space-y-3">
                {!isClosed ? (
                  <Link
                    href={`/jobs/${job.slug}/apply`}
                    className="btn btn-primary w-full justify-center"
                    aria-label={`Apply for ${job.title}`}
                  >
                    Apply Now
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-center text-sm text-red-700">
                    This vacancy has closed
                  </div>
                )}
                <a
                  href={whatsappUrl(siteConfig.whatsapp, waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-teal w-full justify-center"
                  aria-label="Enquire about this job via WhatsApp"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Enquiry
                </a>
                <ShareJobButton
                  title={job.title}
                  reference={job.reference}
                  className="w-full"
                />
              </div>

              <p className="text-xs text-slate-500 text-center mt-4">
                Published: {formatDate(job.publishedDate)}
              </p>
            </div>

            {/* Important notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="text-sm font-bold text-[#0f1f3d] mb-2">Important Notice</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                This is fictional demonstration content. Confirm the agency credentials, employer,
                role terms, and official payment policy before a vacancy is published or accepted.
              </p>
            </div>
          </aside>
        </div>

        {/* Related jobs */}
        {relatedJobs.length > 0 && (
          <section className="mt-12" aria-label="Related job vacancies">
            <h2 className="text-xl font-bold text-[#0f1f3d] mb-6">Related Vacancies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedJobs.map((j) => (
                <JobCard key={j.id} job={j} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile sticky apply bar */}
      {!isClosed && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-4 flex gap-3">
          <Link
            href={`/jobs/${job.slug}/apply`}
            className="flex-1 btn btn-primary justify-center"
            aria-label={`Apply for ${job.title}`}
          >
            Apply Now
          </Link>
          <a
            href={whatsappUrl(siteConfig.whatsapp, waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-teal justify-center px-4"
            aria-label="WhatsApp enquiry"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
