import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { PageHeader, Badge, ActionButton } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Applicants" };

const statusColors: Record<string, "green" | "yellow" | "blue" | "red" | "slate" | "amber"> = {
  APPLIED: "blue",
  REVIEWED: "slate",
  SHORTLISTED: "amber",
  INTERVIEW_SCHEDULED: "amber",
  INTERVIEWED: "amber",
  SELECTED: "green",
  DOCUMENT_PROCESSING: "yellow",
  MEDICAL: "yellow",
  VISA_PROCESSING: "yellow",
  READY_FOR_DEPARTURE: "green",
  DEPARTED: "green",
  REJECTED: "red",
  WITHDRAWN: "slate",
};

export default function ApplicantsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Job Applicants"
        description="Manage all applicants across the full recruitment pipeline — from application to departure."
        action={
          <ActionButton href="/admin/applicants/new">
            <Plus className="size-4" /> Add Applicant
          </ActionButton>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-card">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 min-w-[200px]">
          <Search className="size-4 text-slate-400" />
          <input type="search" placeholder="Search by name, NIC, passport…" className="flex-1 text-sm outline-none placeholder:text-slate-400" />
        </div>
        <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white outline-none text-slate-700">
          <option value="">All Statuses</option>
          {Object.keys(statusColors).map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
        </select>
        <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white outline-none text-slate-700">
          <option value="">All Jobs</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Reference</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Full Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">NIC</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Passport No.</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Job Applied</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">District</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Submitted</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={9} className="px-4 py-12 text-center text-sm text-slate-400">
                No applicants yet.{" "}
                <Link href="/admin/applicants/new" className="font-medium text-navy-600 underline">
                  Add the first applicant →
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
