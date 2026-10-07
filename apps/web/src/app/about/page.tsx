import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ArrowLeftRight, Building2, FileText, HeartHandshake, MapPin, MessagesSquare, Users } from "lucide-react";
import { Breadcrumbs } from "@a1/ui";
import EventsGallery from "@/components/about/EventsGallery";
import { siteConfig } from "@/config/site";
import { missionVisionContent } from "@/config/mission-vision";
import { recruitmentFields } from "@/data";
import { recruitmentEvents } from "@/data/events";
import styles from "./About.module.css";

export const metadata: Metadata = {
  title: { absolute: `About ${siteConfig.name}` },
  description:
    "Learn about A-One Foreign Employment Agency, connecting Sri Lankan candidates with overseas career opportunities and supporting international employers with manpower recruitment.",
  alternates: { canonical: "/about" },
};

// Principles drawn from the existing About and public recruitment-process copy.
const approach = [
  { icon: MessagesSquare, title: "Clear communication", description: "Clear job information and straightforward conversations help candidates and employers understand the next step." },
  { icon: HeartHandshake, title: "Candidate guidance", description: "Support with application steps, documentation and pre-departure preparation keeps people at the centre of the process." },
  { icon: Building2, title: "Employer understanding", description: "Recruitment starts with understanding the role, the working environment and the employer’s manpower requirements." },
  { icon: FileText, title: "Coordinated recruitment", description: "From screening and interviews to documentation, each stage forms part of a considered recruitment journey." },
] as const;

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="about-heading">
        <Image src="/images/employer-global-recruitment.jpg" alt="" fill sizes="100vw" loading="eager" fetchPriority="high" className={styles.heroImage} />
        <div className={`container-padded ${styles.heroInner}`}>
          <Breadcrumbs items={[{ label: "About Us" }]} className={styles.breadcrumbs} />
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>About A-One</p>
            <h1 id="about-heading">Connecting Sri Lankan talent with <span>global opportunities.</span></h1>
            <p className={styles.heroDescription}>
              {siteConfig.name} connects Sri Lankan job seekers with overseas career opportunities while supporting international employers seeking Sri Lankan manpower.
            </p>
          </div>
          <p className={styles.heroFootnote}><span aria-hidden="true" /> People. Possibilities. Connections.</p>
        </div>
      </section>

      <section className={styles.introduction} aria-labelledby="who-heading">
        <div className={`container-padded ${styles.introGrid}`}>
          <figure className={styles.introVisual}>
            <div className={styles.introImage}>
              <Image src="/images/recruitment-consultation.png" alt="Illustrative recruitment consultation between a candidate and an adviser; not an A-One office photograph." fill sizes="(min-width: 600px) 900px, 640px" />
            </div>
            <figcaption>Recruitment begins with a conversation.<span>Illustrative development image</span></figcaption>
            <div className={styles.location}><MapPin size={17} aria-hidden="true" /> Based in {siteConfig.address.city}, {siteConfig.address.country}</div>
          </figure>
          <div className={styles.introCopy}>
            <p className={styles.eyebrow}>Who we are</p>
            <h2 id="who-heading" className={styles.heading}>A recruitment bridge, <br />built around people.</h2>
            <p className={styles.lead}>Local understanding. International opportunity.</p>
            <p>{siteConfig.name} is a Sri Lanka-focused recruitment agency connecting the aspirations of candidates with the workforce needs of international employers.</p>
            <p>Our approach brings together clear communication, candidate guidance and recruitment coordination, with attention to the people on both sides of every opportunity.</p>
            <ul className={styles.identity}>
              <li><Users size={19} aria-hidden="true" /> Candidate and employer services</li>
              <li><ArrowLeftRight size={19} aria-hidden="true" /> Overseas careers and international manpower enquiries</li>
            </ul>
            <Link href="/how-it-works" className={styles.textLink}>Understand our recruitment process <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className={styles.purpose} aria-labelledby="purpose-heading">
        <div className="container-padded">
          <div className={styles.purposeHeader}>
            <p className={styles.eyebrow}>Our purpose</p>
            <h2 id="purpose-heading" className={styles.heading}>One shared direction. <br />Meaningful connections.</h2>
          </div>
          <div className={styles.purposeGrid}>
            {missionVisionContent.map((item) => (
              <article key={item.id} className={styles.purposePanel}>
                <span className={styles.purposeNumber} aria-hidden="true">{item.number}</span>
                <div><h3>{item.heading}</h3><p>{item.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.approach} aria-labelledby="approach-heading">
        <div className="container-padded">
          <div className={styles.sectionHeader}>
            <div><p className={styles.eyebrow}>Our recruitment approach</p><h2 id="approach-heading" className={styles.heading}>People first. <br />Clarity at every step.</h2></div>
            <p className={styles.sectionDescription}>The principles that shape how we support candidates, understand employers and coordinate the recruitment journey.</p>
          </div>
          <ul className={styles.valuesGrid}>
            {approach.map(({ icon: Icon, title, description }, index) => (
              <li key={title} className={styles.valueCard}>
                <div className={styles.valueTop}><Icon size={27} aria-hidden="true" /><span aria-hidden="true">0{index + 1}</span></div>
                <h3>{title}</h3><p>{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.audiences} aria-labelledby="audiences-heading">
        <div className="container-padded">
          <div className={styles.sectionHeader}>
            <div><p className={styles.eyebrow}>Who we serve</p><h2 id="audiences-heading" className={styles.heading}>Two ambitions. <br />A shared opportunity.</h2></div>
            <p className={styles.sectionDescription}>Connecting people ready for their next chapter with employers building their workforce.</p>
          </div>
          <div className={styles.audienceGrid}>
            <article className={styles.audienceCard}>
              <Users size={29} aria-hidden="true" /><h3>Sri Lankan candidates</h3>
              <p>Explore overseas roles that relate to your skills and experience, and understand the application journey.</p>
              <Link href="/jobs" className={styles.textLink}>Explore job opportunities <ArrowUpRight size={18} aria-hidden="true" /></Link>
            </article>
            <div className={styles.connection}>
              <ArrowLeftRight size={25} aria-hidden="true" /><strong>A-One</strong><span>Your recruitment connection</span>
            </div>
            <article className={`${styles.audienceCard} ${styles.employerCard}`}>
              <Building2 size={29} aria-hidden="true" /><h3>International employers</h3>
              <p>Share your manpower needs and explore recruitment support for connecting with Sri Lankan talent.</p>
              <Link href="/employers" className={styles.textLink}>Discover employer services <ArrowUpRight size={18} aria-hidden="true" /></Link>
            </article>
          </div>
          <div className={styles.fields}>
            <p>Recruitment across a range of fields</p>
            <ul>{recruitmentFields.slice(0, 5).map((field) => <li key={field.id}>{field.name}</li>)}</ul>
            <Link href="/job-categories" className={styles.textLink}>Explore all recruitment fields <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <EventsGallery events={recruitmentEvents} />

      <section className={styles.finalCta} aria-labelledby="next-heading">
        <div className="container-padded">
          <p className={styles.eyebrow}>Let’s take the next step</p>
          <h2 id="next-heading" className={styles.heading}>Your next connection <br />starts here.</h2>
          <div className={styles.ctaGrid}>
            <Link href="/employers/request-manpower" className={styles.employerAction}>
              <span><span className={styles.actionEyebrow}>For employers</span><span className={styles.actionTitle}>Recruit Sri Lankan Talent</span><span className={styles.actionCopy}>Tell us about your manpower requirements.</span></span>
              <ArrowUpRight size={27} aria-hidden="true" />
            </Link>
            <Link href="/jobs" className={styles.candidateAction}>
              <span><span className={styles.actionEyebrow}>For candidates</span><span className={styles.actionTitle}>Explore Overseas Opportunities</span><span className={styles.actionCopy}>Find the next step in your career journey.</span></span>
              <ArrowUpRight size={27} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
