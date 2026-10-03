"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import type { FeaturedCountry } from "./FeaturedCountries";
import { featuredCountryImageAlt } from "@/config/featured-countries";
import styles from "./FeaturedCountries.module.css";

type Props = {
  countries: FeaturedCountry[];
};

type CountryPresentationProps = {
  country: FeaturedCountry;
  active: boolean;
};

function CountryVisual({ country, active }: CountryPresentationProps) {
  return (
    <div
      className={styles.visual}
      data-country-image={country.slug}
      data-visual-active={active}
      aria-hidden={!active}
    >
      <Image
        className={styles.visualImage}
        src={country.image}
        alt={featuredCountryImageAlt[country.slug] ?? country.name}
        fill
        // Allow enough source pixels for the taller object-fit crop.
        sizes="(max-width: 767px) max(calc(100vw - 48px), 480px), 900px"
      />
      <div className={styles.visualIdentity}>
        <span className={styles.countryCode} aria-hidden="true">{country.id.toUpperCase()}</span>
        <span className={styles.visualName}>{country.name}</span>
      </div>
    </div>
  );
}

function CountryPresentation({ country, active }: CountryPresentationProps) {
  const vacancyLabel =
    country.activeVacancyCount > 0
      ? `${country.activeVacancyCount} sample ${country.activeVacancyCount === 1 ? "vacancy" : "vacancies"}`
      : "Recruiting market";

  return (
    <div
      id={`featured-country-${country.slug}`}
      className={styles.presentation}
      data-active={active}
      role="region"
      aria-labelledby={`featured-country-title-${country.slug}`}
      aria-hidden={!active}
      inert={!active}
    >
      <div className={styles.content}>
        <div className={styles.contentBody}>
          <p className={styles.marketLabel}>International recruitment market</p>
          <h3 id={`featured-country-title-${country.slug}`} className={styles.countryName}>{country.name}</h3>
          <p className={styles.summary}>{country.summary}</p>

          <div className={styles.categories}>
            <p className={styles.categoriesLabel}>Common recruitment fields</p>
            <ul className={styles.categoryList}>
              {country.popularCategories.map((category) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
          </div>

          <div className={styles.actions}>
            <div className={styles.vacancyStatus}>
              <BriefcaseBusiness size={17} aria-hidden="true" />
              <span>{vacancyLabel}</span>
            </div>
            <Link className={styles.cta} href={`/countries/${country.slug}`}>
              View Opportunities
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

type CountrySelectorProps = {
  countries: FeaturedCountry[];
  activeSlug: string;
  onSelect: (slug: string) => void;
};

function CountrySelector({ countries, activeSlug, onSelect }: CountrySelectorProps) {
  return (
    <div className={styles.selector} role="group" aria-label="Choose a featured country">
      {countries.map((country, index) => {
        const isActive = country.slug === activeSlug;

        return (
          <button
            key={country.slug}
            type="button"
            className={styles.selectorButton}
            aria-pressed={isActive}
            aria-controls={`featured-country-${country.slug}`}
            onClick={() => onSelect(country.slug)}
          >
            <span className={styles.selectorNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <span>{country.shortName ?? country.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function FeaturedCountriesClient({ countries }: Props) {
  const [activeSlug, setActiveSlug] = useState(countries[0]?.slug ?? "");
  const activeSlugRef = useRef(activeSlug);
  const storyRef = useRef<HTMLDivElement>(null);
  const explorerRef = useRef<HTMLDivElement>(null);
  const imageAnimationsRef = useRef<Animation[]>([]);
  const lastImageSlugRef = useRef(activeSlug);
  const metricsRef = useRef({ enabled: false, top: 0, interval: 1 });
  const activeCountry =
    countries.find((country) => country.slug === activeSlug) ?? countries[0];

  useLayoutEffect(() => {
    if (lastImageSlugRef.current === activeSlug) return;
    const visuals = Array.from(
      explorerRef.current?.querySelectorAll<HTMLElement>("[data-country-image]") ?? []
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Sample before cancelling: interrupted fades retain their exact visual mix.
    const weights = visuals.map((visual) => imageAnimationsRef.current.length
      ? Number(getComputedStyle(visual).opacity)
      : Number(visual.dataset.countryImage === lastImageSlugRef.current));
    imageAnimationsRef.current.forEach((animation) => animation.cancel());
    imageAnimationsRef.current = [];
    lastImageSlugRef.current = activeSlug;
    if (reducedMotion) return;

    const total = weights.reduce((sum, weight) => sum + weight, 0) || 1;
    // Retarget every layer on the same timeline. Their weights sum to one even
    // when a fast scroll crosses several countries before a dissolve finishes.
    const startTime = document.timeline.currentTime;
    imageAnimationsRef.current = visuals.map((visual, index) => {
      const animation = visual.animate([
        { opacity: weights[index] / total },
        { opacity: Number(visual.dataset.countryImage === activeSlug) },
      ], {
        duration: 720,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        fill: "forwards",
      });
      if (typeof startTime === "number") animation.startTime = startTime;
      return animation;
    });
  }, [activeSlug]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stopImageAnimations = () => {
      imageAnimationsRef.current.forEach((animation) => animation.cancel());
      imageAnimationsRef.current = [];
    };
    const onMotionChange = () => {
      if (reducedMotion.matches) stopImageAnimations();
    };
    reducedMotion.addEventListener("change", onMotionChange);
    return () => {
      reducedMotion.removeEventListener("change", onMotionChange);
      stopImageAnimations();
    };
  }, []);

  useEffect(() => {
    const story = storyRef.current;
    const explorer = explorerRef.current;
    if (!story || !explorer || countries.length < 2) return;

    const desktop = window.matchMedia("(min-width: 1280px)");
    const header = document.querySelector<HTMLElement>("body > header");
    let frame = 0;
    let nearby = true;

    function updateFromScroll() {
      frame = 0;
      const { enabled, top, interval } = metricsRef.current;
      if (!enabled || !story || !explorer) return;
      const distance = top - story.getBoundingClientRect().top;
      const progress = distance / interval;
      let index = Math.max(0, Math.min(countries.length - 1, Math.floor(progress)));
      const currentIndex = countries.findIndex((country) => country.slug === activeSlugRef.current);
      // A small dead band prevents trackpad jitter from repeatedly reversing a fade.
      if (index === currentIndex + 1 && progress < index + 0.025) index = currentIndex;
      if (index === currentIndex - 1 && progress > index + 1 - 0.025) index = currentIndex;
      const slug = countries[index].slug;
      if (activeSlugRef.current === slug) return;
      activeSlugRef.current = slug;
      // Preserve keyboard focus if scrolling replaces a focused country's CTA.
      const outgoing = explorer.querySelector<HTMLElement>('[data-active="true"]');
      if (outgoing?.id !== `featured-country-${slug}` && outgoing?.contains(document.activeElement)) {
        explorer.querySelector<HTMLButtonElement>(`button[aria-controls="featured-country-${slug}"]`)?.focus({ preventScroll: true });
      }
      setActiveSlug(slug);
    }

    function scheduleUpdate() {
      if (nearby && !frame) frame = window.requestAnimationFrame(updateFromScroll);
    }

    function measure() {
      if (!story || !explorer) return;
      // The desktop contact strip scrolls away; use the header's sticky extent.
      const headerTop = header ? parseFloat(getComputedStyle(header).top) || 0 : 0;
      const top = Math.max(0, (header?.offsetHeight ?? 0) + headerTop) + 16;
      const panelHeight = explorer.offsetHeight;
      const enabled = desktop.matches && panelHeight + top + 16 <= window.innerHeight;
      const interval = window.innerHeight;
      metricsRef.current = { enabled, top, interval };
      story.style.setProperty("--story-top", `${top}px`);
      story.style.setProperty("--story-height", `${panelHeight + countries.length * interval}px`);
      story.dataset.story = String(enabled);
      scheduleUpdate();
    }

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(explorer);
    if (header) resizeObserver.observe(header);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      // Also synchronize when jumping entirely past the section.
      if (!frame) frame = window.requestAnimationFrame(updateFromScroll);
    }, { rootMargin: "100% 0px" });
    intersectionObserver.observe(story);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", measure);
    desktop.addEventListener("change", measure);
    header?.addEventListener("focusin", measure);
    header?.addEventListener("focusout", measure);
    measure();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", measure);
      desktop.removeEventListener("change", measure);
      header?.removeEventListener("focusin", measure);
      header?.removeEventListener("focusout", measure);
    };
  }, [countries]);

  function selectCountry(slug: string) {
    const { enabled, top, interval } = metricsRef.current;
    const story = storyRef.current;
    if (!enabled || !story) {
      if (activeSlugRef.current === slug) return;
      activeSlugRef.current = slug;
      setActiveSlug(slug);
      return;
    }
    const index = countries.findIndex((country) => country.slug === slug);
    const start = story.getBoundingClientRect().top + window.scrollY - top;
    // Land beyond the boundary buffer so clicks and scroll-driven state agree.
    window.scrollTo({
      top: start + (index + 0.12) * interval,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  if (!activeCountry) return null;

  return (
    <div ref={storyRef} className={styles.story}>
      <div ref={explorerRef} className={styles.explorer}>
        <div className={styles.panels}>
          <div className={styles.visualStack}>
            {countries.map((country) => (
              <CountryVisual key={country.slug} country={country} active={country.slug === activeCountry.slug} />
            ))}
          </div>
          <div className={styles.contentStack}>
            {countries.map((country) => (
              <CountryPresentation
                key={country.slug}
                country={country}
                active={country.slug === activeCountry.slug}
              />
            ))}
          </div>
        </div>
        <CountrySelector
          countries={countries}
          activeSlug={activeCountry.slug}
          onSelect={selectCountry}
        />
      </div>
    </div>
  );
}
