import Link from "next/link";
import {
  MapPin,
  Calendar,
  Briefcase,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";
import type { Job } from "@/types";
import { cn, formatDate, isClosingSoon, daysUntilClosing } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  variant?: "default" | "compact";
  className?: string;
}

export default function JobCard({ job, variant = "default", className }: JobCardProps) {
  const closing = isClosingSoon(job.closingDate);
  const daysLeft = daysUntilClosing(job.closingDate);
  const isClosed = daysLeft < 0;

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "card p-4 hover:-translate-y-0.5 transition-all duration-200 group",
          isClosed && "opacity-60",
          className
        )}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center text-xl flex-shrink-0">
            {job.countryFlag}
          </div>
          <div className="min-w-0 flex-1">
            <Link
              href={`/jobs/${job.slug}`}
              className="font-semibold text-[#0f1f3d] text-sm hover:text-blue-700 transition-colors line-clamp-1"
            >
              {job.title}
            </Link>
            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-500">
              <MapPin size={11} />
              {job.city ? `${job.city}, ` : ""}{job.countryName}
            </div>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="text-sm font-semibold text-teal-700">{job.salaryDisplay}</span>
              <span className="text-xs text-slate-500">{job.vacancies} vacancies</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article
      className={cn(
        "card p-5 hover:-translate-y-1 transition-all duration-200 group flex flex-col",
        isClosed && "opacity-60",
        className
      )}
      aria-label={`Job: ${job.title} in ${job.countryName}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-2xl flex-shrink-0">
            {job.countryFlag}
          </div>
          <div className="min-w-0">
            <Link
              href={`/jobs/${job.slug}`}
              className="font-bold text-[#0f1f3d] text-base hover:text-blue-700 transition-colors leading-tight block line-clamp-2"
            >
              {job.title}
            </Link>
            <div className="flex items-center gap-1.5 mt-1 text-sm text-slate-500">
              <MapPin size={13} className="flex-shrink-0" />
              {job.city ? `${job.city}, ` : ""}{job.countryName}
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-col gap-1 flex-shrink-0">
          <span className="badge bg-blue-100 text-blue-800">Sample</span>
          {job.featured && (
            <span className="badge badge-featured">⭐ Featured</span>
          )}
          {job.isNew && !job.featured && (
            <span className="badge badge-new">New</span>
          )}
          {closing && !isClosed && (
            <span className="badge badge-closing">Closing Soon</span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
        <div className="flex items-center gap-1.5 text-slate-600">
          <Briefcase size={13} className="text-slate-400 flex-shrink-0" />
          <span className="truncate">{job.categoryName}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-600">
          <Users size={13} className="text-slate-400 flex-shrink-0" />
          <span>{job.vacancies} Vacancies</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-600">
          <Clock size={13} className="text-slate-400 flex-shrink-0" />
          <span className="truncate">{job.experienceDisplay}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-600">
          <Calendar size={13} className="text-slate-400 flex-shrink-0" />
          <span
            className={cn(closing && !isClosed ? "text-red-600 font-medium" : "")}
          >
            {isClosed
              ? "Closed"
              : closing
              ? `${daysLeft}d left`
              : formatDate(job.closingDate)}
          </span>
        </div>
      </div>

      {/* Employer */}
      <p className="text-xs text-slate-500 mb-4 truncate">{job.employer}</p>

      {/* Salary */}
      <div className="mb-4 p-3 bg-slate-50 rounded-md">
        <p className="text-xs text-slate-500 mb-0.5">Monthly Salary</p>
        <p className="font-bold text-[#0f1f3d] text-base">{job.salaryDisplay}</p>
      </div>

      {/* Actions */}
      <div className="mt-auto flex gap-2">
        <Link
          href={`/jobs/${job.slug}`}
          className="flex-1 btn btn-secondary btn-sm justify-center text-center"
          aria-label={`View details for ${job.title}`}
        >
          View Details
        </Link>
        {!isClosed && (
          <Link
            href={`/jobs/${job.slug}/apply`}
            className="flex-1 btn btn-primary btn-sm justify-center text-center group-hover:bg-[#162447] transition-colors"
            aria-label={`Apply for ${job.title}`}
          >
            Apply Now
            <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </article>
  );
}
