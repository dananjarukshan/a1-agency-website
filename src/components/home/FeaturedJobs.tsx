import Link from "next/link";
import { ArrowRight } from "lucide-react";
import JobCard from "@/components/jobs/JobCard";
import SectionHeading from "@/components/common/SectionHeading";
import { jobs } from "@/data";

export default function FeaturedJobs() {
  const featured = jobs.filter((j) => j.status === "active").slice(0, 6);

  return (
    <section className="section-padding bg-white" aria-labelledby="featured-jobs-heading">
      <div className="container-padded">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <SectionHeading
            label="Latest Opportunities"
            title="Featured Job Vacancies"
            subtitle="Structured sample vacancies showing how live overseas opportunities will be presented."
          />
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-sm font-semibold text-[#0f1f3d] hover:text-blue-700 transition-colors whitespace-nowrap"
            aria-label="View all available jobs"
          >
            View All Jobs
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {featured.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/jobs" className="btn btn-primary btn-lg">
            Browse All Vacancies
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
