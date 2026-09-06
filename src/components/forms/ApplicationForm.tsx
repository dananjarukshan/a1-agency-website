"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Upload, AlertCircle, Loader2 } from "lucide-react";
import type { Job } from "@/types";
import { cn } from "@/lib/utils";

const schema = z.object({
  // Personal
  fullName: z.string().min(2, "Full name is required"),
  nic: z.string().min(9, "Valid NIC number required").max(12),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  district: z.string().min(1, "Please select your district"),
  address: z.string().min(5, "Address is required"),
  phone: z.string().min(9, "Valid phone number required"),
  whatsapp: z.string().optional(),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
  // Professional
  currentOccupation: z.string().min(1, "Current occupation is required"),
  yearsOfExperience: z.string().min(1, "Please select experience level"),
  highestQualification: z.string().min(1, "Qualification is required"),
  professionalQualifications: z.string().optional(),
  relevantSkills: z.string().optional(),
  hasDrivingLicence: z.boolean().optional(),
  overseasExperience: z.string().optional(),
  // Consent
  privacyConsent: z.literal(true, { message: "You must agree to proceed" }),
});

type FormData = z.infer<typeof schema>;

const sriLankaDistricts = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
  "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
  "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
  "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
  "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya",
];

const experienceLevels = [
  "Less than 1 year",
  "1–2 years",
  "3–5 years",
  "5–10 years",
  "More than 10 years",
];

const qualifications = [
  "Below O/L",
  "O/L (Ordinary Level)",
  "A/L (Advanced Level)",
  "NVQ Level 1–3",
  "NVQ Level 4–5",
  "Diploma",
  "Higher National Diploma",
  "Degree",
  "Postgraduate",
];

interface ApplicationFormProps {
  job: Job;
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="font-bold text-[#0f1f3d] text-base mb-5 pb-3 border-b border-slate-100">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  required = false,
  children,
  full = false,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={cn(full && "sm:col-span-2")}>
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p className="form-error flex items-center gap-1 mt-1" role="alert">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );
}

