import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  Users,
  Building2,
  Star,
  Bell,
  Calendar,
  MessageSquare,
  HelpCircle,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { StatCard, Badge } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Dashboard" };

// ─── Placeholder stats (replace with real DB queries after Supabase setup) ────
const stats = [
  { label: "Active Job Vacancies", value: 0, icon: Briefcase, iconColor: "text-navy-600" },
  { label: "Total Applicants", value: 0, icon: Users, iconColor: "text-teal-600" },
  { label: "Employer Requests", value: 0, icon: Building2, iconColor: "text-amber-600" },
  { label: "Pending Reviews", value: 0, icon: Star, iconColor: "text-orange-500" },
  { label: "Active Announcements", value: 0, icon: Bell, iconColor: "text-blue-600" },
  { label: "Upcoming Events", value: 0, icon: Calendar, iconColor: "text-purple-600" },
  { label: "Unread Messages", value: 0, icon: MessageSquare, iconColor: "text-rose-600" },
  { label: "Published FAQs", value: 0, icon: HelpCircle, iconColor: "text-slate-600" },
];

const quickLinks = [
  {
    label: "Post New Job",
    href: "/jobs/new",
    icon: Briefcase,
    description: "Add a new job vacancy with SLBFE approval",
  },
  {
    label: "Add Applicant",
    href: "/applicants/new",
    icon: Users,
    description: "Manually register a new job applicant",
  },
  {
    label: "Create Announcement",
    href: "/announcements/new",
    icon: Bell,
    description: "Broadcast an urgent notice or update",
  },
  {
    label: "Add Event",
    href: "/events/new",
    icon: Calendar,
    description: "Schedule a recruitment drive or interview",
  },
];

const modules = [
  { label: "Job Vacancies", href: "/jobs", icon: Briefcase, desc: "Manage postings, SLBFE approvals & status" },
  { label: "Applicants", href: "/applicants", icon: Users, desc: "Track applicant status through departure" },
  { label: "Employer Requests", href: "/employer-requests", icon: Building2, desc: "Review inbound manpower requests" },
  { label: "Countries", href: "/taxonomy/countries", icon: null, desc: "Manage destination country pages" },
  { label: "Job Categories", href: "/taxonomy/categories", icon: null, desc: "Manage recruitment field taxonomy" },
  { label: "Reviews", href: "/reviews", icon: Star, desc: "Approve & publish candidate/employer feedback" },
  { label: "Media Gallery", href: "/media", icon: null, desc: "Upload photos & videos of deployments" },
  { label: "Announcements", href: "/announcements", icon: Bell, desc: "Time-sensitive notices and alerts" },
  { label: "Events", href: "/events", icon: Calendar, desc: "Recruitment drives & interview days" },
  { label: "FAQs", href: "/faqs", icon: HelpCircle, desc: "Manage frequently asked questions" },
  { label: "Team Members", href: "/team", icon: null, desc: "Staff profiles displayed on About page" },
  { label: "Contact Messages", href: "/contact-messages", icon: MessageSquare, desc: "Inbox from public contact form" },
];

export default function DashboardPage() {
  const now = new Date();
  const greeting =
    now.getHours() < 12 ? "Good morning" : now.getHours() < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{greeting}, Admin 👋</h1>
          <p className="mt-1 text-sm text-slate-500">
            Here&apos;s an overview of A-One Agency&apos;s dashboard.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
          <AlertCircle className="size-4 text-amber-600" />
          <span className="text-xs font-medium text-amber-700">
            Connect Supabase to see live data
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-navy-800">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-card transition hover:border-navy-300 hover:shadow-card-hover"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-50">
                <link.icon className="size-4 text-navy-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy-800 group-hover:text-navy-600">
                  {link.label}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-400">{link.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* All Modules */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-navy-800">All Modules</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => (
            <Link
              key={mod.href}
              href={mod.href}
              className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-card transition hover:border-navy-200 hover:shadow-card-hover"
            >
              <div>
                <p className="text-sm font-medium text-navy-800">{mod.label}</p>
                <p className="text-[11px] text-slate-400">{mod.desc}</p>
              </div>
              <ArrowRight className="size-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-navy-500" />
            </Link>
          ))}
        </div>
      </div>

      {/* Status indicators */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
        <h2 className="mb-4 text-sm font-semibold text-navy-800">Setup Status</h2>
        <div className="space-y-3">
          {[
            { label: "Admin dashboard structure", done: true },
            { label: "Login page & authentication UI", done: true },
            { label: "Supabase database connection", done: false },
            { label: "File storage (Supabase Storage)", done: false },
            { label: "Server Actions wired to DB", done: false },
            { label: "Public forms saving to DB", done: false },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              {item.done ? (
                <CheckCircle2 className="size-4 shrink-0 text-teal-500" />
              ) : (
                <Clock className="size-4 shrink-0 text-slate-300" />
              )}
              <span
                className={cn(
                  "text-sm",
                  item.done ? "text-slate-700" : "text-slate-400"
                )}
              >
                {item.label}
              </span>
              <Badge variant={item.done ? "green" : "slate"} className="ml-auto">
                {item.done ? "Done" : "Pending"}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function cn(...args: (string | boolean | undefined)[]) {
  return args.filter(Boolean).join(" ");
}
