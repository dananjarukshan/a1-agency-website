import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { jobCategoryDefinitions } from "@/data/job-categories";
import EmployerShowcaseScene from "./EmployerShowcaseScene";
import styles from "./EmployerCTA.module.css";

const showcaseFields = [
  "construction", "hospitality", "healthcare", "drivers", "engineering", "garment-industry",
].flatMap((slug) => {
  const category = jobCategoryDefinitions.find((field) => field.slug === slug && field.agencyConfirmed);
  return category ? [category] : [];
});

export default function EmployerCTA() {
  return (
    <EmployerShowcaseScene>
      <p className={styles.eyebrow}>
        <Building2 size={16} aria-hidden="true" />
        For overseas employers
      </p>
      <h2 id="employer-cta-heading" className={styles.heading}>
        Recruit Skilled Sri Lankan Talent <span>with A-ONE</span>
      </h2>
      <p className={styles.description}>
        A-One connects overseas employers with skilled, semi-skilled and technical
        Sri Lankan workers through a structured recruitment process covering
        candidate sourcing, screening, documentation coordination and deployment support.
      </p>
      <div className={styles.actions}>
        <Link href="/employers/request-manpower" className={styles.primaryCta}>
          Request Manpower <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <Link href="/employers" className={styles.secondaryCta}>
          Employer Services
        </Link>
      </div>
      <div className={styles.capabilities}>
        <h3 className={styles.fieldsHeading}>Recruitment across key sectors</h3>
        <ul className={styles.fields}>
          {showcaseFields.map((field) => <li key={field.slug}>{field.name}</li>)}
        </ul>
        <Link href="/job-categories" className={styles.fieldsLink}>
          View all recruitment fields <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </EmployerShowcaseScene>
  );
}
