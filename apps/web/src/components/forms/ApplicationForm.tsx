"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, ArrowUpRight, CheckCircle, FileText, Info, Loader2, Upload, X } from "lucide-react";
import type { Job } from "@/types";
import { jobClosingState } from "@/lib/job-presentation";
import styles from "./ApplicationForm.module.css";

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

const sriLankaDistricts = ["Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"];
const experienceLevels = ["Less than 1 year", "1–2 years", "3–5 years", "5–10 years", "More than 10 years"];
const qualifications = ["Below O/L", "O/L (Ordinary Level)", "A/L (Advanced Level)", "NVQ Level 1–3", "NVQ Level 4–5", "Diploma", "Higher National Diploma", "Degree", "Postgraduate"];

function FormSection({ number, title, description, children }: { number: string; title: string; description: string; children: React.ReactNode }) {
  return <fieldset className={styles.section}><legend><span>{number}</span>{title}</legend><p className={styles.sectionIntro}>{description}</p><div className={styles.grid}>{children}</div></fieldset>;
}

function Field({ id, label, error, optional = false, full = false, children }: { id: string; label: string; error?: string; optional?: boolean; full?: boolean; children: React.ReactNode }) {
  return <div className={full ? styles.full : styles.field}><label htmlFor={id} className={styles.label}>{label}{optional && <span>Optional</span>}</label>{children}{error && <p className={styles.error} id={`${id}-error`}><AlertCircle size={14} aria-hidden="true" />{error}</p>}</div>;
}

