import { ArrowUpRight } from "lucide-react";
import { homepageRecruitmentProcess, recruitmentJourneyOverview } from "@/data/recruitment-process";
import styles from "./HowItWorks.module.css";

export default function HowItWorks() {
  return (
    <section className={styles.section} aria-labelledby="how-it-works-heading">
      <div className="container-padded">
        <div className={styles.header}>
          <p className={styles.eyebrow}>Recruitment Journey</p>
          <h2 id="how-it-works-heading" className={styles.heading}>
            How the Recruitment Process Works
          </h2>
          <p className={styles.description}>{recruitmentJourneyOverview}</p>
        </div>

        <ol className={styles.timeline} role="list">
          {homepageRecruitmentProcess.map((step, index) => (
            <li key={step.id} className={styles.step}>
              <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
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
