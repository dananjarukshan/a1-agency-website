import Link from "next/link";
import { Search } from "lucide-react";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = "No Results Found",
  description = "We couldn't find what you're looking for. Please try a different search.",
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
      <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center mb-4">
        <Search size={24} className="text-slate-400" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-bold text-[#0f1f3d] mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm leading-relaxed mb-6">{description}</p>
      {actionLabel && (
        <>
          {actionHref ? (
            <Link href={actionHref} className="btn btn-primary btn-sm">
              {actionLabel}
            </Link>
          ) : onAction ? (
            <button onClick={onAction} className="btn btn-primary btn-sm">
              {actionLabel}
            </button>
          ) : null}
        </>
      )}
    </div>
  );
}

export default EmptyState;
