export default function JobsLoading() {
  return (
    <div className="container-padded py-12" aria-label="Loading job vacancies" aria-busy="true">
      <div className="mb-8 h-8 w-48 animate-pulse rounded bg-slate-200" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />
            <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-slate-100" />
            <div className="mt-7 grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((__, itemIndex) => (
                <div key={itemIndex} className="h-4 animate-pulse rounded bg-slate-100" />
              ))}
            </div>
            <div className="mt-7 h-11 animate-pulse rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
