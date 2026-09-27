"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronDown,
  CircleCheck,
  MapPin,
  MessageCircle,
  Search,
} from "lucide-react";
import { countries, jobCategories, jobs } from "@/data";
import styles from "./HeroSection.module.css";
import statsStyles from "./Statistics.module.css";

export default function HeroSection() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState("");

  const activeJobs = jobs.filter((job) => job.status === "active");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("q", keyword.trim());
    if (country) params.set("country", country);
    router.push(`/jobs${params.size ? `?${params.toString()}` : ""}`);
  };

  return (
    <>
      <section
        className={styles.hero}
        aria-labelledby="home-hero-heading"
      >
        <div className={styles.stage}>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className={styles.video}
          >
            <source src="/videos/homepage-hero-loop.mp4" type="video/mp4" />
          </video>
          <div className={styles.overlay} aria-hidden="true" />

          <div className={`container-padded ${styles.stageContainer}`}>
            <div className={styles.copy}>
              <p className={styles.eyebrow}>
                <CircleCheck size={15} aria-hidden="true" />
                Sri Lanka-focused international recruitment
              </p>

              <h1
                id="home-hero-heading"
                className={styles.headline}
              >
                <span>Your next career</span>{" "}
                <strong>move can go further.</strong>
              </h1>
              <p className={styles.description}>
                Explore overseas roles created for Sri Lankan talent, understand every step, and
                apply through one clear, candidate-friendly process.
              </p>

              <div className={styles.actions}>
                <Link href="/jobs" className={`btn btn-primary ${styles.action}`}>
                  Explore opportunities
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className={`btn ${styles.action} ${styles.secondaryAction}`}
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  Talk to our team
                </Link>
              </div>

            </div>
          </div>
        </div>

        <div className={`container-padded ${styles.searchArea}`}>
          <form
            onSubmit={handleSearch}
            className={styles.searchPanel}
            role="search"
            aria-label="Search overseas jobs"
          >
            <label className={`${styles.field} ${styles.keywordField}`}>
              <Search size={18} aria-hidden="true" />
              <span className="sr-only">Job title or keyword</span>
              <input
                type="search"
                placeholder="Job title, trade, or skill"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                className={styles.keywordInput}
              />
            </label>

            <label className={styles.field}>
              <MapPin size={18} aria-hidden="true" />
              <span className="sr-only">Destination country</span>
              <span className={styles.selectWrap}>
                <select
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                  className={styles.destinationSelect}
                >
                  <option value="">All destinations</option>
                  {countries.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className={styles.selectChevron}
                  aria-hidden="true"
                />
              </span>
            </label>

            <button type="submit" className={`btn btn-primary ${styles.searchButton}`}>
              <Search size={16} aria-hidden="true" />
              Search jobs
            </button>
          </form>

          <div className={styles.popularSearches}>
            <span>Popular searches:</span>
            {["Driver", "Electrician", "Hospitality", "Welder"].map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => router.push(`/jobs?q=${encodeURIComponent(term)}`)}
                className={styles.popularSearch}
              >
                {term}
              </button>
            ))}
          </div>
          <p className={styles.disclaimer}>
            Clear role details. Guided applications. No job or visa guarantees.
          </p>
        </div>
      </section>

      <section className={statsStyles.section} aria-label="Website overview">
        <div className={`container-padded ${statsStyles.grid}`}>
          {[
            { value: `${activeJobs.length}`, label: "Sample vacancies", icon: BriefcaseBusiness },
            { value: `${countries.length}`, label: "Destinations", icon: MapPin },
            { value: `${jobCategories.length}`, label: "Career categories", icon: Search },
            { value: "10 steps", label: "Guided journey", icon: CircleCheck },
          ].map((item) => (
            <div key={item.label} className={statsStyles.item}>
              <item.icon size={20} className={statsStyles.icon} aria-hidden="true" />
              <p className={statsStyles.value}>{item.value}</p>
              <p className={statsStyles.label}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