export default function ApplicationForm({ job }: { job: Job }) {
  const [submitted, setSubmitted] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState("");
  const [deadlineError, setDeadlineError] = useState(false);
  const cvInput = useRef<HTMLInputElement>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { hasDrivingLicence: false },
    shouldFocusError: true,
  });

  useEffect(() => { if (submitted) successHeading.current?.focus(); }, [submitted]);

  const accessibility = (name: keyof FormData, required = true) => ({
    "aria-invalid": Boolean(errors[name]), "aria-required": required,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });
  const clearCv = () => {
    setCvFile(null);
    setCvError("");
    if (cvInput.current) { cvInput.current.value = ""; cvInput.current.focus(); }
  };
  const handleCvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setCvError("");
    setCvFile(null);
    if (!file) return;
    const allowedMimeTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowedMimeTypes.includes(file.type) || !/\.(pdf|doc|docx)$/i.test(file.name)) {
      setCvError("Please upload a PDF or Word document (.pdf, .doc, .docx)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) { setCvError("File size must not exceed 5 MB"); return; }
    setCvFile(file);
  };
  const onSubmit = async () => {
    // A rejected optional file must be removed or replaced before validating the demo.
    if (cvError) {
      // RHF clears isSubmitting after this handler returns; focus once the input is enabled.
      requestAnimationFrame(() => cvInput.current?.focus());
      return;
    }
    if (job.status !== "active" || jobClosingState(job.closingDate).closed) { setDeadlineError(true); return; }
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
  };

  if (submitted) return (
    <section className={styles.success} aria-labelledby="application-success-heading">
      <CheckCircle size={42} className={styles.successIcon} aria-hidden="true" /><p className={styles.eyebrow}>Development confirmation</p>
      <h2 ref={successHeading} id="application-success-heading" tabIndex={-1}>Demo application validated.</h2>
      <p>Thank you for your interest in <strong>{job.title}</strong> in {job.countryName}. Your entries passed the checks in this development version.</p>
      <p>No personal information or CV was sent, uploaded or stored by this demo. This is not a live job application. Contact A-One for current recruitment information.</p>
      <p className={styles.reference}>Demo reference <strong>APP-{job.reference}</strong><span>Preview only — not a live application number.</span></p>
      <div className={styles.actions}><Link href="/jobs" className={styles.primary}>Browse More Jobs <ArrowUpRight size={17} aria-hidden="true" /></Link><Link href={`/jobs/${job.slug}`} className={styles.textLink}>Back to Job <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
      <Link href="/contact" className={styles.textLink}>Contact A-One</Link>
    </section>
  );

  return (
    <form onSubmit={(event) => { void handleSubmit(onSubmit)(event); }} noValidate className={styles.form} aria-label={`Application for ${job.title}`} aria-busy={isSubmitting}>
      <div className={styles.demoNote}><Info size={20} aria-hidden="true" /><p><strong>Try the application experience.</strong> Use test details. Your entries and CV are checked locally in your browser; they are not sent or saved.</p></div>
      <h2 className={styles.formHeading}>Your application details</h2><p className={styles.requiredNote}>All fields are required unless marked <span>Optional</span>.</p>
      {Object.keys(errors).length > 0 && <p className={styles.errorSummary} role="alert">Please review the highlighted fields. Your application has not been submitted.</p>}
      <FormSection number="01" title="Personal information" description="Enter your name and identity details for this preview.">
        <Field id="fullName" label="Full name" error={errors.fullName?.message}><input id="fullName" {...register("fullName")} {...accessibility("fullName")} autoComplete="name" className={styles.control} placeholder="As in NIC / Passport" /></Field>
        <Field id="nic" label="NIC / National Identity Card No." error={errors.nic?.message}><input id="nic" {...register("nic")} {...accessibility("nic")} className={styles.control} placeholder="e.g. 123456789V" /></Field>
        <Field id="dateOfBirth" label="Date of birth" error={errors.dateOfBirth?.message}><input id="dateOfBirth" type="date" {...register("dateOfBirth")} {...accessibility("dateOfBirth")} autoComplete="bday" className={styles.control} /></Field>
      </FormSection>
      <FormSection number="02" title="Contact information" description="Include your phone number and current home address.">
        <Field id="phone" label="Mobile phone number" error={errors.phone?.message}><input id="phone" type="tel" {...register("phone")} {...accessibility("phone")} autoComplete="tel" placeholder="+94 7X XXX XXXX" className={styles.control} /></Field>
        <Field id="whatsapp" label="WhatsApp number (if different)" optional><input id="whatsapp" type="tel" {...register("whatsapp")} {...accessibility("whatsapp", false)} className={styles.control} placeholder="+94 7X XXX XXXX" /></Field>
        <Field id="email" label="Email address" optional error={errors.email?.message}><input id="email" type="email" {...register("email")} {...accessibility("email", false)} autoComplete="email" className={styles.control} placeholder="your@email.com" /></Field>
        <Field id="district" label="District" error={errors.district?.message}><select id="district" {...register("district")} {...accessibility("district")} className={styles.control}><option value="">Select district</option>{sriLankaDistricts.map((district) => <option key={district} value={district}>{district}</option>)}</select></Field>
        <Field id="address" label="Home address" error={errors.address?.message} full><textarea id="address" {...register("address")} {...accessibility("address")} autoComplete="street-address" rows={3} className={styles.control} placeholder="Your current home address" /></Field>
      </FormSection>
      <FormSection number="03" title="Professional information" description="Tell us about your experience, education and relevant skills.">
        <Field id="currentOccupation" label="Current / previous occupation" error={errors.currentOccupation?.message}><input id="currentOccupation" {...register("currentOccupation")} {...accessibility("currentOccupation")} className={styles.control} placeholder="e.g. Driver, Electrician" /></Field>
        <Field id="yearsOfExperience" label="Years of relevant experience" error={errors.yearsOfExperience?.message}><select id="yearsOfExperience" {...register("yearsOfExperience")} {...accessibility("yearsOfExperience")} className={styles.control}><option value="">Select experience</option>{experienceLevels.map((level) => <option key={level} value={level}>{level}</option>)}</select></Field>
        <Field id="highestQualification" label="Highest educational qualification" error={errors.highestQualification?.message}><select id="highestQualification" {...register("highestQualification")} {...accessibility("highestQualification")} className={styles.control}><option value="">Select qualification</option>{qualifications.map((qualification) => <option key={qualification} value={qualification}>{qualification}</option>)}</select></Field>
        <Field id="professionalQualifications" label="Professional / technical qualifications" optional><input id="professionalQualifications" {...register("professionalQualifications")} {...accessibility("professionalQualifications", false)} className={styles.control} placeholder="e.g. NVQ Level 3 in Electrical" /></Field>
        <Field id="relevantSkills" label="Key skills" optional full><input id="relevantSkills" {...register("relevantSkills")} {...accessibility("relevantSkills", false)} className={styles.control} placeholder="Skills relevant to this role" /></Field>
      </FormSection>
      <FormSection number="04" title="Additional information" description="Share any driving licence or overseas work experience.">
        <div className={styles.full}><label htmlFor="hasDrivingLicence" className={styles.checkboxLabel}><input id="hasDrivingLicence" type="checkbox" {...register("hasDrivingLicence")} /><span>I hold a valid Sri Lankan driving licence <small>(Optional)</small></span></label></div>
        <Field id="overseasExperience" label="Previous overseas employment experience" optional full><textarea id="overseasExperience" {...register("overseasExperience")} {...accessibility("overseasExperience", false)} className={styles.control} rows={3} placeholder="Country, employer type, duration (or 'None')" /></Field>
      </FormSection>
      <FormSection number="05" title="CV / documents" description="Optionally select a CV to preview the document checks.">
        <div className={styles.full}><label htmlFor="cv-upload" className={styles.label}>CV / resume <span>Optional</span></label><div className={styles.upload}>
          <Upload size={28} aria-hidden="true" /><p>Choose your CV</p><p id="cv-help">PDF, DOC or DOCX · maximum 5 MB.<br />Checked in this browser only; not uploaded or stored.</p>
          <input ref={cvInput} id="cv-upload" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleCvChange} aria-invalid={Boolean(cvError)} aria-describedby={`cv-help${cvError ? " cv-error" : ""}`} disabled={isSubmitting} />
        </div>{cvFile && <p className={styles.fileSummary} role="status"><FileText size={17} aria-hidden="true" /><span>{cvFile.name}<small>{(cvFile.size / 1024).toFixed(1)} KB · selected for demo validation</small></span></p>}{cvError && <p id="cv-error" className={styles.error} role="alert"><AlertCircle size={14} aria-hidden="true" />{cvError}</p>}{(cvFile || cvError) && <button type="button" className={styles.removeFile} onClick={clearCv} disabled={isSubmitting}><X size={16} aria-hidden="true" />Remove selected file</button>}</div>
      </FormSection>
      <FormSection number="06" title="Declaration & consent" description="Review the declaration before continuing.">
        <div className={styles.full}><div className={styles.declaration}><p>By submitting this application, I confirm that:</p><ul><li>The information provided is accurate and complete to the best of my knowledge.</li><li>I understand that submitting an application does not guarantee employment.</li><li>I consent to my personal data being processed for recruitment purposes.</li><li>I understand that misrepresentation of information may disqualify my application.</li></ul></div>
          <label htmlFor="privacyConsent" className={styles.checkboxLabel}><input id="privacyConsent" type="checkbox" {...register("privacyConsent")} {...accessibility("privacyConsent")} /><span>I agree to the <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy<span className="sr-only"> (opens in a new tab)</span></Link> and <Link href="/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions<span className="sr-only"> (opens in a new tab)</span></Link>. I confirm the above declaration.</span></label>
          {errors.privacyConsent && <p id="privacyConsent-error" className={styles.error}><AlertCircle size={14} aria-hidden="true" />{errors.privacyConsent.message}</p>}
          <p className={styles.privacyNote}>This development preview does not send or save your personal details or documents.</p>
        </div>
      </FormSection>
      {deadlineError && <p className={styles.errorSummary} role="alert">This vacancy is no longer accepting applications. <Link href="/jobs">Browse other jobs</Link>.</p>}
      <button type="submit" disabled={isSubmitting || deadlineError} className={styles.primary}>{isSubmitting ? <><Loader2 size={18} className={styles.spinner} aria-hidden="true" />Validating demo application…</> : <>Validate demo application <ArrowUpRight size={18} aria-hidden="true" /></>}</button>
      <p className={styles.submitNote} role="status">{isSubmitting ? "Checking your entries locally. Nothing is being sent." : "Demo only. No application is sent to the agency or employer."}</p>
    </form>
  );
}
