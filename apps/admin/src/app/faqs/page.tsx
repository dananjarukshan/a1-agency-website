import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader, ActionButton, Badge } from "@/components/admin/ui";
import { faqs } from "@/data";

export const metadata: Metadata = { title: "FAQs" };

export default function FAQsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Frequently Asked Questions"
        description="Manage FAQs displayed on the public /faq page. Drag to reorder (after Supabase setup)."
        action={
          <ActionButton href="/admin/faqs/new">
            <Plus className="size-4" /> Add FAQ
          </ActionButton>
        }
      />

      <div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">#</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Question</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Answer (preview)</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                <td className="px-4 py-3 text-slate-400 text-xs">{faq.order}</td>
                <td className="px-4 py-3">
                  <Badge variant="blue">{faq.category}</Badge>
                </td>
                <td className="px-4 py-3 font-medium text-navy-800 max-w-xs">{faq.question}</td>
                <td className="px-4 py-3 text-slate-500 text-xs max-w-xs truncate">{faq.answer}</td>
                <td className="px-4 py-3 text-center">
                  <Link href={`/admin/faqs/${faq.id}`} className="text-xs font-medium text-navy-600 hover:underline">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
