import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Recruitment Process & How It Works | ${siteConfig.shortName}`,
  description:
    "Understand the step-by-step foreign employment recruitment journey for Sri Lankan workers, from application to departure.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  const steps = [
    { num: "01", title: "Job Discovery & Search", desc: "Candidates browse published vacancies by country, job role, salary, and requirements." },
    { num: "02", title: "Online Application", desc: "Submit your details and CV online or visit our office. Registration is simple and transparent." },
    { num: "03", title: "Screening & Verification", desc: "Our recruitment officers verify qualifications, experience, driving licences, and document validity." },
    { num: "04", title: "Employer Interview", desc: "Shortlisted candidates attend interviews directly with employer representatives or via online interview." },
    { num: "05", title: "Selection & Offer Letter", desc: "Selected candidates receive official job offer letters detailing salary, hours, benefits, and contract terms." },
    { num: "06", title: "Medical Examination", desc: "Candidates undergo mandatory medical check-ups at authorised medical centers." },
    { num: "07", title: "Embassy Stamping & Visa", desc: "We coordinate with foreign embassies and relevant authorities for visa clearance and entry permits." },
    { num: "08", title: "Regulatory Preparation", desc: "Candidates follow the current registration, orientation, and pre-departure requirements communicated through official channels." },
    { num: "09", title: "Flight Ticketing & Departure", desc: "Air tickets are issued, final briefing provided, and departure arranged with airport assistance." },
    { num: "10", title: "Overseas Arrival & Support", desc: "Employer reception upon arrival and ongoing candidate support throughout employment." },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="bg-[#0f1f3d]">
        <div className="container-padded py-12">
          <Breadcrumbs items={[{ label: "How It Works" }]} className="text-slate-400 mb-3" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            The Recruitment Journey
          </h1>
          <p className="text-slate-300 text-base max-w-2xl">
            A clear 10-step model for the candidate journey. Exact procedures depend on each confirmed role and current official requirements.
          </p>
        </div>
      </div>

      <div className="container-padded py-12">
        {/* Timeline */}
        <div className="max-w-4xl mx-auto space-y-6 mb-16">
          {steps.map((step) => (
            <div key={step.num} className="bg-white rounded-xl p-6 border border-slate-200 flex gap-5 items-start">
              <div className="w-12 h-12 rounded-lg bg-[#0f1f3d] text-teal-400 font-bold text-lg flex items-center justify-center flex-shrink-0">
                {step.num}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0f1f3d] mb-1">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Regulatory & Safety Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 max-w-4xl mx-auto mb-16">
          <div className="flex items-start gap-4">
            <AlertTriangle size={24} className="text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-bold text-amber-900 mb-2">Important Legal & Safety Notice</h2>
              <p className="text-sm text-amber-800 leading-relaxed mb-4">
                Candidates should confirm an agency&apos;s current credentials, follow applicable Sri Lankan foreign-employment requirements, and verify every request for documents or payment through formally published channels.
              </p>
              <ul className="space-y-1.5 text-xs text-amber-900 font-medium">
                <li>• Demo credential status: {siteConfig.credentialStatusLabel}</li>
                <li>• Confirm the agency&apos;s official contacts and payment policy before proceeding.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="text-center">
          <Link href="/jobs" className="btn btn-primary btn-lg">
            Start Your Job Search
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
