import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Users } from "lucide-react";
import { siteConfig } from "@/config/site";
import { jobs } from "@/data";
import { daysUntilClosing, formatDate } from "@/lib/utils";
import styles from "./FeaturedJobs.module.css";

// Homepage-only illustrative assets; the job catalogue remains unchanged.
const jobImages: Partial<Record<string, { src: string; alt: string }>> = {
  "heavy-vehicle-driver-saudi-arabia": {
    src: "/images/jobs/hot-jobs/heavy-vehicle-driver.webp",
    alt: "Illustrative heavy vehicle driver image for sample vacancy",
  },
  "hotel-housekeeper-uae": {
    src: "/images/jobs/hot-jobs/hotel-housekeeper.webp",
    alt: "Illustrative hotel housekeeping image for sample vacancy",
  },
  "electrical-technician-qatar": {
    src: "/images/jobs/hot-jobs/electrical-technician.webp",
    alt: "Illustrative electrical technician image for sample vacancy",
  },
};

export default function FeaturedJobs() {
  // Sort a filtered copy; equal priorities retain the existing dataset order.
  const priority = (job: (typeof jobs)[number]) =>
    job.featured ? 0 : job.isNew ? 1 : 2;
  const featured = jobs
    .filter((job) => job.status === "active")
    .sort((a, b) => priority(a) - priority(b))
    .slice(0, 3);
  const isDemo = siteConfig.contentMode === "demo";

  return (
    <section className={styles.section} aria-labelledby="featured-jobs-heading">
      <div className="container-padded">
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Current Opportunities</p>
            <h2 id="featured-jobs-heading" className={styles.heading}>Hot Jobs</h2>
            <p className={styles.description}>
              {isDemo
                ? "Explore selected sample overseas vacancies highlighted by A-One."
                : "Explore selected overseas vacancies currently highlighted by A-One."}
            </p>
            {isDemo && (
              <p className={styles.demoNotice}>
                Demonstration content only. These are fictional vacancies, not live job offers.
              </p>
            )}
          </div>
          <Link href="/jobs" className={styles.directoryLink}>
            See More Jobs
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.grid}>
          {featured.map((job) => {
            const isClosed = daysUntilClosing(job.closingDate) < 0;
            const image = jobImages[job.slug];

            return (
              <article
                key={job.id}
                className={styles.card}
                aria-labelledby={`home-job-${job.id}`}
              >
                {image && (
                  <div className={styles.imageFrame}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1280px) 385px, (min-width: 1200px) calc((100vw - 110px) / 3), (min-width: 768px) calc((100vw - 88px) / 2), (min-width: 640px) calc(100vw - 66px), calc(100vw - 50px)"
                      loading="lazy"
                      className={styles.image}
                    />
                  </div>
                )}
                <div className={styles.cardHeader}>
                  <div className={styles.badges}>
                    {job.featured ? (
                      <span className={styles.badge}>Featured</span>
                    ) : job.isNew ? (
                      <span className={styles.badge}>New</span>
                    ) : null}
                    {isDemo && <span className={styles.sampleBadge}>Sample vacancy</span>}
                  </div>
                  <h3 id={`home-job-${job.id}`} className={styles.title}>{job.title}</h3>
                  <p className={styles.location}>
                    <span className={styles.flag} aria-hidden="true">{job.countryFlag}</span>
                    <span>{job.city ? `${job.city}, ` : ""}{job.countryName}</span>
                  </p>
                </div>

                <dl className={styles.salary}>
                  <dt>Monthly salary</dt>
                  <dd>{job.salaryDisplay}</dd>
                </dl>
                <div className={styles.details}>
                  <p>
                    <Users size={16} aria-hidden="true" />
                    <span>{job.vacancies} {job.vacancies === 1 ? "vacancy" : "vacancies"}</span>
                  </p>
                  <p>
                    <Calendar size={16} aria-hidden="true" />
                    <span>
                      {isClosed ? "Closed" : "Closes"}{" "}
                      <time dateTime={job.closingDate}>{formatDate(job.closingDate)}</time>
                    </span>
                  </p>
                </div>

                <Link
                  href={`/jobs/${job.slug}`}
                  className={styles.jobLink}
                  aria-label={`View Job: ${job.title} in ${job.countryName}`}
                >
                  View Job
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
