import {
  Search, FileText, UserCheck, ThumbsUp,
  ClipboardList, Plane, Briefcase, CheckCircle2
} from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Search Opportunities",
    description: "Browse available vacancies by country, category, or keyword. Find positions that match your skills and experience.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Submit Application",
    description: "Complete the online application form and upload your CV. Our team will review your profile.",
  },
  {
    icon: UserCheck,
    step: "03",
    title: "Initial Screening",
    description: "Shortlisted candidates are contacted and guided through the next steps in the recruitment process.",
  },
  {
    icon: ThumbsUp,
    step: "04",
    title: "Employer Interview",
    description: "Meet with the prospective employer via interview. Some positions may require a practical skills test.",
  },
  {
    icon: ClipboardList,
    step: "05",
    title: "Documentation & Medical",
    description: "Selected candidates are guided through document preparation and medical examination requirements.",
  },
  {
    icon: CheckCircle2,
    step: "06",
    title: "Visa Processing",
    description: "We assist with the visa application process and liaise with the employer on your behalf.",
  },
  {
    icon: Briefcase,
    step: "07",
    title: "Pre-Departure",
    description: "Complete SLBFE registration and pre-departure orientation as required by Sri Lankan regulations.",
  },
  {
    icon: Plane,
    step: "08",
    title: "Travel & Start Career",
    description: "Depart with confidence and begin your overseas career with full employer and agency support.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-padding bg-[#0f1f3d]" aria-labelledby="how-it-works-heading">
      <div className="container-padded">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-6 h-0.5 bg-teal-400" aria-hidden="true" />
            <span className="text-teal-400 text-xs font-bold uppercase tracking-widest">
              Recruitment Journey
            </span>
            <div className="w-6 h-0.5 bg-teal-400" aria-hidden="true" />
          </div>
          <h2
            id="how-it-works-heading"
            className="text-3xl font-bold text-white mb-3"
          >
            How the Recruitment Process Works
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our structured recruitment process is designed to be clear, transparent, and supportive
            every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative">
                {/* Connector line */}
                {idx < steps.length - 1 && idx % 4 !== 3 && (
                  <div
                    className="hidden lg:block absolute top-6 left-[calc(50%+24px)] right-0 h-px bg-white/10"
                    aria-hidden="true"
                  />
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <Icon size={20} className="text-teal-400" aria-hidden="true" />
                    </div>
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#0f1f3d] border border-teal-400 flex items-center justify-center">
                      <span className="text-teal-400 text-[9px] font-bold">{idx + 1}</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a href="/how-it-works" className="btn btn-teal btn-lg">
            Learn More About the Process
          </a>
        </div>
      </div>
    </section>
  );
}
