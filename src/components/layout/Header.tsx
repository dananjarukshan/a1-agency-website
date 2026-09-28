"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, BriefcaseBusiness, ChevronDown, Compass, Globe, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import HeaderSocialLinks from "./HeaderSocialLinks";
import styles from "./Header.module.css";

const opportunityLinks = [
  { label: "Explore All Opportunities", href: "/opportunities", icon: Compass },
  { label: "Browse by Country", href: "/countries", icon: Globe },
  { label: "Browse by Job Category", href: "/job-categories", icon: BriefcaseBusiness },
] as const;

const navigation = [
  { label: "Home", href: "/" },
  { label: "For Employers", href: "/employers" },
  { label: "Jobs", href: "/jobs" },
  { label: "Opportunities", href: "/opportunities", children: opportunityLinks },
  { label: "About Us", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

function matchesRoute(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
}

function HeaderContent({ pathname }: { pathname: string }) {
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownLinksRef = useRef<HTMLUListElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState<"closed" | "hover" | "open">("closed");
  const opportunitiesActive = opportunityLinks.some(({ href }) => matchesRoute(pathname, href));
  const [mobileOpportunitiesOpen, setMobileOpportunitiesOpen] = useState(opportunitiesActive);
  const dropdownOpen = dropdown !== "closed";
  const employerPage = matchesRoute(pathname, "/employers");
  const cta = employerPage
    ? { support: "Looking for Sri Lankan talent?", label: "Request Manpower", href: "/employers/request-manpower" }
    : { support: "Looking for an overseas opportunity?", label: "Find Jobs", href: "/jobs" };

  useEffect(() => {
    if (!mobileOpen && !dropdownOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setMobileOpen(false);
        setDropdown("closed");
      } else if (event.target instanceof Node && !dropdownRef.current?.contains(event.target)) {
        setDropdown("closed");
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [mobileOpen, dropdownOpen]);

  useEffect(() => {
    // Keep the CSS breakpoint and this media query in sync. No scroll listeners.
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnBreakpointChange = () => {
      const focusWasInHeader = headerRef.current?.contains(document.activeElement);
      setMobileOpen(false);
      setDropdown("closed");
      if (focusWasInHeader) {
        if (desktop.matches) headerRef.current?.querySelector<HTMLAnchorElement>("[data-header-brand]")?.focus();
        else mobileButtonRef.current?.focus();
      }
    };
    desktop.addEventListener("change", closeOnBreakpointChange);
    return () => desktop.removeEventListener("change", closeOnBreakpointChange);
  }, []);

  function closeNavigation() {
    setMobileOpen(false);
    setDropdown("closed");
  }

  function handleEscape(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== "Escape") return;
    if (dropdownOpen) {
      event.preventDefault();
      setDropdown("closed");
      dropdownButtonRef.current?.focus();
    } else if (mobileOpen) {
      event.preventDefault();
      setMobileOpen(false);
      mobileButtonRef.current?.focus();
    }
  }

  function focusDropdownLink(last: boolean) {
    setDropdown("open");
    requestAnimationFrame(() => {
      const links = dropdownLinksRef.current?.querySelectorAll<HTMLAnchorElement>("a");
      links?.[last ? links.length - 1 : 0]?.focus();
    });
  }

  function handleDropdownKeys(event: KeyboardEvent<HTMLUListElement>) {
    const links = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>("a"));
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);
    let nextIndex: number;
    switch (event.key) {
      case "ArrowDown": nextIndex = (index + 1) % links.length; break;
      case "ArrowUp": nextIndex = (index - 1 + links.length) % links.length; break;
      case "Home": nextIndex = 0; break;
      case "End": nextIndex = links.length - 1; break;
      default: return;
    }
    event.preventDefault();
    links[nextIndex]?.focus();
  }

  function handleDropdownTriggerKeys(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      focusDropdownLink(event.key === "ArrowUp");
    }
  }

  return (
    <header
      className={styles.header}
      ref={headerRef}
      onKeyDown={handleEscape}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeNavigation();
      }}
    >
      <div className={styles.topBar}>
        <div className={styles.contactDetails}>
          <a href={siteConfig.mapUrl} target="_blank" rel="noopener noreferrer" aria-label={`View our location in ${siteConfig.address.city}, ${siteConfig.address.country}`}>
            <MapPin size={15} aria-hidden="true" />
            {siteConfig.address.city}, {siteConfig.address.country}
          </a>
          <a href={`mailto:${siteConfig.email}`}>
            <Mail size={15} aria-hidden="true" />{siteConfig.email}
          </a>
          <a href={siteConfig.phoneHref} aria-label={`Call A-One on ${siteConfig.phoneDisplay}`}>
            <Phone size={14} aria-hidden="true" />{siteConfig.phoneDisplay}
          </a>
        </div>
        <HeaderSocialLinks />
      </div>

      <div className={styles.mainRow}>
        <Link href="/" className={styles.brand} data-header-brand aria-label={`${siteConfig.name} – Home`} onClick={closeNavigation}>
          <span className={styles.brandMark} aria-hidden="true">{siteConfig.brand.logoText}</span>
          <span className={styles.brandCopy}>
            <span className={styles.brandName}>{siteConfig.shortName}</span>
            <span className={styles.brandTagline}>International Manpower</span>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {navigation.map((item) => "children" in item ? (
              <li
                key={item.label}
                className={styles.dropdown}
                ref={dropdownRef}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setDropdown((current) => current === "closed" ? "hover" : current);
                }}
                onPointerLeave={(event) => {
                  if (!event.currentTarget.contains(document.activeElement)) {
                    setDropdown((current) => current === "hover" ? "closed" : current);
                  }
                }}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setDropdown("closed");
                }}
              >
                <div className={styles.opportunityTrigger}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${styles.opportunityLink}`}
                    data-active={opportunitiesActive || undefined}
                    aria-current={matchesRoute(pathname, item.href) ? "page" : undefined}
                    onClick={closeNavigation}
                    onKeyDown={handleDropdownTriggerKeys}
                  >
                    {item.label}
                  </Link>
                  <button
                    ref={dropdownButtonRef}
                    type="button"
                    className={`${styles.navLink} ${styles.dropdownToggle}`}
                    data-active={opportunitiesActive || undefined}
                    aria-label="Toggle Opportunities menu"
                    aria-expanded={dropdownOpen}
                    aria-controls="desktop-opportunities"
                    onClick={() => setDropdown((current) => current === "open" ? "closed" : "open")}
                    onKeyDown={handleDropdownTriggerKeys}
                  >
                    <ChevronDown size={14} className={styles.chevron} aria-hidden="true" />
                  </button>
                </div>
                <div className={styles.dropdownPanel} hidden={!dropdownOpen}>
                  <ul id="desktop-opportunities" ref={dropdownLinksRef} onKeyDown={handleDropdownKeys}>
                    {item.children.map(({ href, label, icon: Icon }) => (
                      <li key={href}>
                        <Link href={href} aria-current={matchesRoute(pathname, href) ? "page" : undefined} onClick={closeNavigation}>
                          <Icon size={18} aria-hidden="true" /><span>{label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={item.href}>
                <Link href={item.href} className={styles.navLink} data-active={matchesRoute(pathname, item.href) || undefined} aria-current={matchesRoute(pathname, item.href) ? "page" : undefined} onClick={closeNavigation}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href={cta.href} className={styles.ctaPanel}>
          <span className={styles.ctaSupport}>{cta.support}</span>
          <span className={styles.ctaLabel}>{cta.label}<ArrowRight size={20} aria-hidden="true" /></span>
        </Link>

        <button
          ref={mobileButtonRef}
          type="button"
          className={styles.mobileToggle}
          onClick={() => setMobileOpen((current) => !current)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileOpen ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
        </button>
      </div>

      <nav id="mobile-navigation" className={styles.mobileMenu} aria-label="Mobile navigation" hidden={!mobileOpen}>
        <ul className={styles.mobileNavList}>
          {navigation.map((item) => "children" in item ? (
            <li key={item.label}>
              <div className={styles.mobileOpportunityRow}>
                <Link href={item.href} className={styles.mobileLink} data-active={opportunitiesActive || undefined} aria-current={matchesRoute(pathname, item.href) ? "page" : undefined} onClick={closeNavigation}>
                  {item.label}
                </Link>
                <button type="button" className={`${styles.mobileLink} ${styles.mobileDropdownToggle}`} aria-label="Toggle Opportunities submenu" aria-expanded={mobileOpportunitiesOpen} aria-controls="mobile-opportunities" onClick={() => setMobileOpportunitiesOpen((current) => !current)}>
                  <ChevronDown size={17} className={styles.chevron} aria-hidden="true" />
                </button>
              </div>
              <ul id="mobile-opportunities" className={styles.mobileSubmenu} hidden={!mobileOpportunitiesOpen}>
                {item.children.map(({ href, label, icon: Icon }) => (
                  <li key={href}>
                    <Link href={href} aria-current={matchesRoute(pathname, href) ? "page" : undefined} onClick={closeNavigation}>
                      <Icon size={17} aria-hidden="true" /><span>{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li key={item.href}>
              <Link href={item.href} className={styles.mobileLink} data-active={matchesRoute(pathname, item.href) || undefined} aria-current={matchesRoute(pathname, item.href) ? "page" : undefined} onClick={closeNavigation}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.mobileCta}>
          <p>{cta.support}</p>
          <Link href={cta.href} className="btn btn-primary" onClick={closeNavigation}>
            {cta.label}<ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default function Header() {
  const pathname = usePathname();
  // Reset disclosures on every route change, including browser back/forward.
  return <HeaderContent key={pathname} pathname={pathname} />;
}
