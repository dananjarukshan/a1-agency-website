import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader, ActionButton, Badge } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Announcements" };

export default function AnnouncementsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Announcements / Notice Board"
        description="Broadcast urgent alerts and notices to candidates and employers on the public site."
        action={
          <ActionButton href="/admin/announcements/new">
            <Plus className="size-4" /> New Announcement
          </ActionButton>
        }
      />

      <div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Title</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Priority</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Audience</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Published</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Expires</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500">Active</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} className="px-4 py-12 text-center text-sm text-slate-400">
                No announcements yet.{" "}
                <Link href="/admin/announcements/new" className="font-medium text-navy-600 underline">
                  Create one →
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
