import Link from "next/link";
import {
  Truck, HardHat, Settings, UtensilsCrossed, Stethoscope,
  Shield, Home, Zap, Wrench, Package, Cpu, Sparkles, ArrowRight
} from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { jobCategories, jobs } from "@/data";

const iconMap: Record<string, React.ElementType> = {
  Truck, HardHat, Settings, UtensilsCrossed, Stethoscope,
  Shield, Home, Zap, Wrench, Package, Cpu, Sparkles,
};

export default function JobCategories() {
  return (
    <section className="section-padding bg-white" aria-labelledby="categories-heading">
      <div className="container-padded">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <SectionHeading
            label="What We Recruit"
            title="Browse by Job Category"
            subtitle="Find opportunities across a wide range of skilled, semi-skilled, and technical occupations."
          />
          <Link
            href="/job-categories"
            className="flex items-center gap-2 text-sm font-semibold text-[#0f1f3d] hover:text-blue-700 transition-colors whitespace-nowrap"
          >
            All Categories
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {jobCategories.map((cat) => {
            const Icon = iconMap[cat.icon] ?? HardHat;
            const jobCount = jobs.filter(
              (job) => job.status === "active" && job.categorySlug === cat.slug
            ).length;
            return (
              <Link
                key={cat.slug}
                href={`/job-categories/${cat.slug}`}
                className="group flex flex-col items-center p-4 rounded-xl border border-slate-200 hover:border-[#0f1f3d] hover:bg-[#0f1f3d] hover:text-white transition-all duration-200 text-center"
                aria-label={`${cat.name} jobs – ${jobCount} sample vacancies`}
              >
                <div className="w-11 h-11 rounded-lg bg-slate-100 group-hover:bg-white/20 flex items-center justify-center mb-3 transition-colors">
                  <Icon size={22} className="text-[#0f1f3d] group-hover:text-white transition-colors" aria-hidden="true" />
                </div>
                <span className="font-semibold text-xs text-[#0f1f3d] group-hover:text-white transition-colors leading-tight mb-1">
                  {cat.name}
                </span>
                <span className="text-xs text-slate-500 group-hover:text-white/70 transition-colors">
                  {jobCount} sample {jobCount === 1 ? "job" : "jobs"}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
