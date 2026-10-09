import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FAQExplorer from "@/components/faq/FAQExplorer";
import { faqs } from "@/data/faqs";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/utils";
import styles from "@/components/faq/FAQ.module.css";

const title = `Common Questions & Overseas Employment FAQ | ${siteConfig.name}`;
const description = "Find answers about overseas job applications, documents, recruitment stages and employer enquiries. Guidance for Sri Lankan candidates and international employers.";
export const metadata: Metadata = {
  title: { absolute: title }, description,
  authors: [{ name: siteConfig.name }], creator: siteConfig.name,
  alternates: { canonical: "/faq" },
  openGraph: { title, description, url: `${siteConfig.url}/faq`, type: "website", siteName: siteConfig.name },
  twitter: { card: "summary_large_image", title, description },
};

export default function FAQPage() {
  const whatsappConfigured = /^\+?[1-9][\d\s()-]*$/.test(siteConfig.whatsapp.trim())
    && /^[1-9]\d{9,14}$/.test(siteConfig.whatsapp.replace(/\D/g, ""));
  return (
    <div className={styles.page}>
      <header className={styles.hero}><div className="container-padded">
        <Breadcrumbs items={[{ label: "Common Questions" }]} className={styles.breadcrumbs} />
        <div className={styles.heroCopy}><p className={styles.eyebrow}>Common Questions</p><h1>Answers to help you <span>move forward.</span></h1><p>Explore questions about applications, documents, the recruitment journey and overseas employment, with a dedicated topic for international employers.</p></div>
        <div className={styles.heroFootnote}><span>For candidates & international employers</span><Link href="/how-it-works">Explore the Recruitment Journey <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
      </div></header>
      <div className={`container-padded ${styles.content}`}>
        <FAQExplorer faqs={[...faqs].sort((a, b) => a.order - b.order)} />
        <section className={styles.contact} aria-labelledby="still-questions-heading"><div><p className={styles.eyebrow}>A conversation can help</p><h2 id="still-questions-heading">Still have a question?</h2><p>Contact A-One through the published phone number or email to clarify a vacancy, document request or employer enquiry.</p><div className={styles.actions}><Link href="/contact" className={styles.primary}>Contact A-One <ArrowUpRight size={18} aria-hidden="true" /></Link><a href={siteConfig.phoneHref} className={styles.secondary}><Phone size={17} aria-hidden="true" />Call A-One</a>{whatsappConfigured && <a href={whatsappUrl(siteConfig.whatsapp)} target="_blank" rel="noopener noreferrer" className={styles.secondary}><MessageCircle size={17} aria-hidden="true" />Ask on WhatsApp</a>}</div></div><div className={styles.contactDetails}><p>Published agency contacts</p><a href={siteConfig.phoneHref}><Phone size={18} aria-hidden="true" /><span>{siteConfig.phoneDisplay}</span></a><a href={`mailto:${siteConfig.email}`}><Mail size={18} aria-hidden="true" /><span>{siteConfig.email}</span></a><Link href="/contact">Office details & opening hours <ArrowUpRight size={17} aria-hidden="true" /></Link></div></section>
      </div>
    </div>
  );
}
