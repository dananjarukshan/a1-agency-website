import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, ClipboardList, FileCheck2, Globe2, MessagesSquare, Plane, Quote, Search, Users } from "lucide-react";
import { Breadcrumbs } from "@a1/ui";
import { siteConfig } from "@/config/site";
import { countries, recruitmentExperiences, recruitmentFields } from "@/data";
import styles from "./Employers.module.css";

export const metadata: Metadata = {
  title: { absolute: `Recruit Sri Lankan Talent | ${siteConfig.name}` },
  description: "Recruitment support for international employers seeking Sri Lankan manpower across skilled, technical and service fields, from candidate sourcing to deployment coordination.",
  alternates: { canonical: "/employers" },
};

const capabilities = [
  { icon: Search, title: "Recruitment shaped around your requirements", description: "Candidate sourcing and preliminary screening begin with the role, experience and workforce needs you share." },
  { icon: MessagesSquare, title: "Clear communication at each stage", description: "Coordinate candidate information, interview arrangements and outstanding documents with the recruitment team." },
  { icon: FileCheck2, title: "Support beyond candidate selection", description: "Documentation and pre-departure coordination connect employer selection with the next recruitment steps." },
];

const services = [
  { icon: Users, title: "Sourcing & screening", description: "Identify candidates and review their experience and qualifications against your role requirements." },
  { icon: MessagesSquare, title: "Interviews & selection", description: "Coordinate shortlisted profiles and employer interviews, with final candidate selection made by your team." },
  { icon: Plane, title: "Documentation & departure", description: "Support document preparation and coordinate the confirmed pre-departure steps for selected candidates." },
];

// Employer-focused presentation of the existing employer / How It Works stages.
// Keep selection with the employer and describe official processing as coordination.
const employerSteps = [
  { title: "Share your workforce requirements", description: "Tell us about your company, job roles, required experience and proposed employment terms so the team can review your request." },
  { title: "Candidate sourcing", description: "The recruitment team sources candidates in relation to the requirements discussed with your business." },
  { title: "Screening & shortlisting", description: "Candidate experience, qualifications and relevant documents are reviewed to prepare profiles for employer consideration." },
  { title: "Employer interviews & selection", description: "Your team interviews shortlisted candidates online or in person and makes the final selection for each role." },
  { title: "Documentation coordination", description: "Selected candidates are guided through role-specific documents and checks. The parties coordinate applicable destination and Sri Lankan requirements through official channels." },
  { title: "Pre-departure & deployment support", description: "Candidates complete the confirmed preparation steps before travel, with departure arrangements coordinated with the employer." },
];

function EmployerActions({ final = false }: { final?: boolean }) {
  return (
    <div className={styles.actions}>
      <Link href="/employers/request-manpower" className={styles.primaryAction}>
        Request Manpower <ArrowUpRight size={19} aria-hidden="true" />
      </Link>
      <Link href="/contact" className={styles.secondaryAction}>
        {final ? "Contact A-One" : "Contact Our Team"} <ArrowRight size={17} aria-hidden="true" />
      </Link>
    </div>
  );
}

