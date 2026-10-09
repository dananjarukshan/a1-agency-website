"use client";

import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { homepageFaqs } from "@/data/faqs";
import styles from "./FAQPreview.module.css";

export default function FAQPreview() {
  const preview = homepageFaqs;

  return (
    <section className={styles.section} aria-labelledby="faq-preview-heading">
      <div className="container-padded">
        <div className={styles.layout}>
          <div className={styles.header}>
            <p className={styles.eyebrow}>Common Questions</p>
            <h2 id="faq-preview-heading" className={styles.heading}>
              Questions
            </h2>
            <p className={styles.description}>
              Answers to the questions we hear most from job seekers and employers.
            </p>
            <Link
              href="/faq"
              className={styles.directoryLink}
              aria-label="View all frequently asked questions"
            >
              View All FAQs
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <Accordion.Root type="multiple" className={styles.accordion}>
            {preview.map((faq) => (
              <Accordion.Item key={faq.id} value={faq.id} className={styles.item}>
                <Accordion.Header className={styles.questionHeading}>
                  <Accordion.Trigger className={styles.trigger}>
                    <span>{faq.question}</span>
                    <span className={styles.toggleIcon} aria-hidden="true">
                      <Plus size={17} className={styles.plusIcon} />
                      <Minus size={17} className={styles.minusIcon} />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className={styles.content}>
                  <div className={styles.answer}>
                    <p>{faq.answer}</p>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
}
