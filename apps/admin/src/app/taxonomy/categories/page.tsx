import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader, ActionButton, Badge } from "@/components/admin/ui";
import { jobCategories } from "@/data";

export const metadata: Metadata = { title: "Job Categories" };

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Job Categories"
        description="Manage the job category taxonomy used across vacancies and country pages."
        action={
          <ActionButton href="/admin/taxonomy/categories/new">
            <Plus className="size-4" /> Add Category
          </ActionButton>
        }
      />

      <div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Slug</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Icon</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Description</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500">Active Jobs</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500">Confirmed</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobCategories.map((cat) => (
              <tr key={cat.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                <td className="px-4 py-3 font-medium text-navy-800">{cat.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{cat.slug}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{cat.icon}</td>
                <td className="px-4 py-3 text-slate-600 max-w-xs truncate">{cat.description}</td>
                <td className="px-4 py-3 text-center text-slate-700">{cat.jobCount}</td>
                <td className="px-4 py-3 text-center">
                  <Badge variant={cat.agencyConfirmed ? "green" : "slate"}>
                    {cat.agencyConfirmed ? "Yes" : "No"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-center">
                  <Link href={`/admin/taxonomy/categories/${cat.id}`} className="text-xs font-medium text-navy-600 hover:underline">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
