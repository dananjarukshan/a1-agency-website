import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, ClipboardList, Info, Mail, Phone, ShieldCheck } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { siteConfig } from "@/config/site";
import { candidatePreparation, candidateVerification, recruitmentJourneyOverview, recruitmentProcess } from "@/data/recruitment-process";
import styles from "./RecruitmentJourney.module.css";

const title = `Recruitment Journey & Overseas Recruitment Process | ${siteConfig.name}`;
const description = "A general guide to the foreign employment journey for Sri Lankan candidates: explore roles, review requirements and understand selection and preparation. Steps vary by vacancy and destination.";

export const metadata: Metadata = {
  title: { absolute: title }, description,
  authors: [{ name: siteConfig.name }], creator: siteConfig.name,
  alternates: { canonical: "/how-it-works" },
  openGraph: { title, description, url: `${siteConfig.url}/how-it-works`, type: "website", siteName: siteConfig.name },
  twitter: { card: "summary_large_image", title, description },
};

function CandidateActions() {
  return <div className={styles.actions}>
    <Link href="/jobs" className={styles.primary}>Explore Jobs <ArrowUpRight size={18} aria-hidden="true" /></Link>
    <Link href="/contact" className={styles.secondary}>Contact A-One <ArrowUpRight size={18} aria-hidden="true" /></Link>
  </div>;
}

export default function HowItWorksPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className="container-padded">
          <Breadcrumbs items={[{ label: "Recruitment Journey" }]} className={styles.breadcrumbs} />
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Recruitment Journey</p>
            <h1>Your path to <span>overseas employment.</span></h1>
            <p>Understand what comes next. Explore the stages from choosing a role to preparing for departure, with clear points to review and questions to ask along the way.</p>
            <CandidateActions />
          </div>
          <nav className={styles.pageNav} aria-label="On this page">
            <a href="#journey">The journey <ArrowUpRight size={16} aria-hidden="true" /></a>
            <a href="#prepare">What to prepare <ArrowUpRight size={16} aria-hidden="true" /></a>
            <a href="#verify">Before you proceed <ArrowUpRight size={16} aria-hidden="true" /></a>
          </nav>
        </div>
      </header>

      <div className={`container-padded ${styles.content}`}>
        <section className={styles.overview} aria-labelledby="overview-heading">
          <div><p className={styles.eyebrow}>Clarity at every stage</p><h2 id="overview-heading">Know the process.<br />Prepare with care.</h2></div>
          <div><p>{recruitmentJourneyOverview}</p><div className={styles.notice}><Info size={19} aria-hidden="true" /><p><strong>About this development website.</strong> Current jobs are fictional sample listings; LKR salaries and age criteria are illustrative. The application form is a demonstration and does not send or store applications or CVs. Contact A-One for current recruitment information.</p></div></div>
        </section>

        <section id="journey" className={styles.journey} aria-labelledby="journey-heading">
          <div className={styles.journeyIntro}>
            <p className={styles.eyebrow}>Step by step</p><h2 id="journey-heading">From discovery<br />to departure.</h2>
            <p>Use these {recruitmentProcess.length} stages as a guide, then confirm the next step for your specific vacancy with A-One.</p>
            <div className={styles.discoveryLinks}>
              <Link href="/countries">Explore Countries <ArrowUpRight size={17} aria-hidden="true" /></Link>
              <Link href="/job-categories">Explore Recruitment Fields <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </div>
          </div>
          <ol className={styles.timeline} role="list" aria-label="Candidate recruitment stages">
            {recruitmentProcess.map((stage, index) => (
              <li key={stage.id} className={styles.stage}>
                <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div className={styles.stageCard}>
                  <span className={styles.stageIcon}><stage.icon size={24} strokeWidth={1.5} aria-hidden="true" /></span>
                  <div><h3>{stage.title}</h3><p>{stage.description}</p></div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="prepare" className={styles.preparation} aria-labelledby="prepare-heading">
          <div><ClipboardList size={32} strokeWidth={1.4} aria-hidden="true" /><p className={styles.eyebrow}>A useful starting point</p><h2 id="prepare-heading">What should I prepare?</h2><p>This is a general checklist, not a mandatory document list. Confirm exactly what is needed for your vacancy and destination before arranging documents or checks.</p></div>
          <ul className={styles.checklist}>{candidatePreparation.map((item) => <li key={item}><Check size={18} aria-hidden="true" /><span>{item}</span></li>)}</ul>
        </section>

        <section id="verify" className={styles.verification} aria-labelledby="verify-heading">
          <div><ShieldCheck size={32} strokeWidth={1.4} aria-hidden="true" /><p className={styles.eyebrow}>Make an informed decision</p><h2 id="verify-heading">Verify before you proceed.</h2><p>Take time to understand the role and the arrangements. If anything is unclear, ask before taking the next step.</p>
            <ul className={styles.checklist}>{candidateVerification.map((item) => <li key={item}><Check size={18} aria-hidden="true" /><span>{item}</span></li>)}</ul>
          </div>
          <aside className={styles.contactCard} aria-labelledby="guidance-heading"><p className={styles.eyebrow}>Talk to A-One</p><h3 id="guidance-heading">Unsure about a step?</h3><p>Use the agency’s published contact details to discuss a vacancy, clarify requirements or confirm how to proceed.</p>
            <a href={siteConfig.phoneHref}><Phone size={18} aria-hidden="true" /><span>{siteConfig.phoneDisplay}</span></a>
            <a href={`mailto:${siteConfig.email}`}><Mail size={18} aria-hidden="true" /><span>{siteConfig.email}</span></a>
            <Link href="/contact" className={styles.textLink}>Contact A-One <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </aside>
        </section>

        <section className={styles.employer} aria-labelledby="employer-heading">
          <div><p className={styles.eyebrow}>For international employers</p><h2 id="employer-heading">Looking to recruit Sri Lankan talent?</h2><p>Explore A-One’s employer pathway and discuss your workforce requirements.</p></div>
          <div className={styles.employerLinks}><Link href="/employers" className={styles.textLink}>For Employers <ArrowUpRight size={17} aria-hidden="true" /></Link><Link href="/employers/request-manpower" className={styles.textLink}>Request Manpower <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        </section>

        <section className={styles.finalCta} aria-labelledby="next-step-heading"><p className={styles.eyebrow}>Your next step</p><h2 id="next-step-heading">Explore a role.<br /><span>Ask the right questions.</span></h2><p>Browse the sample opportunities or contact A-One to discuss current recruitment information.</p><CandidateActions /></section>
      </div>
    </div>
  );
}
