import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader, ActionButton } from "@/components/admin/ui";
import { countries } from "@/data";

export const metadata: Metadata = { title: "Destination Countries" };

export default function CountriesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Destination Countries"
        description="Manage destination country pages shown on the public site."
        action={
          <ActionButton href="/admin/taxonomy/countries/new">
            <Plus className="size-4" /> Add Country
          </ActionButton>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {countries.map((c) => (
          <div key={c.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-card">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{c.flag}</span>
              <div>
                <p className="font-medium text-navy-800">{c.name}</p>
                <p className="text-xs text-slate-400">{c.region}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`inline-block h-2 w-2 rounded-full ${c.active ? "bg-teal-400" : "bg-slate-300"}`} />
              <Link href={`/admin/taxonomy/countries/${c.id}`} className="text-xs font-medium text-navy-600 hover:underline">
                Edit
              </Link>
            </div>
          </div>
        ))}
        {countries.length === 0 && (
          <p className="col-span-full text-center py-12 text-sm text-slate-400">
            No countries yet. <Link href="/admin/taxonomy/countries/new" className="text-navy-600 underline">Add one →</Link>
          </p>
        )}
      </div>
    </div>
  );
}
