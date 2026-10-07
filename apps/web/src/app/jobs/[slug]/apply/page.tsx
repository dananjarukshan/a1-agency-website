import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Info, Mail, MapPin, Phone, UserRound } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ApplicationForm from "@/components/forms/ApplicationForm";
import { jobs } from "@/data";
import { siteConfig } from "@/config/site";
import { formatJobAge, formatJobSalary, jobClosingState } from "@/lib/job-presentation";
import { formatDate } from "@/lib/utils";
import styles from "@/components/jobs/JobDetail.module.css";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = jobs.find((item) => item.slug === slug);
  if (!job) return {};
  return {
    title: { absolute: `Apply for ${job.title} – ${job.countryName} | ${siteConfig.name}` },
    description: `Preview the application for the sample ${job.title} vacancy in ${job.countryName}. ${formatJobSalary(job)}. Ref: ${job.reference}. This demo does not send or store applications.`,
    alternates: { canonical: `/jobs/${job.slug}/apply` },
  };
}

export default async function JobApplyPage({ params }: Props) {
  const { slug } = await params;
  const job = jobs.find((item) => item.slug === slug);
  if (!job) notFound();
  await connection();
  const { closed } = jobClosingState(job.closingDate);
  const canApply = !closed && job.status === "active";

  return (
    <div className={styles.page}>
      <header className={styles.hero}><div className="container-padded">
        <Breadcrumbs items={[{ label: "Jobs", href: "/jobs" }, { label: job.title, href: `/jobs/${job.slug}` }, { label: "Application" }]} className={styles.breadcrumbs} />
        <div className={styles.heroCopy}><p className={styles.eyebrow}>Your next step</p><h1>{canApply ? "Apply for this opportunity" : "Applications unavailable"}</h1><p className={styles.intro}>{canApply ? "Complete the form to preview an application for this position. This development version validates your entries in your browser only." : "This sample vacancy is no longer accepting applications. You can review the role or explore other opportunities."}</p></div>
      </div></header>
      <div className={`container-padded ${styles.content}`}>
        <Link href={`/jobs/${job.slug}`} className={styles.backLink}><ArrowLeft size={17} aria-hidden="true" />Back to job details</Link>
        <section className={styles.selectedJob} aria-labelledby="selected-job-heading"><div><p className={styles.eyebrow}>Applying for · Sample vacancy</p><h2 id="selected-job-heading">{job.title}</h2><p className={styles.location}><MapPin size={17} aria-hidden="true" />{job.city ? `${job.city}, ` : ""}{job.countryName}</p></div><div className={styles.selectedFacts}><p>{formatJobSalary(job)}</p><p><UserRound size={16} aria-hidden="true" />{formatJobAge(job)}</p><small>Ref: {job.reference} · {closed ? "Closed" : "Deadline"} {formatDate(job.closingDate)}</small></div></section>
        {canApply ? <div className={styles.formLayout}><ApplicationForm key={job.id} job={job} /><aside className={styles.formAside} aria-label="Application guidance"><div className={styles.guideCard}><p className={styles.eyebrow}>Before you begin</p><h2>A little preparation helps.</h2><ul className={styles.guideList}><li>Review the role requirements and age criteria.</li><li>Have your contact and employment details ready.</li><li>A CV is optional. Use PDF or Word, up to 5 MB.</li></ul><div className={styles.demoNotice}><Info size={18} aria-hidden="true" /><p>Use test details in this preview. No application or CV is sent to the agency or employer.</p></div><h3>Need guidance?</h3><p className={styles.prose}>Contact A-One to discuss current opportunities.</p><a href={siteConfig.phoneHref} className={styles.contactLink}><Phone size={16} aria-hidden="true" />{siteConfig.phoneDisplay}</a><a href={`mailto:${siteConfig.email}`} className={styles.contactLink}><Mail size={16} aria-hidden="true" />{siteConfig.email}</a></div></aside></div> : <section className={styles.card} aria-labelledby="unavailable-heading"><p className={styles.eyebrow}>Vacancy status</p><h2 id="unavailable-heading">{closed || job.status === "closed" ? "This sample vacancy has closed." : "Applications are currently unavailable."}</h2><p className={styles.prose}>An application cannot be started for this position. Explore other sample vacancies or contact A-One for current recruitment information.</p><div className={styles.unavailableActions}><Link href="/jobs" className={styles.primary}>Browse More Jobs <ArrowUpRight size={17} aria-hidden="true" /></Link><Link href="/contact" className={styles.textLink}>Contact A-One</Link></div></section>}
      </div>
    </div>
  );
}
