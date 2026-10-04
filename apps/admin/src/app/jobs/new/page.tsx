"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  FormSection,
  Field,
  Input,
  Textarea,
  Select,
  ActionButton,
} from "@/components/admin/ui";

const schema = z.object({
  // Core
  title: z.string().min(3, "Min 3 characters").max(120),
  reference: z.string().min(1, "Reference required").regex(/^A1-/, "Must start with A1-"),
  slug: z.string().min(1, "Slug required").regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and hyphens only"),
  country: z.string().min(1, "Select a country"),
  city: z.string().optional(),
  employerName: z.string().min(2, "Employer name required"),
  categorySlug: z.string().min(1, "Select a category"),
  // Salary
  currency: z.string().min(1, "Currency required"),
  salaryMin: z.coerce.number().min(0).optional(),
  salaryMax: z.coerce.number().min(0).optional(),
  // Vacancies
  vacancies: z.coerce.number().int().min(1, "At least 1 vacancy"),
  // SLBFE (mandatory)
  slbfeApprovalNumber: z.string().min(1, "SLBFE approval number required"),
  ageMin: z.coerce.number().int().min(18).max(60),
  ageMax: z.coerce.number().int().min(18).max(65),
  genderPreference: z.enum(["any", "male", "female"]),
  // Description
  description: z.string().min(20, "Min 20 characters"),
  responsibilities: z.array(z.object({ value: z.string().min(5) })).min(1, "Add at least one responsibility"),
  requirements: z.array(z.object({ value: z.string() })).optional(),
  benefits: z.array(z.object({ value: z.string() })).optional(),
  // Conditions
  accommodation: z.string().min(1),
  food: z.string().min(1),
  transportation: z.string().min(1),
  medical: z.string().min(1),
  insurance: z.string().min(1),
  workingHours: z.string().min(1, "Working hours required"),
  contractPeriod: z.string().min(1, "Contract period required"),
  experience: z.string().min(1),
  employmentType: z.string().min(1),
  // Dates & Status
  closingDate: z.string().min(1, "Closing date required"),
  status: z.enum(["draft", "active", "paused", "closed"]),
  featured: z.boolean().optional(),
  // Optional
  interviewInfo: z.string().optional(),
  otherConditions: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const providedOptions = [
  { value: "Provided", label: "Provided" },
  { value: "Not Provided", label: "Not Provided" },
  { value: "Allowance", label: "Allowance" },
];

const transportOptions = [
  { value: "Provided", label: "Provided" },
  { value: "Not Provided", label: "Not Provided" },
  { value: "Own", label: "Own Arrangement" },
];

export default function NewJobPage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      status: "draft",
      genderPreference: "any",
      ageMin: 21,
      ageMax: 45,
      vacancies: 1,
      responsibilities: [{ value: "" }],
      requirements: [{ value: "" }],
      benefits: [{ value: "" }],
    },
  });

  const responsibilities = useFieldArray({ control, name: "responsibilities" });
  const requirements = useFieldArray({ control, name: "requirements" });
  const benefits = useFieldArray({ control, name: "benefits" });

  const onSubmit = async (data: FormData) => {
    // TODO: Call Server Action / API after Supabase setup
    console.log("Submit job:", data);
    alert("Job saved! (Connect Supabase to persist data)");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/jobs" className="text-slate-400 hover:text-navy-700 transition">
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="text-xl font-bold text-navy-900">Post New Job Vacancy</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Basic Info */}
        <FormSection title="Basic Information" description="Core job details visible on the public listing.">
          <Field id="title" label="Job Title" required error={errors.title?.message} fullWidth>
            <Input id="title" placeholder="e.g. Heavy Vehicle Driver" {...register("title")} error={!!errors.title} />
          </Field>
          <Field id="reference" label="Reference No." required error={errors.reference?.message}>
            <Input id="reference" placeholder="A1-SA-001" {...register("reference")} error={!!errors.reference} />
          </Field>
          <Field id="slug" label="URL Slug" required error={errors.slug?.message}>
            <Input id="slug" placeholder="heavy-vehicle-driver-saudi" {...register("slug")} error={!!errors.slug} />
          </Field>
          <Field id="employerName" label="Employer Name" required error={errors.employerName?.message}>
            <Input id="employerName" placeholder="International Employer – Saudi Arabia" {...register("employerName")} error={!!errors.employerName} />
          </Field>
          <Field id="country" label="Destination Country" required error={errors.country?.message}>
            <Select
              id="country"
              placeholder="Select country…"
              options={[
                { value: "saudi-arabia", label: "🇸🇦 Saudi Arabia" },
                { value: "united-arab-emirates", label: "🇦🇪 UAE" },
                { value: "qatar", label: "🇶🇦 Qatar" },
                { value: "kuwait", label: "🇰🇼 Kuwait" },
                { value: "bahrain", label: "🇧🇭 Bahrain" },
                { value: "oman", label: "🇴🇲 Oman" },
                { value: "malaysia", label: "🇲🇾 Malaysia" },
              ]}
              {...register("country")}
              error={!!errors.country}
            />
          </Field>
          <Field id="city" label="City / Region" error={errors.city?.message}>
            <Input id="city" placeholder="e.g. Riyadh, Jeddah" {...register("city")} />
          </Field>
          <Field id="categorySlug" label="Job Category" required error={errors.categorySlug?.message}>
            <Select
              id="categorySlug"
              placeholder="Select category…"
              options={[
                { value: "driving", label: "Driving" },
                { value: "construction", label: "Construction" },
                { value: "hospitality", label: "Hospitality" },
                { value: "domestic-services", label: "Domestic Services" },
                { value: "healthcare", label: "Healthcare" },
                { value: "engineering", label: "Engineering" },
              ]}
              {...register("categorySlug")}
              error={!!errors.categorySlug}
            />
          </Field>
          <Field id="employmentType" label="Employment Type" required error={errors.employmentType?.message}>
            <Select
              id="employmentType"
              placeholder="Select…"
              options={[
                { value: "full-time", label: "Full Time" },
                { value: "contract", label: "Contract" },
                { value: "temporary", label: "Temporary" },
              ]}
              {...register("employmentType")}
              error={!!errors.employmentType}
            />
          </Field>
        </FormSection>

        {/* SLBFE & Demographics — mandatory */}
        <FormSection
          title="SLBFE & Eligibility Criteria"
          description="Mandatory fields required for SLBFE-compliant job postings."
        >
          <Field id="slbfeApprovalNumber" label="SLBFE Approval Number" required error={errors.slbfeApprovalNumber?.message} fullWidth>
            <Input
              id="slbfeApprovalNumber"
              placeholder="e.g. SLBFE-2024-00001"
              {...register("slbfeApprovalNumber")}
              error={!!errors.slbfeApprovalNumber}
            />
          </Field>
          <Field id="ageMin" label="Minimum Age" required error={errors.ageMin?.message}>
            <Input id="ageMin" type="number" min={18} max={60} {...register("ageMin")} error={!!errors.ageMin} />
          </Field>
          <Field id="ageMax" label="Maximum Age" required error={errors.ageMax?.message}>
            <Input id="ageMax" type="number" min={18} max={65} {...register("ageMax")} error={!!errors.ageMax} />
          </Field>
          <Field id="genderPreference" label="Gender Preference" required error={errors.genderPreference?.message}>
            <Select
              id="genderPreference"
              options={[
                { value: "any", label: "Any / No Preference" },
                { value: "male", label: "Male Only" },
                { value: "female", label: "Female Only" },
              ]}
              {...register("genderPreference")}
            />
          </Field>
        </FormSection>

        {/* Salary & Vacancies */}
        <FormSection title="Salary & Vacancies">
          <Field id="currency" label="Currency" required error={errors.currency?.message}>
            <Select
              id="currency"
              placeholder="Select…"
              options={[
                { value: "SAR", label: "SAR — Saudi Riyal" },
                { value: "AED", label: "AED — UAE Dirham" },
                { value: "QAR", label: "QAR — Qatari Riyal" },
                { value: "KWD", label: "KWD — Kuwaiti Dinar" },
                { value: "BHD", label: "BHD — Bahraini Dinar" },
                { value: "OMR", label: "OMR — Omani Rial" },
                { value: "USD", label: "USD — US Dollar" },
              ]}
              {...register("currency")}
              error={!!errors.currency}
            />
          </Field>
          <Field id="vacancies" label="Number of Vacancies (Quota)" required error={errors.vacancies?.message}>
            <Input id="vacancies" type="number" min={1} {...register("vacancies")} error={!!errors.vacancies} />
          </Field>
          <Field id="salaryMin" label="Salary Min" error={errors.salaryMin?.message}>
            <Input id="salaryMin" type="number" min={0} placeholder="e.g. 1200" {...register("salaryMin")} />
          </Field>
          <Field id="salaryMax" label="Salary Max" error={errors.salaryMax?.message}>
            <Input id="salaryMax" type="number" min={0} placeholder="e.g. 1800" {...register("salaryMax")} />
          </Field>
        </FormSection>

        {/* Description */}
        <FormSection title="Job Description" columns={1}>
          <Field id="description" label="Description" required error={errors.description?.message} fullWidth>
            <Textarea
              id="description"
              rows={5}
              placeholder="Describe the role, the company, and what the applicant can expect…"
              {...register("description")}
              error={!!errors.description}
            />
          </Field>

          {/* Responsibilities */}
          <div className="col-span-full space-y-2">
            <label className="text-xs font-medium text-slate-700">
              Responsibilities <span className="text-red-500">*</span>
            </label>
            {responsibilities.fields.map((field, i) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  placeholder={`Responsibility ${i + 1}`}
                  {...register(`responsibilities.${i}.value`)}
                />
                {responsibilities.fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => responsibilities.remove(i)}
                    className="rounded-lg border border-red-200 p-2 text-red-400 hover:bg-red-50 transition"
                  >
                    <Trash2 className="size-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => responsibilities.append({ value: "" })}
              className="flex items-center gap-1.5 text-xs font-medium text-navy-600 hover:underline"
            >
              <Plus className="size-3" /> Add Responsibility
            </button>
          </div>

          {/* Requirements */}
          <div className="col-span-full space-y-2">
            <label className="text-xs font-medium text-slate-700">Requirements</label>
            {requirements.fields.map((field, i) => (
              <div key={field.id} className="flex gap-2">
                <Input placeholder={`Requirement ${i + 1}`} {...register(`requirements.${i}.value`)} />
                {requirements.fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => requirements.remove(i)}
                    className="rounded-lg border border-red-200 p-2 text-red-400 hover:bg-red-50 transition"
                  >
                    <Trash2 className="size-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => requirements.append({ value: "" })}
              className="flex items-center gap-1.5 text-xs font-medium text-navy-600 hover:underline"
            >
              <Plus className="size-3" /> Add Requirement
            </button>
          </div>

          {/* Benefits */}
          <div className="col-span-full space-y-2">
            <label className="text-xs font-medium text-slate-700">Benefits</label>
            {benefits.fields.map((field, i) => (
              <div key={field.id} className="flex gap-2">
                <Input placeholder={`Benefit ${i + 1}`} {...register(`benefits.${i}.value`)} />
                {benefits.fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => benefits.remove(i)}
                    className="rounded-lg border border-red-200 p-2 text-red-400 hover:bg-red-50 transition"
                  >
                    <Trash2 className="size-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => benefits.append({ value: "" })}
              className="flex items-center gap-1.5 text-xs font-medium text-navy-600 hover:underline"
            >
              <Plus className="size-3" /> Add Benefit
            </button>
          </div>
        </FormSection>

        {/* Working Conditions */}
        <FormSection title="Working Conditions & Contract">
          <Field id="accommodation" label="Accommodation" required error={errors.accommodation?.message}>
            <Select id="accommodation" placeholder="Select…" options={providedOptions} {...register("accommodation")} error={!!errors.accommodation} />
          </Field>
          <Field id="food" label="Food" required error={errors.food?.message}>
            <Select id="food" placeholder="Select…" options={providedOptions} {...register("food")} error={!!errors.food} />
          </Field>
          <Field id="transportation" label="Transportation" required error={errors.transportation?.message}>
            <Select id="transportation" placeholder="Select…" options={transportOptions} {...register("transportation")} error={!!errors.transportation} />
          </Field>
          <Field id="medical" label="Medical" required error={errors.medical?.message}>
            <Select id="medical" placeholder="Select…" options={[{ value: "Provided", label: "Provided" }, { value: "Not Provided", label: "Not Provided" }]} {...register("medical")} error={!!errors.medical} />
          </Field>
          <Field id="insurance" label="Insurance" required error={errors.insurance?.message}>
            <Select id="insurance" placeholder="Select…" options={[{ value: "Provided", label: "Provided" }, { value: "Not Provided", label: "Not Provided" }]} {...register("insurance")} error={!!errors.insurance} />
          </Field>
          <Field id="experience" label="Experience Level" required error={errors.experience?.message}>
            <Select id="experience" placeholder="Select…" options={[
              { value: "no-experience", label: "No Experience Required" },
              { value: "entry", label: "Entry Level (< 2 years)" },
              { value: "mid", label: "Mid Level (2–5 years)" },
              { value: "senior", label: "Senior (5+ years)" },
            ]} {...register("experience")} error={!!errors.experience} />
          </Field>
          <Field id="workingHours" label="Working Hours" required error={errors.workingHours?.message}>
            <Input id="workingHours" placeholder="e.g. 8 hours/day, 6 days/week" {...register("workingHours")} error={!!errors.workingHours} />
          </Field>
          <Field id="contractPeriod" label="Contract Period" required error={errors.contractPeriod?.message}>
            <Input id="contractPeriod" placeholder="e.g. 2 years renewable" {...register("contractPeriod")} error={!!errors.contractPeriod} />
          </Field>
        </FormSection>

        {/* Status & Publishing */}
        <FormSection title="Status & Publishing">
          <Field id="status" label="Status" required error={errors.status?.message}>
            <Select id="status" options={[
              { value: "draft", label: "Draft" },
              { value: "active", label: "Active" },
              { value: "paused", label: "Paused" },
              { value: "closed", label: "Closed" },
            ]} {...register("status")} />
          </Field>
          <Field id="closingDate" label="Closing Date" required error={errors.closingDate?.message}>
            <Input id="closingDate" type="date" {...register("closingDate")} error={!!errors.closingDate} />
          </Field>
          <Field id="featured" label="Featured Job" error={undefined} className="col-span-full">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" {...register("featured")} className="rounded" />
              Show this job as a featured/highlighted listing
            </label>
          </Field>
        </FormSection>

        {/* Optional */}
        <FormSection title="Additional Information" columns={1}>
          <Field id="interviewInfo" label="Interview Information" fullWidth>
            <Textarea id="interviewInfo" rows={3} placeholder="Details about the interview process, location, format…" {...register("interviewInfo")} />
          </Field>
          <Field id="otherConditions" label="Other Conditions" fullWidth>
            <Textarea id="otherConditions" rows={3} placeholder="Any other terms, conditions or notes for candidates…" {...register("otherConditions")} />
          </Field>
        </FormSection>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <Link href="/admin/jobs" className="text-sm text-slate-500 hover:text-navy-700 transition">
            ← Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-lg bg-navy-800 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700 disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
            {isSubmitting ? "Saving…" : "Save Job Vacancy"}
          </button>
        </div>
      </form>
    </div>
  );
}
