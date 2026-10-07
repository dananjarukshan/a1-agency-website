import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ClipboardList, Clock3, Mail, Phone } from "lucide-react";
import { Breadcrumbs } from "@a1/ui";
import EmployerRequestForm from "@/components/forms/EmployerRequestForm";
import { siteConfig } from "@/config/site";
import styles from "./RequestManpower.module.css";

export const metadata: Metadata = {
  title: { absolute: `Request Manpower | ${siteConfig.name}` },
  description: "Share your workforce requirements with A-One Foreign Employment Agency for Sri Lankan manpower recruitment support. Preview the employer enquiry form.",
  alternates: { canonical: "/employers/request-manpower" },
};

// Concise enquiry follow-up, aligned with the employer page's recruitment stages.
const nextSteps = [
  { title: "Requirement review", description: "The team reviews your company details, roles and proposed employment terms." },
  { title: "Follow-up discussion", description: "Clarify workforce needs and discuss the recruitment steps for your destination." },
  { title: "Sourcing & selection", description: "Coordinate sourcing, screening and interviews for your team to select candidates." },
  { title: "Preparation & coordination", description: "Selected candidates proceed with the confirmed documentation and pre-departure steps." },
];

export default function RequestManpowerPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="request-heading">
        <div className="container-padded">
          <Breadcrumbs items={[{ label: "For Employers", href: "/employers" }, { label: "Request Manpower" }]} className={styles.breadcrumbs} />
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Manpower request</p>
            <h1 id="request-heading">Tell us the workforce <span>your company needs.</span></h1>
            <p>Share your manpower requirements with A-One so our team can review your recruitment needs and coordinate the next steps.</p>
          </div>
        </div>
      </section>

      <section className={styles.requestSection} aria-labelledby="form-heading">
        <div className="container-padded">
          <div className={styles.intro}><div><p className={styles.eyebrow}>Start with your requirements</p><h2 id="form-heading">Your manpower enquiry.</h2></div><p>One form for your company, workforce and employment terms. Share the details you know and use the notes for anything else.</p></div>
          <div className={styles.requestGrid}>
            <EmployerRequestForm />
            <aside className={styles.rail} aria-labelledby="guidance-heading">
              <div className={styles.guide}>
                <ClipboardList size={28} aria-hidden="true" />
                <p className={styles.railEyebrow}>Before you begin</p>
                <h3 id="guidance-heading">A clear brief starts <br />a useful conversation.</h3>
                <p>Have these details to hand as you complete your request.</p>
                <ul><li>Your company and contact person</li><li>Roles, worker numbers and experience</li><li>Salary, benefits and working conditions</li><li>Preferred timing and additional needs</li></ul>
                <div className={styles.railNote}>For live enquiries, A-One reviews the requirement and contacts the employer to discuss the next recruitment steps.</div>
              </div>
              <div className={styles.railHelp}><h3>Need help completing your request?</h3><p>Talk through your workforce requirements with our team.</p><Link href="/contact">Contact A-One <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.next} aria-labelledby="next-heading">
        <div className="container-padded">
          <div className={styles.nextHeader}><div><p className={styles.eyebrow}>From enquiry to recruitment</p><h2 id="next-heading">What happens next?</h2></div><p>The journey for a live enquiry. This development form only validates your entries and does not start this process.</p></div>
          <ol className={styles.nextSteps} role="list">{nextSteps.map((step, index) => <li key={step.title}><span aria-hidden="true">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
          <Link href="/employers" className={styles.processLink}>Explore our employer services <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className={styles.assistance} aria-labelledby="assistance-heading">
        <div className={`container-padded ${styles.assistanceGrid}`}>
          <div><p className={styles.eyebrow}>A conversation with A-One</p><h2 id="assistance-heading">Let’s talk about <br />your recruitment needs.</h2><p>Need help completing your request? Contact our team using the agency details below.</p><Link href="/contact" className={styles.contactLink}>Contact A-One <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
          <div className={styles.contactDetails}>
            <div><Phone size={20} aria-hidden="true" /><div><h3>Call our team</h3><a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a></div></div>
            <div><Mail size={20} aria-hidden="true" /><div><h3>Email your enquiry</h3><a href={`mailto:${siteConfig.emailEmployers}`}>{siteConfig.emailEmployers}</a></div></div>
            <div><Clock3 size={20} aria-hidden="true" /><div><h3>Office hours <span>(Sri Lanka time)</span></h3><dl>{siteConfig.officeHours.map((item) => <div key={item.days}><dt>{item.days}</dt><dd>{item.hours}</dd></div>)}</dl></div></div>
          </div>
        </div>
      </section>
    </div>
  );
}
