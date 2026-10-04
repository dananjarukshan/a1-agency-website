import {
  BadgeCheck, Users, Eye, HeartHandshake,
  Globe, FileStack
} from "lucide-react";
import styles from "./WhyChooseUs.module.css";

const features = [
  {
    icon: BadgeCheck,
    title: "Clear Job Information",
    description:
      "Each published role is designed to show salary, requirements, benefits, dates, and application steps clearly.",
  },
  {
    icon: Users,
    title: "Professional Recruitment Workflow",
    description:
      "The platform is structured to support candidates and employers throughout the recruitment process.",
  },
  {
    icon: Eye,
    title: "Transparent Process",
    description:
      "We believe in clear communication. Candidates are kept informed at every stage.",
  },
  {
    icon: HeartHandshake,
    title: "Candidate Guidance",
    description:
      "From application to departure, we guide candidates on documentation, medical requirements, and pre-departure preparation.",
  },
  {
    icon: Globe,
    title: "International Reach",
    description:
      "Recruitment content is organized for opportunities across Saudi Arabia, UAE, Qatar, Kuwait, Oman, and Bahrain.",
  },
  {
    icon: FileStack,
    title: "End-to-End Support",
    description:
      "Comprehensive recruitment support covering screening, documentation coordination, and visa assistance.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className={styles.section} aria-labelledby="why-choose-us-heading">
      <div className={`container-padded ${styles.layout}`}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Why Work With Us</p>
          <h2 id="why-choose-us-heading" className={styles.heading}>
            Why Candidates Choose A1 Agency
          </h2>
          <p className={styles.description}>
            We are committed to ethical, transparent, and professional overseas recruitment for Sri Lankan workers.
          </p>
        </header>

        <ul className={styles.grid} role="list">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <li
                key={feature.title}
                className={styles.feature}
              >
                <div className={styles.icon}>
                  <Icon size={21} aria-hidden="true" />
                </div>
                <div className={styles.featureBody}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
