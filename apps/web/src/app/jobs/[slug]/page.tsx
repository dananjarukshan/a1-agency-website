import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, CalendarDays, Check, Info, MapPin, MessageCircle, UserRound } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import DirectoryJobCard from "@/components/jobs/DirectoryJobCard";
import ShareJobButton from "@/components/jobs/ShareJobButton";
import { jobs } from "@/data";
import { formatDate, whatsappUrl, jobWhatsappMessage } from "@/lib/utils";
import { formatJobAge, formatJobSalary, jobClosingState } from "@/lib/job-presentation";
import { siteConfig } from "@/config/site";
import styles from "@/components/jobs/JobDetail.module.css";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = jobs.find((item) => item.slug === slug);
  if (!job) return {};
  const description = `Sample ${job.title} vacancy in ${job.countryName}. ${formatJobSalary(job)}. ${formatJobAge(job)}. Review demonstration role details and requirements. Ref: ${job.reference}.`;
  return {
    title: { absolute: `${job.title} – ${job.countryName} | ${siteConfig.name}` },
    description,
    openGraph: { title: `${job.title} – ${job.countryName}`, description, url: `${siteConfig.url}/jobs/${job.slug}` },
    alternates: { canonical: `/jobs/${job.slug}` },
  };
}

function DetailList({ items }: { items: string[] }) {
  return <ul className={styles.list}>{items.map((item, index) => <li key={index}><Check size={17} aria-hidden="true" /><span>{item}</span></li>)}</ul>;
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = jobs.find((item) => item.slug === slug);
  if (!job) notFound();

  // Evaluate deadlines per request, rather than freezing them at build time.
  await connection();
  const now = new Date();
  const { closed, closingSoon } = jobClosingState(job.closingDate, now);
  const canApply = !closed && job.status === "active";
  const status = closed || job.status === "closed" ? "Closed" : job.status !== "active" ? "Applications unavailable" : closingSoon ? "Closing soon" : "Open";
  const location = `${job.city ? `${job.city}, ` : ""}${job.countryName}`;
  const salary = formatJobSalary(job);
  const enquiryHref = whatsappUrl(siteConfig.whatsapp, jobWhatsappMessage(job.title, job.reference));
  const usesWhatsApp = enquiryHref.startsWith("https://wa.me/");
  const relatedJobs = jobs
    .filter((item) => item.id !== job.id && item.status === "active" && !jobClosingState(item.closingDate, now).closed)
    .sort((a, b) => {
      const rank = (item: typeof job) => item.categorySlug === job.categorySlug ? 0 : item.country === job.country ? 1 : 2;
      return rank(a) - rank(b);
    }).slice(0, 3);
  const overview = [
    ["Location", location], ["Monthly salary · sample terms", salary],
    ["Age requirement", job.ageMin !== undefined || job.ageMax !== undefined ? formatJobAge(job) : undefined],
    ["Career field", job.categoryName], ["Vacancies", `${job.vacancies} positions`],
    ["Application deadline", formatDate(job.closingDate)], ["Experience", job.experienceDisplay],
    ["Contract", job.contractPeriod], ["Working hours", job.workingHours],
  ].filter(([, value]) => value);
  const packageDetails = [["Accommodation", job.accommodation], ["Food", job.food], ["Transportation", job.transportation], ["Medical", job.medical], ["Insurance", job.insurance]].filter(([, value]) => value);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className="container-padded">
          <Breadcrumbs items={[{ label: "Jobs", href: "/jobs" }, { label: job.categoryName, href: `/job-categories/${job.categorySlug}` }, { label: job.title }]} className={styles.breadcrumbs} />
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Explore the role</p>
            <div className={styles.badges}><span>Sample vacancy</span>{job.featured && <span>Featured</span>}<span className={styles.status}>{status}</span></div>
            <h1>{job.title}</h1>
            <p className={styles.location}><MapPin size={18} aria-hidden="true" />{location}<span className={styles.category}>{job.categoryName}</span></p>
            <div className={styles.heroFacts}><p>{salary}</p><p><UserRound size={18} aria-hidden="true" />{formatJobAge(job)}</p></div>
            <div className={styles.heroActions}>
              {canApply ? <Link href={`/jobs/${job.slug}/apply`} className={styles.primary}>Apply for this Position <ArrowUpRight size={18} aria-hidden="true" /></Link> : <Link href="/jobs" className={styles.primary}>Browse other jobs <ArrowUpRight size={18} aria-hidden="true" /></Link>}
              <p><CalendarDays size={16} aria-hidden="true" />{closed ? "Closed" : "Deadline"} <time dateTime={job.closingDate}>{formatDate(job.closingDate)}</time></p>
            </div>
          </div>
        </div>
      </header>

      <div className={`container-padded ${styles.content}`}>
        <div className={styles.demoNotice}><Info size={19} aria-hidden="true" /><p><strong>Demonstration vacancy.</strong> These role details, salary and age criteria are sample content for website development, not a verified live recruitment campaign.</p></div>
        <div className={styles.layout}>
          <div className={styles.mainColumn}>
            <figure className={styles.visual}>
              <div className={styles.imageFrame}>
                {job.image ? <Image src={job.image} alt={`Illustrative ${job.title.toLowerCase()} image; not the actual employer, employee or worksite.`} fill sizes="(min-width: 1280px) 760px, (min-width: 1024px) 65vw, 100vw" /> : <div className={styles.fallback}><BriefcaseBusiness size={52} strokeWidth={1.2} aria-hidden="true" /><span>{job.categoryName}</span><small>Illustrative career field</small></div>}
              </div>
              <figcaption>Career illustration · not the actual employer or vacancy location</figcaption>
            </figure>
            <section className={styles.card} aria-labelledby="overview-heading">
              <p className={styles.eyebrow}>At a glance</p><h2 id="overview-heading">Job overview</h2>
              <dl className={styles.overview}>{overview.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            </section>
            {job.description && <section className={styles.card} aria-labelledby="about-heading"><p className={styles.eyebrow}>The opportunity</p><h2 id="about-heading">About the position</h2><div className={styles.prose}>{job.description.split(/\n\s*\n/).map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>{job.employer && <p className={styles.employer}>Sample employer: {job.employer}</p>}</section>}
            {job.responsibilities.length > 0 && <section className={styles.card} aria-labelledby="responsibilities-heading"><h2 id="responsibilities-heading">Key responsibilities</h2><DetailList items={job.responsibilities} /></section>}
            {(job.requirements.length > 0 || job.qualifications.length > 0) && <section className={styles.card} aria-labelledby="requirements-heading"><p className={styles.eyebrow}>What the role requires</p><h2 id="requirements-heading">Candidate requirements</h2>{job.requirements.length > 0 && <DetailList items={job.requirements} />}{job.qualifications.length > 0 && <><h3>Qualifications</h3><DetailList items={job.qualifications} /></>}</section>}
            {(job.benefits.length > 0 || packageDetails.length > 0) && <section className={styles.card} aria-labelledby="benefits-heading"><p className={styles.eyebrow}>The sample package</p><h2 id="benefits-heading">Benefits & conditions</h2>{job.benefits.length > 0 && <DetailList items={job.benefits} />}<dl className={styles.package}>{packageDetails.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>}
            {(job.interviewInfo || job.otherConditions) && <section className={styles.card} aria-labelledby="additional-heading"><h2 id="additional-heading">Additional information</h2>{job.interviewInfo && <><h3>Interview information</h3><p className={styles.prose}>{job.interviewInfo}</p></>}{job.otherConditions && <><h3>Other conditions</h3><p className={styles.prose}>{job.otherConditions}</p></>}</section>}
          </div>
          <aside className={styles.applicationAside} aria-label="Application and contact">
            <div className={styles.applicationCard}>
              <p className={styles.eyebrow}>{canApply ? "Ready to apply?" : "Application status"}</p><h2>{job.title}</h2>
              <p className={styles.panelSalary}>{salary}</p><p className={styles.panelAge}>{formatJobAge(job)}</p>
              <dl className={styles.panelDetails}><div><dt>Status</dt><dd>{status}</dd></div><div><dt>Deadline</dt><dd><time dateTime={job.closingDate}>{formatDate(job.closingDate)}</time></dd></div><div><dt>Reference</dt><dd>{job.reference}</dd></div></dl>
              {canApply ? <Link href={`/jobs/${job.slug}/apply`} className={styles.primary}>Apply for this Position <ArrowUpRight size={17} aria-hidden="true" /></Link> : <p className={styles.closedNotice}>{closed || job.status === "closed" ? "This sample vacancy has closed." : "Applications are unavailable for this vacancy."} Browse other opportunities or contact A-One for guidance.</p>}
              <ShareJobButton key={job.id} title={job.title} reference={job.reference} />
              <a className={styles.secondary} href={enquiryHref} target={usesWhatsApp ? "_blank" : undefined} rel={usesWhatsApp ? "noopener noreferrer" : undefined}><MessageCircle size={17} aria-hidden="true" />{usesWhatsApp ? "WhatsApp enquiry" : "Enquire about this job"}</a>
              <p className={styles.panelNote}>Sample vacancy. The application form is a local demonstration and does not send or store your details.</p>
              <p className={styles.published}>Published <time dateTime={job.publishedDate}>{formatDate(job.publishedDate)}</time></p>
            </div>
          </aside>
        </div>
        {relatedJobs.length > 0 && <section className={styles.related} aria-labelledby="related-heading"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Keep exploring</p><h2 id="related-heading">You may also be interested in</h2></div><Link href="/jobs" className={styles.textLink}>View all jobs <ArrowUpRight size={17} aria-hidden="true" /></Link></div><div className={styles.relatedGrid}>{relatedJobs.map((item) => <DirectoryJobCard key={item.id} job={item} now={now} />)}</div></section>}
        <Link href="/jobs" className={styles.textLink}>Back to Jobs <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </div>
  );
}