export default function EmployersPage() {
  const markets = countries.filter((country) => country.active);
  const marketRegions = Array.from(new Set(markets.map((country) => country.region)));
  const employerExperience = recruitmentExperiences.find((experience) => experience.type === "employer");

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="employers-heading">
        <div className="container-padded">
          <Breadcrumbs items={[{ label: "For Employers" }]} className={styles.breadcrumbs} />
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>For overseas employers</p>
              <h1 id="employers-heading">Recruit Sri Lankan talent <span>with A-One.</span></h1>
              <p className={styles.heroDescription}>A-One supports international employers seeking skilled, semi-skilled and technical Sri Lankan workers through a structured recruitment and deployment process.</p>
              <EmployerActions />
              <p className={styles.heroLocation}><Globe2 size={16} aria-hidden="true" /> Based in {siteConfig.address.city}, Sri Lanka. Connecting across borders.</p>
            </div>
            <figure className={styles.heroVisual}>
              <div className={styles.heroImage}>
                <Image src="/images/employer-planning.png" alt="Illustrative employer recruitment-planning meeting; not a photograph of an A-One client engagement." fill sizes="(min-width: 1280px) 600px, (min-width: 900px) 50vw, 100vw" loading="eager" fetchPriority="high" />
              </div>
              <div className={styles.visualNote} aria-hidden="true"><Building2 size={23} /><span>People for your business.<br /><strong>A process built around your needs.</strong></span></div>
              <figcaption>Illustrative development image</figcaption>
            </figure>
          </div>
          <ul className={styles.serviceStrip}>
            <li><Search size={17} aria-hidden="true" /> Candidate sourcing</li>
            <li><Users size={17} aria-hidden="true" /> Screening coordination</li>
            <li><FileCheck2 size={17} aria-hidden="true" /> Documentation support</li>
            <li><Plane size={17} aria-hidden="true" /> Deployment coordination</li>
          </ul>
        </div>
      </section>

      <section className={styles.why} aria-labelledby="why-heading">
        <div className={`container-padded ${styles.whyGrid}`}>
          <div>
            <p className={styles.eyebrow}>Why A-One</p>
            <h2 id="why-heading" className={styles.heading}>Your requirements. <br />Our recruitment focus.</h2>
            <p className={styles.description}>A structured recruitment partner for international employers, bringing together candidate sourcing, employer selection and recruitment coordination.</p>
            <p className={styles.identity}>{siteConfig.name}<span>Candidate connections. Employer understanding.</span></p>
          </div>
          <ul className={styles.capabilities}>
            {capabilities.map(({ icon: Icon, title, description }) => (
              <li key={title}><Icon size={25} aria-hidden="true" /><div><h3>{title}</h3><p>{description}</p></div></li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.talent} aria-labelledby="talent-heading">
        <div className={`container-padded ${styles.talentGrid}`}>
          <div className={styles.talentIntro}>
            <p className={styles.eyebrow}>Sri Lankan talent</p>
            <h2 id="talent-heading" className={styles.heading}>Different roles. <br />One recruitment connection.</h2>
            <p className={styles.description}>Connect with Sri Lankan candidates across a range of recruitment fields, from skilled and technical roles to service and general workforce needs.</p>
          </div>
          <div className={styles.workforce}>
            <p className={styles.workforceLabel}>Start with the work that needs to be done</p>
            <ul>
              <li><span aria-hidden="true">01</span><div><h3>Skilled & technical roles</h3><p>Define the experience and qualifications your roles require.</p></div></li>
              <li><span aria-hidden="true">02</span><div><h3>Service & operational teams</h3><p>Share the responsibilities and working environment.</p></div></li>
              <li><span aria-hidden="true">03</span><div><h3>General workforce needs</h3><p>Outline your staffing requirements and employment terms.</p></div></li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.services} aria-labelledby="services-heading">
        <div className="container-padded">
          <div className={styles.sectionHeader}>
            <div><p className={styles.eyebrow}>Recruitment services</p><h2 id="services-heading" className={styles.heading}>Support across <br />the recruitment journey.</h2></div>
            <p className={styles.sectionDescription}>From the first candidate search to preparation for departure, coordinated around your recruitment requirements.</p>
          </div>
          <div className={styles.servicesGrid}>
            {services.map(({ icon: Icon, title, description }, index) => (
              <article key={title} className={styles.serviceCard}>
                <div><Icon size={28} aria-hidden="true" /><span aria-hidden="true">0{index + 1}</span></div>
                <h3>{title}</h3><p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.fields} aria-labelledby="fields-heading">
        <div className="container-padded">
          <div className={styles.sectionHeader}>
            <div><p className={styles.eyebrow}>Recruitment expertise</p><h2 id="fields-heading" className={styles.heading}>Fields we recruit for.</h2></div>
            <Link href="/job-categories" className={styles.textLink}>Explore recruitment fields <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
          <ul className={styles.fieldIndex}>
            {recruitmentFields.map((field, index) => (
              <li key={field.id}><Link href={`/job-categories/${field.slug}`}><span className={styles.fieldNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{field.name}</span><ArrowUpRight size={17} aria-hidden="true" /></Link></li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.process} aria-labelledby="process-heading">
        <div className={`container-padded ${styles.processGrid}`}>
          <div className={styles.processIntro}>
            <p className={styles.eyebrow}>The employer journey</p>
            <h2 id="process-heading" className={styles.heading}>From requirement <br />to recruitment.</h2>
            <p className={styles.description}>A clear sequence with your business involved at the points that matter. Exact steps and timing depend on the role, destination and confirmed engagement.</p>
            <Link href="/employers/request-manpower" className={styles.primaryAction}>Request Manpower <ArrowUpRight size={19} aria-hidden="true" /></Link>
          </div>
          <ol className={styles.timeline} role="list">
            {employerSteps.map((step, index) => (
              <li key={step.title}><span className={styles.stepNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.markets} aria-labelledby="markets-heading">
        <div className="container-padded">
          <div className={styles.sectionHeader}>
            <div><p className={styles.eyebrow}>Across borders</p><h2 id="markets-heading" className={styles.heading}>Recruitment markets.</h2></div>
            <p className={styles.sectionDescription}>Explore the markets represented on our website. Discuss your destination and workforce requirements with our team.</p>
          </div>
          <div className={styles.marketGrid}>
            {marketRegions.map((region) => (
              <div key={region} className={styles.marketRegion}><h3>{region}</h3><ul>{markets.filter((country) => country.region === region).map((country) => (
                <li key={country.id}><Link href={`/countries/${country.slug}`}><span>{country.name}</span><ArrowUpRight size={15} aria-hidden="true" /></Link></li>
              ))}</ul></div>
            ))}
          </div>
          <p className={styles.marketNote}><Globe2 size={17} aria-hidden="true" /> Market listings describe recruitment destinations, not verified employer partnerships or current contracts.</p>
        </div>
      </section>

      {employerExperience && (
        <section className={styles.experience} aria-labelledby="experience-heading">
          <div className={`container-padded ${styles.experienceGrid}`}>
            <div><p className={styles.eyebrow}>Employer perspectives</p><h2 id="experience-heading" className={styles.heading}>A conversation <br />with your business in mind.</h2><p className={styles.description}>{employerExperience.isDemo ? "Agency-approved employer feedback will be shared as it becomes available. This preview illustrates how that feedback will be presented." : "An employer perspective on the recruitment journey."}</p></div>
            <figure className={styles.quote}>
              <div className={styles.quoteTop}><Quote size={26} aria-hidden="true" />{employerExperience.isDemo && <span>Illustrative example</span>}</div>
              <blockquote><p>&ldquo;{employerExperience.review}&rdquo;</p></blockquote>
              <figcaption>{employerExperience.isDemo ? "Sample Employer Experience" : employerExperience.company}</figcaption>
              {employerExperience.isDemo && <p className={styles.sampleNotice}>Development sample. This is not a verified review or an endorsement from a real employer.</p>}
            </figure>
          </div>
        </section>
      )}

      <section className={styles.finalCta} aria-labelledby="request-heading">
        <div className={`container-padded ${styles.finalGrid}`}>
          <div><p className={styles.eyebrow}>Start your recruitment request</p><h2 id="request-heading" className={styles.heading}>Need Sri Lankan manpower <span>for your company?</span></h2><p className={styles.description}>Submit your workforce requirements for A-One to review. Tell us about the roles, experience and staffing needs you want to discuss.</p><EmployerActions final /></div>
          <div className={styles.requestNote}><ClipboardList size={30} aria-hidden="true" /><h3>A useful starting point</h3><ul><li>Your company and destination</li><li>Roles and workforce requirements</li><li>Experience and employment terms</li></ul><p>Share the details. Start the conversation.</p></div>
        </div>
      </section>
    </div>
  );
}
