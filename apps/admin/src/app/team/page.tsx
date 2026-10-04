import type { Metadata } from "next";
import Link from "next/link";
import { Plus, User } from "lucide-react";
import { PageHeader, ActionButton, Badge } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Team Members" };

// Placeholder — connect to Supabase after setup
const teamMembers: { id: string; name: string; role: string; isPlaceholder: boolean }[] = [];

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Members"
        description="Manage staff profiles displayed on the About Us page."
        action={
          <ActionButton href="/admin/team/new">
            <Plus className="size-4" /> Add Team Member
          </ActionButton>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.length === 0 ? (
          <div className="col-span-full rounded-xl border-2 border-dashed border-slate-300 p-16 text-center">
            <User className="mx-auto mb-3 size-10 text-slate-300" />
            <p className="text-sm font-medium text-slate-500">No team members yet</p>
            <p className="mt-1 text-xs text-slate-400">Add staff profiles to display on the About Us page</p>
            <Link
              href="/admin/team/new"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-navy-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-navy-700"
            >
              <Plus className="size-4" /> Add First Member
            </Link>
          </div>
        ) : (
          teamMembers.map((m) => (
            <div key={m.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-100">
                  <User className="size-5 text-navy-600" />
                </div>
                <div>
                  <p className="font-medium text-navy-800">{m.name}</p>
                  <p className="text-xs text-slate-400">{m.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {m.isPlaceholder && <Badge variant="yellow">Placeholder</Badge>}
                <Link href={`/admin/team/${m.id}`} className="text-xs font-medium text-navy-600 hover:underline">Edit</Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
