import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader, ActionButton, Badge } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Events Management"
        description="Create and manage recruitment drives, walk-in interview days, and company events."
        action={
          <ActionButton href="/admin/events/new">
            <Plus className="size-4" /> New Event
          </ActionButton>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-full rounded-xl border-2 border-dashed border-slate-300 p-16 text-center">
          <p className="text-sm font-medium text-slate-500">No events yet</p>
          <p className="mt-1 text-xs text-slate-400">Add recruitment drives, interview days and agency events</p>
          <Link
            href="/admin/events/new"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-navy-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-navy-700"
          >
            <Plus className="size-4" /> Create First Event
          </Link>
        </div>
      </div>
    </div>
  );
}
