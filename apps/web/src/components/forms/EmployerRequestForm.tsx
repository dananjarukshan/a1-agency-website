"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, AlertCircle, ArrowUpRight, Info, Loader2 } from "lucide-react";
import { countries } from "@/data";
import { siteConfig } from "@/config/site";
import styles from "./EmployerRequestForm.module.css";

// Preserve the existing frontend validation contract, including optional dates.
const schema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  country: z.string().min(1, "Please select country"),
  website: z.string().refine((value) => !value || z.url().safeParse(value).success, "Enter a valid website URL").optional(),
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

// Existing employer business sectors, distinct from the recruitment-field catalog.
// Keep these option values and the country-name payload unchanged.
const industries = [
  "Construction & Contracting", "Hospitality & Catering", "Healthcare & Medical",
  "Transportation & Fleet", "Logistics & Warehousing", "Facilities Management",
  "Engineering & Technology", "Manufacturing & Industry", "Retail & Commercial",
  "Security Services", "Domestic Services", "Other Industry",
];

function FormSection({ number, title, description, children, emphasis = false }: {
  number: string; title: string; description: string; children: ReactNode; emphasis?: boolean;
}) {
  return (
    <fieldset className={`${styles.section} ${emphasis ? styles.emphasis : ""}`}>
      <legend><h3><span aria-hidden="true">{number}</span>{title}</h3></legend>
      <p className={styles.sectionDescription}>{description}</p>
      <div className={styles.grid}>{children}</div>
    </fieldset>
  );
}

function Field({ name, label, optional = false, wide = false, error, children }: {
  name: keyof FormData; label: string; optional?: boolean; wide?: boolean; error?: string; children: ReactNode;
}) {
  return (
    <div className={wide ? styles.wide : styles.field}>
      <label htmlFor={name} className={styles.label}>{label}{optional && <span>Optional</span>}</label>
      {children}
      {error && <p className={styles.error} id={`${name}-error`}><AlertCircle size={14} aria-hidden="true" />{error}</p>}
    </div>
  );
}

