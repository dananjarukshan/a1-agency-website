import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import styles from "./Footer.module.css";

const groups = [
  {
    title: "Jobs by Country",
    links: [
      ["Browse All Jobs", "/jobs"],
      ["Jobs in Saudi Arabia", "/countries/saudi-arabia"],
      ["Jobs in UAE", "/countries/united-arab-emirates"],
      ["Jobs in Qatar", "/countries/qatar"],
      ["Jobs in Kuwait", "/countries/kuwait"],
      ["Jobs in Oman", "/countries/oman"],
    ],
  },
  {
    title: "Job Categories",
    links: [
      ["Drivers", "/job-categories/drivers"],
      ["Construction", "/job-categories/construction"],
      ["Hospitality", "/job-categories/hospitality"],
      ["Electricians", "/job-categories/electricians"],
      ["Security", "/job-categories/security"],
      ["Technicians", "/job-categories/technicians"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Us", "/about"],
      ["How It Works", "/how-it-works"],
      ["For Employers", "/employers"],
      ["Request Manpower", "/employers/request-manpower"],
      ["FAQ", "/faq"],
      ["Contact Us", "/contact"],
    ],
  },
] as const;

const socials = [
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
  { key: "youtube", label: "YouTube" },
  { key: "tiktok", label: "TikTok" },
  { key: "linkedin", label: "LinkedIn" },
] as const;

function SocialIcon({ name }: { name: "facebook" | "instagram" | "tiktok" | "youtube" | "linkedin" }) {
  const paths = {
    facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98C23.986 15.668 24 15.259 24 12s-.014-3.667-.072-4.947C23.732 2.699 21.311.273 16.949.073 15.668.014 15.259 0 12 0zm0 5.838A6.162 6.162 0 1 0 12 18.162 6.162 6.162 0 0 0 12 5.838zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z",
    tiktok: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2-2.75V9.4a6.33 6.33 0 1 0 5.43 6.27V8.73a8.2 8.2 0 0 0 4.79 1.54V6.84c-.34 0-.67-.05-1-.15Z",
    youtube: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z",
    linkedin: "M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5ZM8 19H5V8h3v11ZM6.5 6.732A1.757 1.757 0 1 1 6.5 3.2a1.757 1.757 0 0 1 0 3.532ZM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19Z",
  };
  return <svg width="21" height="21" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d={paths[name]} /></svg>;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container-padded ${styles.container}`}>
        <section className={styles.contactBanner} aria-labelledby="footer-contact-title">
          <div className={styles.bannerCopy}>
            <h2 id="footer-contact-title">
              Looking for <strong>overseas opportunities?</strong> Just call us.
            </h2>
            <p>
              Need guidance? Call <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
              {" "}or email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>
          </div>
          <Link href="/contact" className={styles.contactButton}>
            Contact Us <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </section>

        <div className={styles.brand}>
          <Link href="/" className={styles.logoLink} aria-label={`${siteConfig.name} home`}>
            <Image
              src="/images/a-one-logo-footer.png"
              alt={siteConfig.name}
              width={1300}
              height={400}
              sizes="(max-width: 480px) 260px, 320px"
              className={styles.logo}
            />
          </Link>
          <p className={styles.description}>
            A Sri Lanka-focused recruitment platform for overseas career opportunities and international manpower enquiries across the Middle East and beyond.
          </p>
          <nav className={styles.socials} aria-label="A-One social media">
            {socials.map(({ key, label }) => (
              <a key={key} href={siteConfig.social[key]} target="_blank" rel="noopener noreferrer" aria-label={`A-One on ${label}`} title={label}>
                <SocialIcon name={key} />
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.columns}>
          {groups.map((group) => (
            <section key={group.title} className={styles.linkGroup}>
              <h3>{group.title}</h3>
              <ul>
                {group.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}><ChevronRight size={17} aria-hidden="true" /><span>{label}</span></Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className={styles.contact}>
            <h3>Contact Details</h3>
            <address>
              <p className={styles.agencyName}>{siteConfig.name}</p>
              <a href={siteConfig.mapUrl} target="_blank" rel="noopener noreferrer" className={styles.contactRow}>
                <MapPin size={19} aria-hidden="true" />
                <span>{siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.country}</span>
              </a>
              <a href={siteConfig.phoneHref} className={styles.contactRow}>
                <Phone size={18} aria-hidden="true" /><span>Hotline: {siteConfig.phoneDisplay}</span>
              </a>
              <a href={`mailto:${siteConfig.email}`} className={styles.contactRow}>
                <Mail size={18} aria-hidden="true" /><span>{siteConfig.email}</span>
              </a>
              <div className={styles.contactRow}>
                <Clock size={18} aria-hidden="true" /><span>{siteConfig.officeHours}</span>
              </div>
            </address>
            <a href={siteConfig.mapUrl} target="_blank" rel="noopener noreferrer" className={styles.mapLink}>
              View location on Google Maps <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </section>
        </div>

        <div className={styles.bottomBar}>
          <div>
            <p>© {currentYear} {siteConfig.name}.</p>
            <p className={styles.credentials}>Demo website · {siteConfig.credentialStatusLabel}</p>
          </div>
          <nav className={styles.legalLinks} aria-label="Legal information">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
