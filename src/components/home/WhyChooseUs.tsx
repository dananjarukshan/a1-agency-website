import {
  BadgeCheck, Users, Eye, HeartHandshake,
  Globe, FileStack
} from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { siteConfig } from "@/config/site";

const features = [
  {
    icon: BadgeCheck,
    title: "Clear Job Information",
    description:
      "Each published role is designed to show salary, requirements, benefits, dates, and application steps clearly.",
  },
  {
    icon: Users,
    title: "Professional Recruitment Workflow",
    description:
      "The platform is structured to support candidates and employers throughout the recruitment process.",
  },
  {
    icon: Eye,
    title: "Transparent Process",
    description:
      "We believe in clear communication. Candidates are kept informed at every stage.",
  },
  {
    icon: HeartHandshake,
    title: "Candidate Guidance",
    description:
      "From application to departure, we guide candidates on documentation, medical requirements, and pre-departure preparation.",
  },
  {
    icon: Globe,
    title: "International Reach",
    description:
      "Recruitment content is organized for opportunities across Saudi Arabia, UAE, Qatar, Kuwait, Oman, and Bahrain.",
  },
  {
    icon: FileStack,
    title: "End-to-End Support",
    description:
      "Comprehensive recruitment support covering screening, documentation coordination, and visa assistance.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-slate-50" aria-labelledby="why-choose-us-heading">
      <div className="container-padded">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <SectionHeading
            label="Why Work With Us"
            title={`Why Candidates Choose ${siteConfig.shortName}`}
            subtitle="We are committed to ethical, transparent, and professional overseas recruitment for Sri Lankan workers."
            centered
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-6 border border-slate-200 hover:border-[#0f1f3d]/20 hover:shadow-md transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-lg bg-[#0f1f3d] flex items-center justify-center mb-4">
                  <Icon size={20} className="text-teal-400" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-[#0f1f3d] mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
