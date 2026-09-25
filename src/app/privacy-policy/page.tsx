import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.shortName}`,
  description:
    "Privacy policy and candidate data handling practices for A1 International Manpower Agency.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="bg-brand-black">
        <div className="container-padded py-10">
          <Breadcrumbs items={[{ label: "Privacy Policy" }]} className="text-slate-400 mb-3" />
          <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-slate-400 text-sm">Last updated: August 2026</p>
        </div>
      </div>

      <div className="container-padded py-12 max-w-4xl">
        <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 prose-content">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-xs text-amber-800">
            ⚠️ <strong>Legal Template Disclaimer:</strong> This privacy policy is an initial operational template. It should be reviewed and updated by the agency&apos;s legal advisor prior to formal commercial deployment.
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6 text-sm text-teal-900">
            <strong>Current demo behaviour:</strong> The forms validate inside your browser only.
            No application, message, CV, or employer request is transmitted to a server or stored.
          </div>

          <h3>1. Information We Collect</h3>
          <p>
            A future production version may collect information provided directly by job applicants and employer representatives, including:
          </p>
          <ul>
            <li>Full Name, NIC / Passport Number, Date of Birth, Gender, Home Address, District</li>
            <li>Contact details (Phone Number, WhatsApp Number, Email Address)</li>
            <li>Employment history, educational qualifications, technical certifications, and CV documents</li>
            <li>Employer inquiry information submitted through manpower request forms</li>
          </ul>

          <h3>2. How We Use Your Information</h3>
          <p>The final production policy should explain approved recruitment uses, which may include:</p>
          <ul>
            <li>Evaluating suitability for overseas job vacancies</li>
            <li>Submitting candidate profiles to prospective overseas employers for shortlisting</li>
            <li>Processing medical examinations, embassy visa endorsements, and SLBFE registration</li>
            <li>Communicating application updates via telephone, SMS, email, or WhatsApp</li>
          </ul>

          <h3>3. Data Protection & Private Storage</h3>
          <p>
            Production CV uploads should be stored in private object storage with strict access
            controls, retention rules, audit logs, safe filenames, and authorized retrieval. These
            controls are architectural requirements; they are not part of this frontend-only demo.
          </p>

          <h3>4. Data Sharing & Third-Party Disclosure</h3>
          <p>
            Subject to the final policy, a candidate&apos;s details may be shared only with parties
            necessary for a confirmed recruitment process, such as:
          </p>
          <ul>
            <li>Prospective overseas employers involved in the candidate&apos;s application</li>
            <li>Approved medical, travel, or visa-processing service providers when required</li>
            <li>Relevant government or regulatory authorities where legally required</li>
          </ul>

          <h3>5. Candidate Rights</h3>
          <p>
            The final policy must identify applicable data rights, request procedures, response
            timeframes, and the confirmed privacy contact. Placeholder contact: <a href={`mailto:${siteConfig.email}`} className="text-blue-600 underline">{siteConfig.email}</a>.
          </p>

          <h3>6. Contact Information</h3>
          <p>
            If you have questions regarding this Privacy Policy, please contact {siteConfig.legalName} at {siteConfig.address.street}, {siteConfig.address.city}, Sri Lanka.
          </p>
        </div>
      </div>
    </div>
  );
}
