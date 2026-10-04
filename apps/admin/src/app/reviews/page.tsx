import type { Metadata } from "next";
import Link from "next/link";
import { Plus, CheckCircle2, XCircle } from "lucide-react";
import { PageHeader, ActionButton, Badge } from "@/components/admin/ui";
import { recruitmentExperiences } from "@/data";

export const metadata: Metadata = { title: "Reviews & Testimonials" };

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reviews & Testimonials"
        description="Manage candidate and employer feedback. Only verified reviews appear on the public site."
        action={
          <ActionButton href="/admin/reviews/new">
            <Plus className="size-4" /> Add Review
          </ActionButton>
        }
      />

      <div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Name / Company</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Role / Country</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Review (preview)</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500">Verified</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500">Demo</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recruitmentExperiences.map((r) => (
              <tr key={r.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                <td className="px-4 py-3">
                  <Badge variant={r.type === "candidate" ? "blue" : "amber"}>
                    {r.type}
                  </Badge>
                </td>
                <td className="px-4 py-3 font-medium text-navy-800">
                  {r.type === "candidate" ? r.name : r.company}
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs">
                  {r.type === "candidate" ? `${r.role ?? "—"} · ${r.destination ?? ""}` : r.country ?? "—"}
                </td>
                <td className="px-4 py-3 text-slate-600 max-w-xs truncate text-xs">{r.review}</td>
                <td className="px-4 py-3 text-center">
                  {r.verified
                    ? <CheckCircle2 className="mx-auto size-4 text-teal-500" />
                    : <XCircle className="mx-auto size-4 text-slate-300" />
                  }
                </td>
                <td className="px-4 py-3 text-center">
                  {r.isDemo && <Badge variant="yellow">Demo</Badge>}
                </td>
                <td className="px-4 py-3 text-center">
                  <Link href={`/admin/reviews/${r.id}`} className="text-xs font-medium text-navy-600 hover:underline">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
