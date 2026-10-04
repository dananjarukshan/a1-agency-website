import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Search, Filter } from "lucide-react";
import { PageHeader, Badge, ActionButton } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Job Vacancies" };

// Placeholder — replace with Supabase query after DB setup
const jobs: {
  id: string;
  reference: string;
  title: string;
  country: string;
  category: string;
  vacancies: number;
  status: string;
  closingDate: string;
  featured: boolean;
  slbfeApprovalNumber: string;
}[] = [];

const statusVariant: Record<string, "green" | "yellow" | "red" | "slate"> = {
  active: "green",
  draft: "slate",
  paused: "yellow",
  closed: "red",
};

export default function JobsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Job Vacancies"
        description="Manage all job postings including SLBFE approvals, quotas and closing dates."
        action={
          <ActionButton href="/admin/jobs/new">
            <Plus className="size-4" /> New Job
          </ActionButton>
        }
      />

      {/* Filters bar */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-card">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 min-w-[200px]">
          <Search className="size-4 text-slate-400" />
          <input
            type="search"
            placeholder="Search jobs…"
            className="flex-1 text-sm outline-none placeholder:text-slate-400"
          />
        </div>
        <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 bg-white outline-none">
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="paused">Paused</option>
          <option value="closed">Closed</option>
        </select>
        <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 bg-white outline-none">
          <option value="">All Countries</option>
        </select>
        <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 bg-white outline-none">
          <option value="">All Categories</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Reference</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Title</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Country</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Category</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500">Vacancies</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">SLBFE No.</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Closing</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center text-sm text-slate-400">
                  No job vacancies yet.{" "}
                  <Link href="/admin/jobs/new" className="font-medium text-navy-600 underline">
                    Post your first job →
                  </Link>
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">{job.reference}</td>
                  <td className="px-4 py-3 font-medium text-navy-800">
                    {job.featured && (
                      <span className="mr-1.5 text-amber-500">★</span>
                    )}
                    {job.title}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{job.country}</td>
                  <td className="px-4 py-3 text-slate-600">{job.category}</td>
                  <td className="px-4 py-3 text-center text-slate-700">{job.vacancies}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{job.slbfeApprovalNumber}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant[job.status] ?? "slate"}>
                      {job.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{job.closingDate}</td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      href={`/admin/jobs/${job.id}`}
                      className="text-xs font-medium text-navy-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
