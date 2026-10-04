import { ArrowUpRight } from "lucide-react";
import styles from "./HowItWorks.module.css";

const steps = [
  {
    step: "01",
    title: "Search Opportunities",
    description: "Browse available vacancies by country, category, or keyword. Find positions that match your skills and experience.",
  },
  {
    step: "02",
    title: "Submit Application",
    description: "Complete the online application form and upload your CV. Our team will review your profile.",
  },
  {
    step: "03",
    title: "Initial Screening",
    description: "Shortlisted candidates are contacted and guided through the next steps in the recruitment process.",
  },
  {
    step: "04",
    title: "Employer Interview",
    description: "Meet with the prospective employer via interview. Some positions may require a practical skills test.",
  },
  {
    step: "05",
    title: "Documentation & Medical",
    description: "Selected candidates are guided through document preparation and medical examination requirements.",
  },
  {
    step: "06",
    title: "Visa Processing",
    description: "We assist with the visa application process and liaise with the employer on your behalf.",
  },
  {
    step: "07",
    title: "Pre-Departure",
    description: "Complete SLBFE registration and pre-departure orientation as required by Sri Lankan regulations.",
  },
  {
    step: "08",
    title: "Travel & Start Career",
    description: "Depart with confidence and begin your overseas career with full employer and agency support.",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} aria-labelledby="how-it-works-heading">
      <div className="container-padded">
        <div className={styles.header}>
          <p className={styles.eyebrow}>Recruitment Journey</p>
          <h2 id="how-it-works-heading" className={styles.heading}>
            How the Recruitment Process Works
          </h2>
          <p className={styles.description}>
            Our structured recruitment process is designed to be clear, transparent, and supportive
            every step of the way.
          </p>
        </div>

        <ol className={styles.timeline} role="list">
          {steps.map((step) => (
            <li key={step.step} className={styles.step}>
              <span className={styles.number} aria-hidden="true">{step.step}</span>
              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className={styles.action}>
          <a href="/how-it-works" className={styles.processLink}>
            Learn More About the Process
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
