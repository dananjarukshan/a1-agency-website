import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import EmployerRequestForm from "@/components/forms/EmployerRequestForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Request Manpower Recruitment | ${siteConfig.shortName}`,
  description:
    "Submit a manpower requirement for skilled Sri Lankan workers across overseas projects and operations.",
  alternates: { canonical: "/employers/request-manpower" },
};

export default function RequestManpowerPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="bg-[#0f1f3d]">
        <div className="container-padded py-8">
          <Breadcrumbs
            items={[
              { label: "For Employers", href: "/employers" },
              { label: "Request Manpower" },
            ]}
            className="text-slate-400 mb-3"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Submit Manpower Requirement
          </h1>
          <p className="text-slate-400 text-sm">
            Please fill in your company details and recruitment requirements below. Our team will contact you promptly.
          </p>
        </div>
      </div>

      <div className="container-padded py-8 max-w-3xl">
        <EmployerRequestForm />
      </div>
    </div>
  );
}
