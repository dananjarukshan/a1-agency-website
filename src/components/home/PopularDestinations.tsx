import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { countries, jobs } from "@/data";

export default function PopularDestinations() {
  return (
    <section
      className="section-padding bg-slate-50"
      aria-labelledby="destinations-heading"
    >
      <div className="container-padded">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <SectionHeading
            label="Recruitment Destinations"
            title="Popular Countries"
            subtitle="Explore the destination structure prepared for Middle Eastern recruitment opportunities."
          />
          <Link
            href="/countries"
            className="flex items-center gap-2 text-sm font-semibold text-[#0f1f3d] hover:text-blue-700 transition-colors whitespace-nowrap"
          >
            All Countries
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {countries.map((country) => {
            const jobCount = jobs.filter(
              (job) => job.status === "active" && job.country === country.slug
            ).length;
            return (
            <Link
              key={country.slug}
              href={`/countries/${country.slug}`}
              className="group card p-5 text-center hover:-translate-y-1 transition-all duration-200"
              aria-label={`Jobs in ${country.name}`}
            >
              <div className="text-4xl mb-3" aria-hidden="true">
                {country.flag}
              </div>
              <h3 className="font-semibold text-[#0f1f3d] text-sm mb-1 leading-tight">
                {country.name}
              </h3>
              <div className="flex items-center justify-center gap-1 text-xs text-slate-500">
                <Briefcase size={11} aria-hidden="true" />
                <span>{jobCount} sample {jobCount === 1 ? "job" : "jobs"}</span>
              </div>
              <div className="mt-3 text-xs font-medium text-teal-600 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                View Jobs <ArrowRight size={11} />
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
