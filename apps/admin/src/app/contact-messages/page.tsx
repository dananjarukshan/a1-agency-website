import type { Metadata } from "next";
import { Search, Mail } from "lucide-react";
import { PageHeader, Badge } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Contact Messages" };

export default function ContactMessagesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Contact Messages"
        description="Inbox from the public contact form. Messages are stored when Supabase is connected."
      />

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-card">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 min-w-[200px]">
          <Search className="size-4 text-slate-400" />
          <input type="search" placeholder="Search by name, email, subject…" className="flex-1 text-sm outline-none placeholder:text-slate-400" />
        </div>
        <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white outline-none text-slate-700">
          <option value="">All Messages</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">From</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Subject</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Message (preview)</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Received</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} className="px-4 py-12 text-center text-sm text-slate-400">
                <Mail className="mx-auto mb-3 size-8 text-slate-200" />
                No messages yet. Messages submitted via the Contact Us page will appear here once Supabase is connected.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
