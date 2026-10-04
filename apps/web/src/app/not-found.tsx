import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-padded flex min-h-[65vh] items-center justify-center py-16 text-center">
      <div className="max-w-lg">
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">404</span>
        <h1 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">Page not found</h1>
        <p className="mt-4 text-slate-600">
          The page may have moved, or the vacancy link may no longer be available.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 min-[390px]:flex-row">
          <Link href="/jobs" className="btn btn-primary">
            <Search size={16} aria-hidden="true" /> Browse jobs
          </Link>
          <Link href="/" className="btn btn-secondary">
            <ArrowLeft size={16} aria-hidden="true" /> Return home
          </Link>
        </div>
      </div>
    </div>
  );
}
