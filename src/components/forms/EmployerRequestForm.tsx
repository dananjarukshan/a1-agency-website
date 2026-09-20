"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, AlertCircle, Loader2, Building2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { countries } from "@/data";

const schema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  country: z.string().min(1, "Please select country"),
  website: z
    .string()
    .refine((value) => !value || z.url().safeParse(value).success, "Enter a valid website URL")
    .optional(),
  contactPerson: z.string().min(2, "Contact person name is required"),
  position: z.string().min(2, "Designation / Position is required"),
  email: z.string().email("Valid corporate email required"),
  phone: z.string().min(7, "Valid phone / WhatsApp number required"),
  industry: z.string().min(1, "Please select industry"),
  jobTitleRequired: z.string().min(2, "Job title / role required"),
  numberOfWorkers: z.number().min(1, "At least 1 worker required"),
  requiredExperience: z.string().min(1, "Select required experience"),
  qualifications: z.string().optional(),
  salary: z.string().optional(),
  benefits: z.string().optional(),
  expectedJoiningDate: z.string().optional(),
  additionalRequirements: z.string().optional(),
  privacyConsent: z.literal(true, { error: "You must agree to proceed" }),
});

type FormData = z.infer<typeof schema>;

const industries = [
  "Construction & Contracting",
  "Hospitality & Catering",
  "Healthcare & Medical",
  "Transportation & Fleet",
  "Logistics & Warehousing",
  "Facilities Management",
  "Engineering & Technology",
  "Manufacturing & Industry",
  "Retail & Commercial",
  "Security Services",
  "Domestic Services",
  "Other Industry",
];

