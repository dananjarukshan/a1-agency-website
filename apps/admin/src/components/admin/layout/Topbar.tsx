"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home, User, ExternalLink } from "lucide-react";

const routeLabels: Record<string, string> = {
  admin: "Admin",
  dashboard: "Dashboard",
  jobs: "Job Vacancies",
  applicants: "Applicants",
  "employer-requests": "Employer Requests",
  taxonomy: "Taxonomy",
  countries: "Countries",
  categories: "Job Categories",
  reviews: "Reviews",
  media: "Media Gallery",
  announcements: "Announcements",
  events: "Events",
  faqs: "FAQs",
  team: "Team Members",
  "contact-messages": "Contact Messages",
  new: "New",
};

export function AdminTopbar() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const label = routeLabels[seg] ?? seg;
    const isLast = i === segments.length - 1;
    return { href, label, isLast };
  });

  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white pl-[calc(16rem+1px)] pr-4 shadow-sm transition-all">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
        <Link href="/admin/dashboard" className="text-slate-400 hover:text-navy-700 transition">
          <Home className="size-3.5" />
        </Link>
        {crumbs.slice(1).map((crumb) => (
          <span key={crumb.href} className="flex items-center gap-1">
            <ChevronRight className="size-3 text-slate-300" />
            {crumb.isLast ? (
              <span className="font-medium text-navy-800">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="text-slate-500 hover:text-navy-700 transition">
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      {/* Right */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-navy-300 hover:text-navy-700"
        >
          <ExternalLink className="size-3" />
          View Site
        </Link>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5">
          <User className="size-3.5 text-slate-500" />
          <span className="text-xs font-medium text-slate-700">Admin</span>
        </div>
      </div>
    </header>
  );
}
