"use client";

import { useRef, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import { ArrowUpRight, Check, Minus, Plus, Search, X } from "lucide-react";
import type { PublicFAQ } from "@/data/faqs";
import styles from "./FAQ.module.css";

export default function FAQExplorer({ faqs }: { faqs: PublicFAQ[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState<string[]>([]);
  const input = useRef<HTMLInputElement>(null);
  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));
  const query = search.trim().toLocaleLowerCase("en");
  const matches = faqs.filter((faq) => (!category || faq.category === category)
    && `${faq.question} ${faq.answer}`.toLocaleLowerCase("en").includes(query));
  const reset = () => { setSearch(""); setCategory(""); setOpen([]); input.current?.focus(); };

  return (
    <section className={styles.explorer} aria-labelledby="find-answers-heading">
      <div className={styles.filterPanel}>
        <p className={styles.eyebrow}>Find your answer</p><h2 id="find-answers-heading">What would you like to know?</h2>
        <form role="search" aria-label="Search common questions" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="faq-search">Search questions and answers</label>
          <div className={styles.searchInput}><Search size={19} aria-hidden="true" /><input ref={input} id="faq-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Try passport, interview or visa" autoComplete="off" aria-controls="faq-results" /></div>
          <button type="button" className={styles.clear} disabled={!search} onClick={() => { setSearch(""); input.current?.focus(); }}><X size={16} aria-hidden="true" />Clear search</button>
        </form>
        <fieldset className={styles.filters}><legend>Browse by topic</legend>
          {["", ...categories].map((item) => <button key={item} type="button" aria-pressed={category === item} aria-controls="faq-results" onClick={() => { setCategory(item); setOpen([]); }}><span>{item || "All Questions"}</span>{category === item && <Check size={17} aria-hidden="true" />}</button>)}
        </fieldset>
      </div>
      <div className={styles.results}>
        <div className={styles.resultsHeader}><p role="status" aria-live="polite" aria-atomic="true"><strong>{matches.length}</strong> of {faqs.length} answers{category && ` · ${category}`}{query && ` matching “${search.trim()}”`}</p><button type="button" onClick={reset} disabled={!search && !category}>Reset filters</button></div>
        <div id="faq-results">
          {matches.length ? <Accordion.Root type="multiple" value={open} onValueChange={setOpen} className={styles.accordion}>
            {matches.map((faq) => <Accordion.Item key={faq.id} value={faq.id} className={styles.item}>
              <Accordion.Header asChild><h3><Accordion.Trigger className={styles.trigger}><span><span className={styles.topic}>{faq.category}</span><span>{faq.question}</span></span><span className={styles.toggle} aria-hidden="true"><Plus size={19} className={styles.plus} /><Minus size={19} className={styles.minus} /></span></Accordion.Trigger></h3></Accordion.Header>
              <Accordion.Content className={styles.answer}><div className={styles.answerInner}><p>{faq.answer}</p>{faq.links && <div className={styles.answerLinks}>{faq.links.map((link) => <Link key={link.href} href={link.href}>{link.label}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}</div>}</div></Accordion.Content>
            </Accordion.Item>)}
          </Accordion.Root> : <div className={styles.empty}><Search size={32} strokeWidth={1.5} aria-hidden="true" /><h3>No matching answers found</h3><p>Try another keyword or clear your filters. You can also contact A-One for guidance about your question.</p><button type="button" className={styles.primary} onClick={reset}>Clear all filters <X size={17} aria-hidden="true" /></button><Link href="/contact" className={styles.textLink}>Contact A-One <ArrowUpRight size={17} aria-hidden="true" /></Link></div>}
        </div>
      </div>
    </section>
  );
}
