import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Terms & Conditions | ${siteConfig.shortName}`,
  description:
    `Terms and conditions for job applicants and employers using the recruitment services of ${siteConfig.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="bg-[#0f1f3d]">
        <div className="container-padded py-10">
          <Breadcrumbs items={[{ label: "Terms & Conditions" }]} className="text-slate-400 mb-3" />
          <h1 className="text-3xl font-bold text-white mb-2">Terms & Conditions</h1>
          <p className="text-slate-400 text-sm">Last updated: August 2026</p>
        </div>
      </div>

      <div className="container-padded py-12 max-w-4xl">
        <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 prose-content">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-xs text-amber-800">
            ⚠️ <strong>Legal Template Disclaimer:</strong> These Terms and Conditions constitute an initial operational framework and must be formally verified by the agency&apos;s legal counsel before commercial deployment.
          </div>

          <h3>1. General Recruitment Terms</h3>
          <p>
            This page is a draft template for {siteConfig.name}. Registered company details,
            licence information, service scope, fee terms, and dispute procedures must be
            completed and reviewed before the website accepts live applications.
          </p>

          <h3>2. No Job Guarantee Disclaimer</h3>
          <p>
            Submission of an online job application or CV does not guarantee selection, interview, visa issuance, or employment. Final selection decisions rest solely with the prospective overseas employer following interview and assessment.
          </p>

          <h3>3. Accuracy of Candidate Information</h3>
          <p>
            Applicants must provide truthful, accurate, and complete information regarding their identity, educational qualifications, work experience, and driving credentials. Misrepresentation or submission of forged documents will result in immediate disqualification and potential reporting to regulatory authorities.
          </p>

          <h3>4. Regulatory Compliance & SLBFE Clearance</h3>
          <p>
            Overseas recruitment must follow the Sri Lankan requirements and destination-country
            procedures applicable at the time of each placement. Candidates should rely on current
            instructions from the relevant authorities and confirmed agency representatives.
          </p>

          <h3>5. Employer Requirements</h3>
          <p>
            The final terms should require employer representatives to provide accurate company,
            role, compensation, benefit, and authorization information, and to honour the signed
            employment agreement. Legal counsel should tailor this clause to the agency&apos;s contracts.
          </p>

          <h3>6. Unauthorized Sub-Agents Warning</h3>
          <p>
            Candidates should verify the agency&apos;s official channels before sharing documents or
            making any payment. The agency must publish its confirmed payment policy and any
            authorized representative arrangements before launch.
          </p>
        </div>
      </div>
    </div>
  );
}
