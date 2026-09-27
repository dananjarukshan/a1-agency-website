import Image from "next/image";
import { partners } from "@/config/partners";
import styles from "./PartnerCompanies.module.css";

export default function PartnerCompanies() {
  const hasDemoPartners = partners.some((partner) => partner.isDemo);

  return (
    <section className={styles.section} aria-labelledby="partner-companies-heading">
      <div className="container-padded">
        <header className={styles.header}>
          <p className={styles.eyebrow}>Trusted Recruitment Connections</p>
          <h2 id="partner-companies-heading" className={styles.heading}>
            Our Partner Companies
          </h2>
          <p className={styles.description}>
            Building strong recruitment relationships across international markets.
          </p>
        </header>

        <div className={styles.logoTrack}>
          {partners.map((partner) => (
            <div key={partner.id} className={styles.logoItem}>
              <Image
                className={styles.logo}
                src={partner.logo}
                alt={partner.alt}
                width={704}
                height={192}
                sizes="(max-width: 767px) 42vw, (max-width: 1023px) 27vw, 19vw"
              />
            </div>
          ))}
        </div>

        {hasDemoPartners && (
          <p className={styles.demoNote}>Sample partner logos shown for website preview.</p>
        )}
      </div>
    </section>
  );
}
