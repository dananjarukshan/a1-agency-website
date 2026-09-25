import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2 } from "lucide-react";

export default function EmployerCTA() {
  const industries = [
    "Construction", "Hospitality", "Healthcare", "Transportation",
    "Logistics & Warehousing", "Facilities Management", "Engineering",
    "Manufacturing", "Retail", "Security Services",
  ];

  return (
    <section
      className="section-padding bg-white"
      aria-labelledby="employer-cta-heading"
    >
      <div className="container-padded">
        <div className="rounded-2xl bg-brand-black overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Content */}
            <div className="p-10 lg:p-14">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-5">
                <Building2 size={14} className="text-teal-400" aria-hidden="true" />
                <span className="text-xs font-medium text-white/90">For Overseas Employers</span>
              </div>

              <h2
                id="employer-cta-heading"
                className="text-3xl font-bold text-white leading-tight mb-4"
              >
                Looking for Skilled Sri Lankan Talent?
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                We specialise in recruiting skilled, semi-skilled, and technical Sri Lankan
                workers for employers across the Middle East. Our end-to-end manpower
                recruitment service covers candidate sourcing, screening, documentation
                coordination, and deployment support.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/employers/request-manpower"
                  className="btn btn-teal btn-lg"
                  aria-label="Submit a manpower requirement"
                >
                  Request Manpower
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link
                  href="/employers"
                  className="btn btn-white btn-lg"
                  aria-label="Learn about employer recruitment services"
                >
                  Employer Services
                </Link>
              </div>
            </div>

            {/* Employer imagery and capabilities */}
            <div className="relative min-h-[360px] border-l border-white/10 lg:min-h-full">
              <Image
                src="/images/employer-planning.png"
                alt="International employer representatives reviewing workforce requirements with a recruitment consultant"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[38%_center]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-black/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white">
                  Industries we support
                </h3>
                <div className="flex flex-wrap gap-2">
                  {industries.slice(0, 8).map((industry) => (
                    <span
                      key={industry}
                      className="rounded-full border border-white/20 bg-brand-black/75 px-3 py-1.5 text-xs font-medium text-slate-100 backdrop-blur-sm"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
