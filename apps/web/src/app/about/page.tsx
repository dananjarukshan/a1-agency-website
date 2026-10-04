import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Award, FileCheck, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SectionHeading from "@/components/common/SectionHeading";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.shortName}`,
  description:
    "Learn about the proposed mission, values, and recruitment approach for A1 International Manpower Agency.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Header */}
      <div className="bg-brand-black">
        <div className="container-padded py-12">
          <Breadcrumbs items={[{ label: "About Us" }]} className="text-slate-400 mb-3" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            About {siteConfig.name}
          </h1>
          <p className="text-slate-300 text-base max-w-2xl">
            A client-ready international recruitment platform centred on transparent, ethical, and professional candidate experiences.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="container-padded py-12">
        {/* Mission / Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-brand-black text-teal-400 flex items-center justify-center mb-4">
              <Award size={24} />
            </div>
            <h2 className="text-xl font-bold text-[#0f1f3d] mb-3">Our Mission</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              To empower Sri Lankan job seekers by providing access to genuine, safe, and rewarding global career opportunities, while delivering international employers with disciplined, skilled, and reliable manpower solutions.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-brand-black text-teal-400 flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-xl font-bold text-[#0f1f3d] mb-3">Our Vision</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              To be recognized as Sri Lanka’s most trusted foreign employment recruitment agency, distinguished by our ethical standards, legal compliance, and candidate-centric support.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <SectionHeading
            label="Principles"
            title="Our Core Values"
            subtitle="The fundamental standards that guide every candidate placement and employer engagement."
            centered
            className="mb-10"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Transparency", desc: "No hidden terms. Clear wage agreements, job descriptions, and regulatory steps." },
              { title: "Integrity", desc: "Operating strictly within Sri Lanka Bureau of Foreign Employment (SLBFE) legal guidelines." },
              { title: "Candidate Welfare", desc: "Supporting workers before departure and maintaining candidate assistance." },
              { title: "Client Excellence", desc: "Delivering qualified, vetted workforce matched precisely to employer requirements." },
            ].map((v, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-[#0f1f3d] text-base mb-2">{v.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Agency Licensing & Credentials */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-12 mb-16">
          <div className="max-w-3xl">
            <span className="badge badge-new mb-3">Licensing & Legitimacy</span>
            <h2 className="text-2xl font-bold text-[#0f1f3d] mb-4">
              Agency Credentials
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Licence, registration, address, and operating-history details must be supplied and confirmed by the agency before launch. This demo intentionally does not infer or invent them.
            </p>
            <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-[#0f1f3d] font-semibold">
              <FileCheck size={18} className="text-teal-600" />
              Status: {siteConfig.credentialStatusLabel}
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#0f1f3d] mb-4">Ready to Work With Us?</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/jobs" className="btn btn-primary btn-lg">
              Explore Vacancies <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="btn btn-secondary btn-lg">
              Contact Our Office
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
