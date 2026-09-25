"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Briefcase,
  Globe,
  Building2,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn, whatsappUrl } from "@/lib/utils";

const navigation = [
  { label: "Home", href: "/" },
  {
    label: "Jobs",
    href: "/jobs",
    children: [
      { label: "Browse All Jobs", href: "/jobs", icon: Briefcase },
      { label: "Browse by Country", href: "/countries", icon: Globe },
      { label: "Browse by Category", href: "/job-categories", icon: Building2 },
    ],
  },
  { label: "Countries", href: "/countries" },
  { label: "Job Categories", href: "/job-categories" },
  { label: "About Us", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "For Employers", href: "/employers" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const phoneConfigured = !siteConfig.phone.includes("X");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/98 backdrop-blur-sm shadow-[0_1px_16px_-4px_rgb(0_0_0/0.12)]"
            : "bg-white/95 backdrop-blur-sm border-b border-slate-200/80"
        )}
        role="banner"
      >
        {/* Top bar */}
        <div className="hidden md:block bg-brand-black text-white">
          <div className="container-padded flex items-center justify-between py-1.5">
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <span>{siteConfig.credentialStatusLabel}</span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              {phoneConfigured ? (
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                  aria-label={`Call us at ${siteConfig.phone}`}
                >
                  <Phone size={12} />
                  {siteConfig.phone}
                </a>
              ) : (
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Phone size={12} /> Official phone pending
                </span>
              )}
              <a
                href={whatsappUrl(siteConfig.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-teal-400 hover:text-teal-300 transition-colors font-medium"
                aria-label="Chat on WhatsApp"
              >
                {/* WhatsApp icon */}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="container-padded">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 rounded-md"
              aria-label={`${siteConfig.name} – Home`}
            >
              <div className="flex items-center justify-center w-9 h-9 bg-brand-black rounded-md">
                <span className="text-white font-bold text-lg leading-none">{siteConfig.brand.logoText}</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-[#0f1f3d] font-bold text-base leading-tight">
                  {siteConfig.shortName}
                </div>
                <div className="text-slate-500 text-[11px] leading-tight">
                  International Manpower
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden xl:flex items-center gap-0.5"
              aria-label="Main navigation"
            >
              {navigation.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      onClick={() =>
                        setOpenDropdown((current) =>
                          current === item.label ? null : item.label
                        )
                      }
                      className={cn(
                        "flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-md transition-colors",
                        isActive(item.href)
                          ? "nav-link-active text-[#0f1f3d] bg-slate-100"
                          : "text-slate-700 hover:text-[#0f1f3d] hover:bg-slate-50"
                      )}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-200",
                          openDropdown === item.label && "rotate-180"
                        )}
                      />
                    </button>
                    {openDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-slate-200 rounded-lg shadow-lg py-1 animate-fadeIn">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#0f1f3d] transition-colors"
                          >
                            <child.icon size={14} className="text-teal-600 flex-shrink-0" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "px-3.5 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive(item.href)
                        ? "nav-link-active text-[#0f1f3d] bg-slate-100"
                        : "text-slate-700 hover:text-[#0f1f3d] hover:bg-slate-50"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden xl:flex items-center gap-2">
              <Link href="/contact" className="btn btn-secondary btn-sm">
                Apply / Contact
              </Link>
              <Link
                href="/jobs"
                className="btn btn-primary btn-sm"
                aria-label="Find overseas jobs"
              >
                Find Jobs
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="xl:hidden border-t border-slate-200 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto"
            aria-label="Mobile navigation"
          >
            <div className="container-padded py-4 space-y-1">
              {navigation.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                      isActive(item.href)
                        ? "nav-link-active text-[#0f1f3d] bg-slate-100"
                        : "text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-0.5">
                      {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 text-sm text-slate-600 hover:text-[#0f1f3d] hover:bg-slate-50 rounded-md transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {/* Mobile CTA */}
              <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
                <Link href="/jobs" className="btn btn-primary w-full justify-center">
                  Find Jobs
                </Link>
                <Link href="/contact" className="btn btn-secondary w-full justify-center">
                  Contact Us
                </Link>
                <a
                  href={whatsappUrl(siteConfig.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-teal w-full justify-center"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