export default function EmployerRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [reqRef, setReqRef] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { numberOfWorkers: 5, privacyConsent: false as never },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1500));
    setReqRef("DEMO-REQ-001");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={32} className="text-teal-600" />
        </div>
        <h2 className="text-2xl font-bold text-[#0f1f3d] mb-3">Demo Request Validated</h2>
        <p className="text-slate-600 mb-4 max-w-lg mx-auto">
          The manpower request passed frontend validation. No company information was transmitted or stored by this demo.
        </p>
        <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 mb-6">
          <span className="text-sm text-slate-500">Demo reference:</span>
          <span className="font-bold text-[#0f1f3d] font-mono">{reqRef}</span>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/employers" className="btn btn-primary">Return to Employer Services</Link>
          <Link href="/" className="btn btn-secondary">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-relaxed text-blue-900">
        <strong>Frontend demo:</strong> this request is validated locally only. Connect a secure,
        rate-limited server endpoint before accepting employer data.
      </div>
      {/* Company Info */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-bold text-[#0f1f3d] text-base mb-5 pb-3 border-b border-slate-100 flex items-center gap-2">
          <Building2 size={18} className="text-teal-600" />
          1. Company & Contact Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="companyName" className="form-label">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input id="companyName" {...register("companyName")} className="form-input" placeholder="Legal business name" />
            {errors.companyName && <p className="form-error">{errors.companyName.message}</p>}
          </div>

          <div>
            <label htmlFor="country" className="form-label">
              Country <span className="text-red-500">*</span>
            </label>
            <select id="country" {...register("country")} className="form-input">
              <option value="">Select Employer Country</option>
              {countries.map((c) => (
                <option key={c.slug} value={c.name}>{c.flag} {c.name}</option>
              ))}
              <option value="Other">Other International Destination</option>
            </select>
            {errors.country && <p className="form-error">{errors.country.message}</p>}
          </div>

          <div>
            <label htmlFor="contactPerson" className="form-label">
              Contact Person Name <span className="text-red-500">*</span>
            </label>
            <input id="contactPerson" {...register("contactPerson")} className="form-input" placeholder="Your full name" />
            {errors.contactPerson && <p className="form-error">{errors.contactPerson.message}</p>}
          </div>

          <div>
            <label htmlFor="position" className="form-label">
              Designation / Position <span className="text-red-500">*</span>
            </label>
            <input id="position" {...register("position")} className="form-input" placeholder="e.g. HR Manager, Managing Director" />
            {errors.position && <p className="form-error">{errors.position.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="form-label">
              Corporate Email <span className="text-red-500">*</span>
            </label>
            <input id="email" type="email" {...register("email")} className="form-input" placeholder="name@company.com" />
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="form-label">
              Phone / WhatsApp Number <span className="text-red-500">*</span>
            </label>
            <input id="phone" type="tel" {...register("phone")} className="form-input" placeholder="+966 5X XXX XXXX" />
            {errors.phone && <p className="form-error">{errors.phone.message}</p>}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="website" className="form-label">Company Website (Optional)</label>
            <input id="website" {...register("website")} className="form-input" placeholder="https://www.company.com" />
          </div>
        </div>
      </section>

      {/* Recruitment Requirement */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-bold text-[#0f1f3d] text-base mb-5 pb-3 border-b border-slate-100">
          2. Manpower Requirement Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="industry" className="form-label">
              Industry Sector <span className="text-red-500">*</span>
            </label>
            <select id="industry" {...register("industry")} className="form-input">
              <option value="">Select Industry</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
            {errors.industry && <p className="form-error">{errors.industry.message}</p>}
          </div>

          <div>
            <label htmlFor="jobTitleRequired" className="form-label">
              Required Position / Job Title <span className="text-red-500">*</span>
            </label>
            <input id="jobTitleRequired" {...register("jobTitleRequired")} className="form-input" placeholder="e.g. Heavy Driver, HVAC Technician" />
            {errors.jobTitleRequired && <p className="form-error">{errors.jobTitleRequired.message}</p>}
          </div>

          <div>
            <label htmlFor="numberOfWorkers" className="form-label">
              Number of Workers Required <span className="text-red-500">*</span>
            </label>
            <input id="numberOfWorkers" type="number" {...register("numberOfWorkers", { valueAsNumber: true })} className="form-input" min={1} />
            {errors.numberOfWorkers && <p className="form-error">{errors.numberOfWorkers.message}</p>}
          </div>

          <div>
            <label htmlFor="requiredExperience" className="form-label">
              Required Experience Level <span className="text-red-500">*</span>
            </label>
            <select id="requiredExperience" {...register("requiredExperience")} className="form-input">
              <option value="">Select Experience Required</option>
              <option value="No experience / Trainee">No experience / Trainee</option>
              <option value="1-2 years">1-2 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5+ years senior">5+ years senior</option>
            </select>
            {errors.requiredExperience && <p className="form-error">{errors.requiredExperience.message}</p>}
          </div>

          <div>
            <label htmlFor="salary" className="form-label">Offered Monthly Salary Range (Optional)</label>
            <input id="salary" {...register("salary")} className="form-input" placeholder="e.g. SAR 1,500 - 2,000 + food" />
          </div>

          <div>
            <label htmlFor="expectedJoiningDate" className="form-label">Target Deployment Date (Optional)</label>
            <input id="expectedJoiningDate" type="date" {...register("expectedJoiningDate")} className="form-input" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="benefits" className="form-label">Provided Benefits (Accommodation, Food, Transport, etc.)</label>
            <textarea id="benefits" {...register("benefits")} className="form-input resize-none" rows={2} placeholder="e.g. Free accommodation, 3 meals per day, medical insurance" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="additionalRequirements" className="form-label">Additional Job Description & Requirements</label>
            <textarea id="additionalRequirements" {...register("additionalRequirements")} className="form-input resize-none" rows={3} placeholder="Please provide specific qualifications, certifications, working hours, or special conditions..." />
          </div>
        </div>
      </section>

      {/* Consent */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("privacyConsent")}
            id="privacyConsent"
            className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#0f1f3d] focus:ring-[#0f1f3d]"
          />
          <span className="text-sm text-slate-700">
            I confirm that I represent the employer named above and authorize {siteConfig.name} to contact me regarding manpower recruitment services. *
          </span>
        </label>
        {errors.privacyConsent && (
          <p className="form-error flex items-center gap-1 mt-2">
            <AlertCircle size={12} />
            {errors.privacyConsent.message}
          </p>
        )}
      </section>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn btn-primary btn-lg justify-center disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Submitting Recruitment Enquiry...
          </>
        ) : (
          "Submit Recruitment Request"
        )}
      </button>
    </form>
  );
}
