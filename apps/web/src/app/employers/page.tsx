import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Shield, FileCheck, Award } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SectionHeading from "@/components/common/SectionHeading";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Recruit Sri Lankan Manpower & Workers | ${siteConfig.shortName}`,
  description:
    "Recruit skilled, semi-skilled, and technical Sri Lankan workers for Middle Eastern and international companies.",
  alternates: { canonical: "/employers" },
};

export default function EmployersPage() {
  const industries = [
    { title: "Construction & Civil", desc: "Masons, carpenters, steel fixers, heavy equipment operators, site supervisors." },
    { title: "Hospitality & Food Services", desc: "Chefs, cooks, waiters, housekeepers, kitchen stewards, front office staff." },
    { title: "Healthcare & Nursing", desc: "Caregivers, nursing aides, hospital support staff, technicians." },
    { title: "Transport & Logistics", desc: "Heavy vehicle drivers, light vehicle drivers, forklift operators, warehouse staff." },
    { title: "Technical & MEP", desc: "Electricians, plumbers, HVAC technicians, welders, mechanics." },
    { title: "Facilities & Cleaning", desc: "Commercial cleaners, janitors, facility maintenance operatives, security staff." },
  ];

  const steps = [
    { title: "1. Requirement Definition", desc: "Employer provides the job specification, business details, and recruitment documentation required for review." },
    { title: "2. Sourcing & Screening", desc: "We source candidates through our network and perform preliminary screening." },
    { title: "3. Employer Selection", desc: "Employer conducts interviews (online/in-person) and selects qualified workers." },
    { title: "4. Candidate Processing", desc: "Selected candidates complete the role-specific checks and documents confirmed for the engagement." },
    { title: "5. Regulatory Coordination", desc: "The parties coordinate the current destination and Sri Lankan regulatory steps applicable to the placement." },
    { title: "6. Deployment & Support", desc: "Candidates complete confirmed pre-departure steps before travel to the employer's destination." },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Hero */}
      <div className="bg-brand-black text-white">
        <div className="container-padded py-14">
          <Breadcrumbs items={[{ label: "For Employers" }]} className="text-slate-400 mb-4" />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3.5 py-1 mb-5 text-xs text-teal-400 font-semibold">
              <Building2 size={14} />
              B2B Manpower Solutions
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Recruit Skilled Sri Lankan Talent for Overseas Operations
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              A1 Agency is being prepared as a Sri Lankan foreign-employment recruitment platform connecting overseas companies with skilled Sri Lankan talent. Agency credentials and service claims remain subject to client confirmation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/employers/request-manpower" className="btn btn-teal btn-lg">
                Submit Manpower Request
                <ArrowRight size={18} />
              </Link>
              <a href={`mailto:${siteConfig.emailEmployers}`} className="btn btn-white btn-lg">
                Contact Business Director
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Why Sri Lankan Workers */}
      <div className="container-padded py-16">
        <SectionHeading
          label="Why Sri Lanka"
          title="Advantages of Recruiting Sri Lankan Workforce"
          subtitle="Sri Lanka possesses a highly adaptable, disciplined, and technically skilled talent pool."
          centered
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Award, title: "High Literacy & English Proficiency", desc: "Sri Lanka maintains high literacy rates and strong basic English communication skills, allowing smooth integration into multinational work environments." },
            { icon: Shield, title: "Disciplined & Productive Work Ethic", desc: "Sri Lankan workers are internationally recognized for their dedication, reliability, and respectful workplace culture." },
            { icon: FileCheck, title: "Compliance-Ready Workflow", desc: "The recruitment workflow is designed to accommodate the official documents and regulatory checks applicable to each confirmed engagement." },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="w-12 h-12 rounded-lg bg-brand-black flex items-center justify-center text-teal-400 mb-4">
                <item.icon size={22} />
              </div>
              <h3 className="text-lg font-bold text-[#0f1f3d] mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Industries */}
      <div className="bg-white py-16 border-y border-slate-200">
        <div className="container-padded">
          <SectionHeading
            label="Recruitment Capability"
            title="Industries & Job Roles We Support"
            subtitle="We recruit across a wide range of skill levels and technical categories."
            className="mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="font-bold text-[#0f1f3d] text-base mb-2">{ind.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="container-padded py-16">
        <SectionHeading
          label="Employer Journey"
          title="Our Recruitment Process for Employers"
          subtitle="A structured end-to-end recruitment pipeline ensuring compliance and timely deployment."
          centered
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="font-bold text-[#0f1f3d] text-base mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 bg-brand-black text-white rounded-2xl p-8 lg:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Recruiting?</h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Submit your manpower requirement today and our international business team will get back to you with qualified candidate profiles.
          </p>
          <Link href="/employers/request-manpower" className="btn btn-teal btn-lg">
            Request Recruitment Support
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
