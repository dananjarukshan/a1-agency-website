"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { FormSection, Field, Input, Textarea, Select } from "@/components/admin/ui";

const sriLankaDistricts = [
  "Ampara","Anuradhapura","Badulla","Batticaloa","Colombo",
  "Galle","Gampaha","Hambantota","Jaffna","Kalutara",
  "Kandy","Kegalle","Kilinochchi","Kurunegala","Mannar",
  "Matale","Matara","Monaragala","Mullaitivu","Nuwara Eliya",
  "Polonnaruwa","Puttalam","Ratnapura","Trincomalee","Vavuniya",
];

const schema = z.object({
  jobId: z.string().min(1, "Select a job"),
  // Personal
  fullName: z.string().min(2, "Full name required"),
  nic: z.string().regex(/^\d{9}[VXvx]$|^\d{12}$/, "Invalid NIC format (e.g. 901234567V or 199012345678)"),
  dateOfBirth: z.string().min(1, "Date of birth required"),
  gender: z.string().optional(),
  district: z.string().min(1, "Select district"),
  address: z.string().min(5, "Address required"),
  phone: z.string().min(9, "Phone number required"),
  whatsapp: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  // Passport — mandatory
  passportNumber: z.string().regex(/^[A-Z]{1,2}\d{7}$/, "Invalid passport format (e.g. N1234567)"),
  passportExpiry: z.string().min(1, "Passport expiry required"),
  // Professional
  currentOccupation: z.string().min(2, "Current occupation required"),
  yearsOfExperience: z.string().min(1, "Select experience level"),
  highestQualification: z.string().min(1, "Select qualification"),
  professionalQualifications: z.string().optional(),
  relevantSkills: z.string().optional(),
  hasDrivingLicence: z.boolean().optional(),
  overseasExperience: z.string().optional(),
  // Status
  status: z.string().min(1),
  privacyConsent: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export default function NewApplicantPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: "APPLIED", privacyConsent: false },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Submit applicant:", data);
    alert("Applicant saved! (Connect Supabase to persist data)");
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/applicants" className="text-slate-400 hover:text-navy-700 transition">
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="text-xl font-bold text-navy-900">Add New Applicant</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Job */}
        <FormSection title="Job Application" description="Which job is this applicant applying for?">
          <Field id="jobId" label="Job Vacancy" required error={errors.jobId?.message} fullWidth>
            <Select id="jobId" placeholder="Select active job…" options={[]} {...register("jobId")} error={!!errors.jobId} />
          </Field>
          <Field id="status" label="Application Status" required error={errors.status?.message}>
            <Select id="status" options={[
              { value: "APPLIED", label: "Applied" },
              { value: "REVIEWED", label: "Reviewed" },
              { value: "SHORTLISTED", label: "Shortlisted" },
              { value: "INTERVIEW_SCHEDULED", label: "Interview Scheduled" },
              { value: "INTERVIEWED", label: "Interviewed" },
              { value: "SELECTED", label: "Selected" },
              { value: "DOCUMENT_PROCESSING", label: "Document Processing" },
              { value: "MEDICAL", label: "Medical" },
              { value: "VISA_PROCESSING", label: "Visa Processing" },
              { value: "READY_FOR_DEPARTURE", label: "Ready for Departure" },
              { value: "DEPARTED", label: "Departed" },
              { value: "REJECTED", label: "Rejected" },
              { value: "WITHDRAWN", label: "Withdrawn" },
            ]} {...register("status")} />
          </Field>
        </FormSection>

        {/* Personal Details */}
        <FormSection title="Personal Details">
          <Field id="fullName" label="Full Name" required error={errors.fullName?.message} fullWidth>
            <Input id="fullName" placeholder="As on NIC/Passport" {...register("fullName")} error={!!errors.fullName} />
          </Field>
          <Field id="nic" label="NIC Number" required error={errors.nic?.message}>
            <Input id="nic" placeholder="901234567V or 199012345678" {...register("nic")} error={!!errors.nic} />
          </Field>
          <Field id="dateOfBirth" label="Date of Birth" required error={errors.dateOfBirth?.message}>
            <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} error={!!errors.dateOfBirth} />
          </Field>
          <Field id="gender" label="Gender" error={errors.gender?.message}>
            <Select id="gender" placeholder="Select…" options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "prefer-not-to-say", label: "Prefer not to say" },
            ]} {...register("gender")} />
          </Field>
          <Field id="district" label="District" required error={errors.district?.message}>
            <Select id="district" placeholder="Select district…" options={sriLankaDistricts.map(d => ({ value: d, label: d }))} {...register("district")} error={!!errors.district} />
          </Field>
          <Field id="address" label="Permanent Address" required error={errors.address?.message} fullWidth>
            <Textarea id="address" rows={2} placeholder="Street, town, district…" {...register("address")} error={!!errors.address} />
          </Field>
          <Field id="phone" label="Phone Number" required error={errors.phone?.message}>
            <Input id="phone" type="tel" placeholder="+94 77 123 4567" {...register("phone")} error={!!errors.phone} />
          </Field>
          <Field id="whatsapp" label="WhatsApp Number" error={errors.whatsapp?.message}>
            <Input id="whatsapp" type="tel" placeholder="If different from phone" {...register("whatsapp")} />
          </Field>
          <Field id="email" label="Email Address" error={errors.email?.message}>
            <Input id="email" type="email" placeholder="applicant@email.com" {...register("email")} />
          </Field>
        </FormSection>

        {/* Passport — mandatory */}
        <FormSection title="Passport Information" description="Required for all overseas employment processing.">
          <Field id="passportNumber" label="Passport Number" required error={errors.passportNumber?.message}>
            <Input id="passportNumber" placeholder="N1234567" className="uppercase" {...register("passportNumber")} error={!!errors.passportNumber} />
          </Field>
          <Field id="passportExpiry" label="Passport Expiry Date" required error={errors.passportExpiry?.message}
            hint="Must have at least 6 months validity remaining">
            <Input id="passportExpiry" type="date" {...register("passportExpiry")} error={!!errors.passportExpiry} />
          </Field>
        </FormSection>

        {/* Professional */}
        <FormSection title="Professional Background">
          <Field id="currentOccupation" label="Current Occupation" required error={errors.currentOccupation?.message}>
            <Input id="currentOccupation" placeholder="e.g. Driver, Carpenter" {...register("currentOccupation")} error={!!errors.currentOccupation} />
          </Field>
          <Field id="yearsOfExperience" label="Years of Experience" required error={errors.yearsOfExperience?.message}>
            <Select id="yearsOfExperience" placeholder="Select…" options={[
              { value: "Less than 1 year", label: "Less than 1 year" },
              { value: "1–2 years", label: "1–2 years" },
              { value: "3–5 years", label: "3–5 years" },
              { value: "5–10 years", label: "5–10 years" },
              { value: "More than 10 years", label: "More than 10 years" },
            ]} {...register("yearsOfExperience")} error={!!errors.yearsOfExperience} />
          </Field>
          <Field id="highestQualification" label="Highest Qualification" required error={errors.highestQualification?.message}>
            <Select id="highestQualification" placeholder="Select…" options={[
              { value: "Below O/L", label: "Below O/L" },
              { value: "O/L", label: "O/L (Ordinary Level)" },
              { value: "A/L", label: "A/L (Advanced Level)" },
              { value: "NVQ 1-3", label: "NVQ Level 1–3" },
              { value: "NVQ 4-5", label: "NVQ Level 4–5" },
              { value: "Diploma", label: "Diploma" },
              { value: "HND", label: "Higher National Diploma" },
              { value: "Degree", label: "Degree" },
              { value: "Postgraduate", label: "Postgraduate" },
            ]} {...register("highestQualification")} error={!!errors.highestQualification} />
          </Field>
          <Field id="hasDrivingLicence" label="Driving Licence">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" {...register("hasDrivingLicence")} className="rounded" />
              Has a valid Sri Lankan driving licence
            </label>
          </Field>
          <Field id="professionalQualifications" label="Professional Qualifications" fullWidth>
            <Textarea id="professionalQualifications" rows={2} placeholder="NVQ certificates, trade tests, etc." {...register("professionalQualifications")} />
          </Field>
          <Field id="relevantSkills" label="Relevant Skills" fullWidth>
            <Textarea id="relevantSkills" rows={2} placeholder="Key skills relevant to the applied role…" {...register("relevantSkills")} />
          </Field>
          <Field id="overseasExperience" label="Previous Overseas Experience" fullWidth>
            <Textarea id="overseasExperience" rows={2} placeholder="Countries worked in, duration, role…" {...register("overseasExperience")} />
          </Field>
        </FormSection>

        {/* CV Upload */}
        <FormSection title="CV / Documents" description="Upload the applicant's CV. File is stored privately and accessed via secure signed URL." columns={1}>
          <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-slate-300 p-8 transition hover:border-navy-400">
            <div className="text-center">
              <Upload className="mx-auto mb-3 size-8 text-slate-300" />
              <p className="text-sm font-medium text-slate-600">Drag & drop CV here, or click to browse</p>
              <p className="mt-1 text-xs text-slate-400">PDF, DOC, DOCX — Max 5 MB</p>
              <input type="file" accept=".pdf,.doc,.docx" className="mt-4 block w-full text-xs text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-navy-50 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-navy-700 hover:file:bg-navy-100 cursor-pointer" />
            </div>
          </div>
        </FormSection>

        {/* Consent */}
        <FormSection title="Consent" columns={1}>
          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input type="checkbox" {...register("privacyConsent")} className="mt-0.5 rounded" />
            <span>
              I confirm that the applicant has provided consent for their personal information to be stored and used for recruitment purposes in accordance with our{" "}
              <Link href="/privacy-policy" target="_blank" className="text-navy-600 underline">Privacy Policy</Link>.
            </span>
          </label>
        </FormSection>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <Link href="/admin/applicants" className="text-sm text-slate-500 hover:text-navy-700 transition">
            ← Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-lg bg-navy-800 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700 disabled:opacity-60"
          >
            {isSubmitting && <Loader2 className="size-4 animate-spin" />}
            {isSubmitting ? "Saving…" : "Save Applicant"}
          </button>
        </div>
      </form>
    </div>
  );
}