export default function EmployerRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [reqRef, setReqRef] = useState("");
  const successHeading = useRef<HTMLHeadingElement>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { numberOfWorkers: 5, privacyConsent: false as never },
    shouldFocusError: true,
  });

  useEffect(() => {
    if (submitted) successHeading.current?.focus();
  }, [submitted]);

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1500));
    setReqRef("DEMO-REQ-001");
    setSubmitted(true);
  };

  const accessibility = (name: keyof FormData, required = true) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-required": required,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  if (submitted) {
    return (
      <section className={styles.success} aria-labelledby="request-success-heading">
        <CheckCircle size={42} aria-hidden="true" className={styles.successIcon} />
        <p className={styles.successEyebrow}>Development confirmation</p>
        <h2 id="request-success-heading" ref={successHeading} tabIndex={-1}>Demo request validated.</h2>
        <p>Your manpower request passed frontend validation. No company information was transmitted or stored by this demo.</p>
        <p>Live request submission will be enabled when backend integration is completed. To discuss your requirements now, contact A-One directly.</p>
        <p className={styles.reference}>Demo reference <strong>{reqRef}</strong><span>Preview only — not a live request number.</span></p>
        <div className={styles.successActions}>
          <Link href="/employers" className={styles.primary}>Return to For Employers <ArrowUpRight size={17} aria-hidden="true" /></Link>
          <Link href="/contact" className={styles.textLink}>Contact A-One <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <Link href="/" className={styles.homeLink}>Return Home</Link>
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form} aria-label="Manpower requirement enquiry" aria-busy={isSubmitting}>
      <div className={styles.demoNote}><Info size={20} aria-hidden="true" /><p><strong>Development preview</strong>This form validates your entries locally. It does not send a request or save your information. For a live enquiry, <Link href="/contact">contact A-One</Link>.</p></div>
      <p className={styles.requiredNote}>All fields are required unless marked <span>Optional</span>.</p>
      {Object.keys(errors).length > 0 && <p className={styles.errorSummary} role="alert">Please review the highlighted fields. Your request has not been submitted.</p>}

      <FormSection number="01" title="Company information" description="Introduce the business you represent.">
        <Field name="companyName" label="Company name" error={errors.companyName?.message}>
          <input id="companyName" {...register("companyName")} {...accessibility("companyName")} autoComplete="organization" placeholder="Legal business name" className={styles.control} />
        </Field>
        <Field name="country" label="Company country" error={errors.country?.message}>
          <select id="country" {...register("country")} {...accessibility("country")} autoComplete="country-name" className={styles.control}>
            <option value="">Select employer country</option>
            {countries.map((country) => <option key={country.slug} value={country.name}>{country.shortName ?? country.name}</option>)}
            <option value="Other">Other destination</option>
          </select>
        </Field>
        <Field name="website" label="Company website" optional wide error={errors.website?.message}>
          <input id="website" type="url" {...register("website")} {...accessibility("website", false)} autoComplete="url" placeholder="https://www.company.com" className={styles.control} />
        </Field>
      </FormSection>

      <FormSection number="02" title="Contact person" description="Tell us who to contact about your recruitment requirements.">
        <Field name="contactPerson" label="Contact person name" error={errors.contactPerson?.message}>
          <input id="contactPerson" {...register("contactPerson")} {...accessibility("contactPerson")} autoComplete="name" placeholder="Your full name" className={styles.control} />
        </Field>
        <Field name="position" label="Designation / position" error={errors.position?.message}>
          <input id="position" {...register("position")} {...accessibility("position")} autoComplete="organization-title" placeholder="e.g. HR Manager" className={styles.control} />
        </Field>
        <Field name="email" label="Corporate email" error={errors.email?.message}>
          <input id="email" type="email" {...register("email")} {...accessibility("email")} autoComplete="email" placeholder="name@company.com" className={styles.control} />
        </Field>
        <Field name="phone" label="Phone / WhatsApp number" error={errors.phone?.message}>
          <input id="phone" type="tel" {...register("phone")} {...accessibility("phone")} autoComplete="tel" placeholder="Include your country code" className={styles.control} />
        </Field>
      </FormSection>

      <FormSection number="03" title="Workforce requirement" description="Define the roles, team size and experience your business needs." emphasis>
        <Field name="industry" label="Industry sector" error={errors.industry?.message}>
          <select id="industry" {...register("industry")} {...accessibility("industry")} className={styles.control}>
            <option value="">Select industry</option>
            {industries.map((industry) => <option key={industry} value={industry}>{industry}</option>)}
          </select>
        </Field>
        <Field name="jobTitleRequired" label="Required position / job title" error={errors.jobTitleRequired?.message}>
          <input id="jobTitleRequired" {...register("jobTitleRequired")} {...accessibility("jobTitleRequired")} placeholder="e.g. Heavy Driver, HVAC Technician" className={styles.control} />
        </Field>
        <Field name="numberOfWorkers" label="Number of workers required" error={errors.numberOfWorkers?.type === "invalid_type" ? "Enter the number of workers required" : errors.numberOfWorkers?.message}>
          <input id="numberOfWorkers" type="number" min={1} {...register("numberOfWorkers", { valueAsNumber: true })} {...accessibility("numberOfWorkers")} className={styles.control} />
        </Field>
        <Field name="requiredExperience" label="Required experience level" error={errors.requiredExperience?.message}>
          <select id="requiredExperience" {...register("requiredExperience")} {...accessibility("requiredExperience")} className={styles.control}>
            <option value="">Select experience required</option>
            <option value="No experience / Trainee">No experience / Trainee</option>
            <option value="1-2 years">1-2 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5+ years senior">5+ years senior</option>
          </select>
        </Field>
        <Field name="qualifications" label="Qualifications & skills" optional wide error={errors.qualifications?.message}>
          <textarea id="qualifications" rows={3} {...register("qualifications")} {...accessibility("qualifications", false)} placeholder="Describe relevant qualifications, skills or certifications." className={styles.control} />
        </Field>
      </FormSection>

      <FormSection number="04" title="Salary, benefits & conditions" description="Share the proposed terms. Use the benefits field for working hours, accommodation and other conditions.">
        <Field name="salary" label="Offered monthly salary range" optional wide error={errors.salary?.message}>
          <input id="salary" {...register("salary")} {...accessibility("salary", false)} placeholder="Include the currency and salary range" className={styles.control} />
        </Field>
        <Field name="benefits" label="Provided benefits & working conditions" optional wide error={errors.benefits?.message}>
          <textarea id="benefits" rows={4} {...register("benefits")} {...accessibility("benefits", false)} placeholder="Describe any offered accommodation, food, transport, medical cover, working hours or other benefits." className={styles.control} />
        </Field>
      </FormSection>

      <FormSection number="05" title="Recruitment timeline" description="Share your preferred joining date, if known. Timing is subject to discussion and the applicable recruitment steps.">
        <Field name="expectedJoiningDate" label="Target deployment date" optional wide error={errors.expectedJoiningDate?.message}>
          <input id="expectedJoiningDate" type="date" {...register("expectedJoiningDate")} {...accessibility("expectedJoiningDate", false)} className={styles.control} />
        </Field>
      </FormSection>

      <FormSection number="06" title="Additional requirements & consent" description="Add any other details that will help explain your request.">
        <Field name="additionalRequirements" label="Additional job description & requirements" optional wide error={errors.additionalRequirements?.message}>
          <textarea id="additionalRequirements" rows={5} {...register("additionalRequirements")} {...accessibility("additionalRequirements", false)} placeholder="Describe additional roles, specific requirements or special conditions." className={styles.control} />
        </Field>
        <div className={styles.wide}>
          <label htmlFor="privacyConsent" className={styles.consent}>
            <input id="privacyConsent" type="checkbox" {...register("privacyConsent")} {...accessibility("privacyConsent")} />
            <span>I confirm that I represent the employer named above and authorize {siteConfig.shortName} to contact me regarding manpower recruitment services.</span>
          </label>
          {errors.privacyConsent && <p id="privacyConsent-error" className={styles.error}><AlertCircle size={14} aria-hidden="true" />{errors.privacyConsent.message}</p>}
          <p className={styles.privacyNote}>Read our <Link href="/privacy-policy">Privacy Policy</Link>. This development form does not transmit or store your entries.</p>
        </div>
      </FormSection>

      <div className={styles.submitArea}>
        <button type="submit" disabled={isSubmitting} className={styles.primary}>
          {isSubmitting ? <><Loader2 size={18} className={styles.spinner} aria-hidden="true" />Validating request...</> : <>Submit Manpower Request <ArrowUpRight size={19} aria-hidden="true" /></>}
        </button>
        <p role="status">{isSubmitting ? "Checking your entries locally. No information is being sent." : "Development preview — validation only, no live submission."}</p>
      </div>
    </form>
  );
}
