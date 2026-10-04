import Image from "next/image";
import { BadgeCheck, Building2, Info, Quote, Star, UserRound } from "lucide-react";
import { recruitmentExperiences } from "@/data";
import type { RecruitmentExperience } from "@/types";
import styles from "./Testimonials.module.css";

const experienceGroups = [
  { type: "candidate", title: "Candidate Experiences", icon: UserRound },
  { type: "employer", title: "Employer Feedback", icon: Building2 },
] as const;

function ExperienceCard({ experience }: { experience: RecruitmentExperience }) {
  const isCandidate = experience.type === "candidate";
  const identity = experience.isDemo
    ? isCandidate ? "Sample Candidate Experience" : "Sample Employer Experience"
    : isCandidate ? experience.name : experience.company;
  const details = (isCandidate
    ? [experience.role, experience.destination]
    : [experience.contactRole, experience.country]
  ).filter(Boolean).join(" · ");
  const image = !experience.isDemo && (isCandidate ? experience.image : experience.logo);

  return (
    <figure className={styles.card}>
      <div className={styles.cardTop}>
        <Quote size={22} className={styles.quoteIcon} aria-hidden="true" />
        {experience.isDemo ? (
          <span className={styles.demoLabel}>Illustrative example</span>
        ) : experience.verified ? (
          <span className={styles.verifiedLabel}>
            <BadgeCheck size={15} aria-hidden="true" />
            Verified feedback
          </span>
        ) : null}
      </div>
      <blockquote className={styles.review}>
        <p>&ldquo;{experience.review}&rdquo;</p>
      </blockquote>
      <figcaption className={styles.caption}>
        {image && (
          <Image
            src={image}
            alt=""
            width={40}
            height={40}
            className={isCandidate ? styles.portrait : styles.logo}
          />
        )}
        <div className={styles.identity}>
          <p className={styles.name}>{identity}</p>
          {details && (
            <p className={styles.details}>
              {experience.isDemo && "Sample: "}{details}
            </p>
          )}
          {!experience.isDemo && isCandidate && experience.rating !== undefined && (
            <p className={styles.rating}>
              <Star size={14} aria-hidden="true" />
              <span>{experience.rating} out of 5</span>
            </p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const hasDemoExperiences = recruitmentExperiences.some((experience) => experience.isDemo);
  const hasRealExperiences = recruitmentExperiences.some((experience) => !experience.isDemo);

  return (
    <section className={styles.section} aria-labelledby="recruitment-experiences-heading">
      <div className="container-padded">
        <header className={styles.header}>
          <p className={styles.eyebrow}>Recruitment Experiences</p>
          <h2 id="recruitment-experiences-heading" className={styles.heading}>
            Experiences from the Recruitment Journey
          </h2>
          <p className={styles.description}>
            {hasRealExperiences
              ? "Perspectives from candidates and employers on their recruitment journey."
              : "Candidate and employer reviews will be featured here as verified feedback becomes available."}
          </p>
        </header>

        {hasDemoExperiences && (
          <p className={styles.demoNotice}>
            <Info size={18} aria-hidden="true" />
            <span>
              Illustrative examples shown during website development. Entries labelled as samples are not verified reviews.
            </span>
          </p>
        )}

        <div className={styles.groups}>
          {experienceGroups.map(({ type, title, icon: Icon }) => (
            <section key={type} className={styles.group} aria-labelledby={`${type}-experiences-heading`}>
              <div className={styles.groupHeader}>
                <span className={styles.groupIcon}>
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 id={`${type}-experiences-heading`} className={styles.groupHeading}>
                  {title}
                </h3>
              </div>
              <ul className={styles.cards} role="list">
                {recruitmentExperiences.filter((experience) => experience.type === type).map((experience) => (
                  <li key={experience.id}>
                    <ExperienceCard experience={experience} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
