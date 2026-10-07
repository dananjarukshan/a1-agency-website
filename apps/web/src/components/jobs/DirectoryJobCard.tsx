import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, CalendarDays, MapPin, Users, UserRound } from "lucide-react";
import type { Job } from "@/types";
import { formatJobAge, jobClosingState } from "@/lib/job-presentation";
import styles from "./Jobs.module.css";

/** Directory-only composition: other pages keep their approved card layouts. */
export default function DirectoryJobCard({ job, now }: { job: Job; now: Date }) {
  const { closed, closingSoon } = jobClosingState(job.closingDate, now);
  const date = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(job.closingDate));
  return (
    <article className={styles.card} aria-labelledby={`directory-job-${job.id}`}>
      <div className={styles.cardVisual}>
        {job.image ? <Image src={job.image} alt={`Illustrative ${job.title.toLowerCase()} image for a sample vacancy; not the actual employer or worksite.`} fill sizes="(min-width: 1280px) 424px, (min-width: 1024px) 35vw, (min-width: 640px) 50vw, 100vw" /> : <div className={styles.fallback}><BriefcaseBusiness size={40} strokeWidth={1.2} aria-hidden="true" /><span>{job.categoryName}</span><small>Illustrative career field</small></div>}
        <div className={styles.badges}><span>Sample vacancy</span>{job.featured && <span className={styles.featured}>Featured</span>}</div>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.cardCategory}>{job.categoryName}</p>
        <h3 id={`directory-job-${job.id}`}><Link href={`/jobs/${job.slug}`}>{job.title}</Link></h3>
        <p className={styles.location}><MapPin size={15} aria-hidden="true" />{job.city ? `${job.city}, ` : ""}{job.countryName}</p>
        <dl className={styles.salary}><dt>Monthly salary · sample LKR terms</dt><dd>{job.salaryDisplay}</dd></dl>
        <div className={styles.cardDetails}><p><Users size={16} aria-hidden="true" />{job.vacancies} vacancies</p><p><UserRound size={16} aria-hidden="true" />{formatJobAge(job)}</p><p className={styles.closing}><CalendarDays size={16} aria-hidden="true" /><span>{closed ? "Closed" : "Closes"} <time dateTime={job.closingDate}>{date}</time>{closingSoon && " · Closing soon"}</span></p></div>
        <Link href={`/jobs/${job.slug}`} className={styles.cardLink} aria-label={`View Job: ${job.title} in ${job.countryName}`}>View Job <ArrowUpRight size={19} aria-hidden="true" /></Link>
      </div>
    </article>
  );
}
