"use client";

import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container-padded flex min-h-[65vh] items-center justify-center py-16 text-center">
      <div className="max-w-lg">
        <AlertTriangle size={38} className="mx-auto text-amber-600" aria-hidden="true" />
        <h1 className="mt-4 text-3xl font-bold text-navy-900">Something went wrong</h1>
        <p className="mt-3 text-slate-600">
          We could not load this page. Try again, or return to the jobs directory.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 min-[390px]:flex-row">
          <button type="button" onClick={reset} className="btn btn-primary">
            <RotateCcw size={16} aria-hidden="true" /> Try again
          </button>
          <Link href="/jobs" className="btn btn-secondary">Browse jobs</Link>
        </div>
      </div>
    </div>
  );
}
