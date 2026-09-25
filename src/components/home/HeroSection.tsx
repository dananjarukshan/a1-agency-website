"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronDown,
  CircleCheck,
  MapPin,
  MessageCircle,
  Search,
} from "lucide-react";
import { countries, jobCategories, jobs } from "@/data";

export default function HeroSection() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState("");

  const activeJobs = jobs.filter((job) => job.status === "active");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("q", keyword.trim());
    if (country) params.set("country", country);
    router.push(`/jobs${params.size ? `?${params.toString()}` : ""}`);
  };

  return (
    <>
      <section
        className="relative isolate overflow-hidden bg-brand-black"
        aria-labelledby="home-hero-heading"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-[62%_center] opacity-70 lg:object-center lg:opacity-90"
        >
          <source src="/videos/homepage-hero-loop.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#000000_0%,rgba(0,0,0,0.97)_38%,rgba(0,0,0,0.72)_62%,rgba(0,0,0,0.2)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(0,0,0,0.78),transparent_46%)] lg:hidden"
          aria-hidden="true"
        />

        <div className="container-padded py-16 sm:py-20 lg:py-24 xl:py-28">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              <CircleCheck size={14} className="text-teal-300" aria-hidden="true" />
              Sri Lanka-focused international recruitment
            </div>

            <h1
              id="home-hero-heading"
              className="max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl"
            >
              Your next career move can go further.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
              Explore overseas roles created for Sri Lankan talent, understand every step, and
              apply through one clear, candidate-friendly process.
            </p>

            <div className="mt-8 flex flex-col gap-3 min-[430px]:flex-row">
              <Link href="/jobs" className="btn btn-teal btn-lg">
                Explore opportunities
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="btn btn-lg border-white/35 bg-white/10 text-white hover:border-white hover:bg-white hover:text-brand-black"
              >
                <MessageCircle size={17} aria-hidden="true" />
                Talk to our team
              </Link>
            </div>

            <div className="mt-10 border-l-2 border-teal-400 pl-4 text-sm text-slate-300">
              Clear role details. Guided applications. No job or visa guarantees.
            </div>
          </div>
        </div>

        <div className="container-padded relative pb-8 lg:pb-10">
          <form
            onSubmit={handleSearch}
            className="grid gap-2 rounded-xl border border-white/15 bg-white p-2.5 shadow-[0_22px_70px_-28px_rgba(0,0,0,0.65)] sm:grid-cols-[minmax(0,1fr)_220px_auto]"
            role="search"
            aria-label="Search overseas jobs"
          >
            <label className="flex min-h-12 items-center gap-3 rounded-lg bg-slate-50 px-3.5">
              <Search size={18} className="shrink-0 text-slate-400" aria-hidden="true" />
              <span className="sr-only">Job title or keyword</span>
              <input
                type="search"
                placeholder="Job title, trade, or skill"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </label>

            <label className="flex min-h-12 items-center gap-3 rounded-lg bg-slate-50 px-3.5">
              <MapPin size={18} className="shrink-0 text-slate-400" aria-hidden="true" />
              <span className="sr-only">Destination country</span>
              <span className="relative min-w-0 flex-1">
                <select
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                  className="w-full appearance-none bg-transparent py-2 pr-6 text-sm text-slate-800 outline-none"
                >
                  <option value="">All destinations</option>
                  {countries.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
              </span>
            </label>

            <button type="submit" className="btn btn-primary min-h-12 px-7">
              <Search size={16} aria-hidden="true" />
              Search jobs
            </button>
          </form>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-300">
            <span className="font-semibold text-white">Popular searches:</span>
            {["Driver", "Electrician", "Hospitality", "Welder"].map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => router.push(`/jobs?q=${encodeURIComponent(term)}`)}
                className="underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white" aria-label="Website overview">
        <div className="container-padded grid grid-cols-2 divide-x divide-slate-200 py-6 sm:grid-cols-4">
          {[
            { value: `${activeJobs.length}`, label: "Sample vacancies", icon: BriefcaseBusiness },
            { value: `${countries.length}`, label: "Destinations", icon: MapPin },
            { value: `${jobCategories.length}`, label: "Career categories", icon: Search },
            { value: "10 steps", label: "Guided journey", icon: CircleCheck },
          ].map((item) => (
            <div key={item.label} className="px-3 py-2 text-center sm:px-5">
              <item.icon size={17} className="mx-auto mb-2 text-teal-600" aria-hidden="true" />
              <p className="text-xl font-bold tracking-tight text-navy-900">{item.value}</p>
              <p className="mt-0.5 text-xs text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
