import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { PageHeader, Badge } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Employer Requests" };

export default function EmployerRequestsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Employer / Agent Requests"
        description="Inbound manpower requests from overseas employers and recruitment agents."
      />

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-card">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 min-w-[200px]">
          <Search className="size-4 text-slate-400" />
          <input type="search" placeholder="Search by company, country…" className="flex-1 text-sm outline-none placeholder:text-slate-400" />
        </div>
        <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white outline-none text-slate-700">
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="inProgress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white outline-none text-slate-700">
          <option value="">All Countries</option>
        </select>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Company</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Country</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Industry</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Biz. Reg. No.</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Role Required</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500">Workers</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Submitted</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={9} className="px-4 py-12 text-center text-sm text-slate-400">
                No employer requests yet. Requests submitted via the public form will appear here.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
