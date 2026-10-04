import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Image as ImageIcon, Video, Upload } from "lucide-react";
import { PageHeader, ActionButton, Badge } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Media Gallery" };

export default function MediaPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Media Gallery"
        description="Upload and manage photos and videos of deployments, events, and agency activity."
        action={
          <ActionButton href="/admin/media/upload">
            <Upload className="size-4" /> Upload Media
          </ActionButton>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Photos", value: 0, icon: ImageIcon },
          { label: "Total Videos", value: 0, icon: Video },
          { label: "Published", value: 0, icon: null },
          { label: "Featured", value: 0, icon: null },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-card text-center">
            <p className="text-2xl font-bold text-navy-900">{s.value}</p>
            <p className="mt-1 text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-card">
        <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white outline-none text-slate-700">
          <option value="">All Types</option>
          <option value="photo">Photo</option>
          <option value="video">Video</option>
        </select>
        <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white outline-none text-slate-700">
          <option value="">All Categories</option>
          <option value="deployment">Deployment</option>
          <option value="event">Event</option>
          <option value="office">Office</option>
          <option value="interview">Interview</option>
          <option value="other">Other</option>
        </select>
        <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white outline-none text-slate-700">
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Empty state grid */}
      <div className="rounded-xl border-2 border-dashed border-slate-300 p-16 text-center">
        <Upload className="mx-auto mb-3 size-10 text-slate-300" />
        <p className="text-sm font-medium text-slate-500">No media uploaded yet</p>
        <p className="mt-1 text-xs text-slate-400">Upload photos and videos to showcase agency activity</p>
        <Link
          href="/admin/media/upload"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-navy-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-navy-700"
        >
          <Plus className="size-4" /> Upload First Media
        </Link>
      </div>
    </div>
  );
}