export default function ApplicationForm({ job }: ApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [appReference, setAppReference] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { hasDrivingLicence: false },
  });

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCvError("");
    if (!file) { setCvFile(null); return; }
    const allowedMimeTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    const allowedExtension = /\.(pdf|doc|docx)$/i.test(file.name);
    if (!allowedMimeTypes.includes(file.type) || !allowedExtension) {
      setCvError("Please upload a PDF or Word document (.pdf, .doc, .docx)");
      setCvFile(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setCvError("File size must not exceed 5 MB");
      setCvFile(null);
      return;
    }
    setCvFile(file);
  };

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1500));
    const ref = `APP-${job.reference}`;
    setAppReference(ref);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={32} className="text-teal-600" />
        </div>
        <h2 className="text-2xl font-bold text-[#0f1f3d] mb-3">Demo Application Validated</h2>
        <p className="text-slate-600 mb-4">
          The application for <strong>{job.title}</strong> passed frontend validation. No personal
          information or CV was uploaded or stored by this demo.
        </p>
        <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 mb-6">
          <span className="text-sm text-slate-500">Demo reference:</span>
          <span className="font-bold text-[#0f1f3d] font-mono">{appReference}</span>
        </div>
        <p className="text-xs text-slate-500 mb-6">
          Connect this form to a protected backend and private object storage before accepting real applications.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/jobs" className="btn btn-primary">Browse More Jobs</Link>
          <Link href="/" className="btn btn-secondary">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-relaxed text-blue-900">
        <strong>Frontend demo:</strong> fields and CV type/size are validated in your browser. This
        build does not send or store applicant data.
      </div>
      {/* Selected job */}
      <div className="bg-[#0f1f3d] text-white rounded-xl p-5 flex items-start gap-4">
        <div className="text-3xl" aria-hidden="true">{job.countryFlag}</div>
        <div>
          <p className="text-xs text-slate-400 mb-0.5">Applying for</p>
          <h2 className="font-bold text-lg leading-tight">{job.title}</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            {job.city ? `${job.city}, ` : ""}{job.countryName} · Ref: {job.reference}
          </p>
          <p className="text-teal-400 font-semibold text-sm mt-1">{job.salaryDisplay}</p>
        </div>
      </div>

      {/* Section A – Personal */}
      <FormSection title="A. Personal Information">
        <Field id="fullName" label="Full Name" error={errors.fullName?.message} required>
          <input id="fullName" {...register("fullName")} className="form-input" placeholder="As in NIC / Passport" aria-required="true" />
        </Field>
        <Field id="nic" label="NIC / National Identity Card No." error={errors.nic?.message} required>
          <input id="nic" {...register("nic")} className="form-input" placeholder="e.g. 123456789V" aria-required="true" />
        </Field>
        <Field id="dateOfBirth" label="Date of Birth" error={errors.dateOfBirth?.message} required>
          <input id="dateOfBirth" type="date" {...register("dateOfBirth")} className="form-input" aria-required="true" />
        </Field>
        <Field id="district" label="District" error={errors.district?.message} required>
          <select id="district" {...register("district")} className="form-input" aria-required="true">
            <option value="">Select District</option>
            {sriLankaDistricts.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </Field>
        <Field id="address" label="Home Address" error={errors.address?.message} required full>
          <textarea id="address" {...register("address")} className="form-input resize-none" rows={2} placeholder="Your current home address" aria-required="true" />
        </Field>
        <Field id="phone" label="Mobile Phone Number" error={errors.phone?.message} required>
          <input id="phone" type="tel" {...register("phone")} className="form-input" placeholder="+94 7X XXX XXXX" aria-required="true" />
        </Field>
        <Field id="whatsapp" label="WhatsApp Number (if different)">
          <input id="whatsapp" type="tel" {...register("whatsapp")} className="form-input" placeholder="+94 7X XXX XXXX" />
        </Field>
        <Field id="email" label="Email Address" error={errors.email?.message}>
          <input id="email" type="email" {...register("email")} className="form-input" placeholder="your@email.com" />
        </Field>
      </FormSection>

      {/* Section B – Professional */}
      <FormSection title="B. Professional Information">
        <Field id="currentOccupation" label="Current / Previous Occupation" error={errors.currentOccupation?.message} required>
          <input id="currentOccupation" {...register("currentOccupation")} className="form-input" placeholder="e.g. Driver, Electrician" aria-required="true" />
        </Field>
        <Field id="yearsOfExperience" label="Years of Relevant Experience" error={errors.yearsOfExperience?.message} required>
          <select id="yearsOfExperience" {...register("yearsOfExperience")} className="form-input" aria-required="true">
            <option value="">Select Experience</option>
            {experienceLevels.map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
        </Field>
        <Field id="highestQualification" label="Highest Educational Qualification" error={errors.highestQualification?.message} required>
          <select id="highestQualification" {...register("highestQualification")} className="form-input" aria-required="true">
            <option value="">Select Qualification</option>
            {qualifications.map((q) => <option key={q} value={q}>{q}</option>)}
          </select>
        </Field>
        <Field id="professionalQualifications" label="Professional / Technical Qualifications">
          <input id="professionalQualifications" {...register("professionalQualifications")} className="form-input" placeholder="e.g. NVQ Level 3 in Electrical" />
        </Field>
        <Field id="relevantSkills" label="Key Skills" full>
          <input id="relevantSkills" {...register("relevantSkills")} className="form-input" placeholder="e.g. Heavy vehicle driving, electrical wiring, HVAC" />
        </Field>
        <div className="sm:col-span-2">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" {...register("hasDrivingLicence")} className="w-4 h-4 rounded border-slate-300 text-[#0f1f3d]" id="hasDrivingLicence" />
            <span className="text-sm text-slate-700">I hold a valid Sri Lankan driving licence</span>
          </label>
        </div>
        <Field id="overseasExperience" label="Previous Overseas Employment Experience" full>
          <textarea id="overseasExperience" {...register("overseasExperience")} className="form-input resize-none" rows={2} placeholder="Country, employer type, duration (or 'None')" />
        </Field>
      </FormSection>

      {/* Section C – Documents */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-bold text-[#0f1f3d] text-base mb-5 pb-3 border-b border-slate-100">C. Documents</h2>
        <div>
          <label htmlFor="cv-upload" className="form-label">
            Upload CV / Resume <span className="text-slate-500 font-normal">(PDF, DOC, or DOCX · max 5 MB)</span>
          </label>
          <label
            htmlFor="cv-upload"
            className={cn(
              "mt-1 flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
              cvError ? "border-red-300 bg-red-50" : "border-slate-300 hover:border-[#0f1f3d] hover:bg-slate-50"
            )}
          >
            <Upload size={24} className="text-slate-400" aria-hidden="true" />
            {cvFile ? (
              <div className="text-center">
                <p className="text-sm font-semibold text-teal-700">{cvFile.name}</p>
                <p className="text-xs text-slate-500">{(cvFile.size / 1024).toFixed(1)} KB</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-[#0f1f3d]">Click to choose a CV</span>
                </p>
                <p className="text-xs text-slate-500">PDF, DOC, DOCX up to 5 MB</p>
              </div>
            )}
            <input
              id="cv-upload"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleCvChange}
              className="sr-only"
              aria-label="Upload your CV"
            />
          </label>
          {cvError && (
            <p className="form-error flex items-center gap-1 mt-1" role="alert">
              <AlertCircle size={12} />
              {cvError}
            </p>
          )}
        </div>
      </section>

      {/* Section D – Consent */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-bold text-[#0f1f3d] text-base mb-4 pb-3 border-b border-slate-100">D. Declaration & Consent</h2>
        <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600 leading-relaxed mb-4">
          <p className="mb-2">By submitting this application, I confirm that:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>The information provided is accurate and complete to the best of my knowledge.</li>
            <li>I understand that submitting an application does not guarantee employment.</li>
            <li>I consent to my personal data being processed for recruitment purposes.</li>
            <li>I understand that misrepresentation of information may disqualify my application.</li>
          </ul>
        </div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("privacyConsent")}
            id="privacyConsent"
            className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#0f1f3d] focus:ring-[#0f1f3d]"
            aria-required="true"
          />
          <span className="text-sm text-slate-700">
            I agree to the{" "}
            <Link href="/privacy-policy" target="_blank" className="text-[#0f1f3d] underline hover:text-blue-700">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" target="_blank" className="text-[#0f1f3d] underline hover:text-blue-700">
              Terms & Conditions
            </Link>
            . I confirm the above declaration. *
          </span>
        </label>
        {errors.privacyConsent && (
          <p className="form-error flex items-center gap-1 mt-2" role="alert">
            <AlertCircle size={12} />
            {errors.privacyConsent.message}
          </p>
        )}
      </section>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn btn-primary btn-lg justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        aria-label="Submit application"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            Submitting Application...
          </>
        ) : (
          "Submit Application"
        )}
      </button>

      <p className="text-xs text-slate-500 text-center">
        Production integration required: server-side validation, rate limiting, malware scanning,
        private document storage, and a real application reference.
      </p>
    </form>
  );
}
