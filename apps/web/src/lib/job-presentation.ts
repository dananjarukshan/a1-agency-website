import type { Job } from "@/types";

/** All current public salaries are explicit sample LKR amounts, not FX conversions. */
export function formatJobSalary(job: Pick<Job, "salaryMin" | "salaryMax" | "currency">): string {
  const number = (value: number) => value.toLocaleString("en-US");
  const { salaryMin: min, salaryMax: max, currency } = job;
  if (min !== undefined && max !== undefined && min !== max) return `${currency} ${number(min)} – ${number(max)} / month`;
  if (min !== undefined) return `${currency} ${number(min)}${max === undefined ? "+" : ""} / month`;
  if (max !== undefined) return `Up to ${currency} ${number(max)} / month`;
  return "Salary to be confirmed";
}

export function formatJobAge(job: Pick<Job, "ageMin" | "ageMax">): string {
  if (job.ageMin !== undefined && job.ageMax !== undefined) return `Age ${job.ageMin}–${job.ageMax} years`;
  if (job.ageMin !== undefined) return `Age ${job.ageMin}+ years`;
  if (job.ageMax !== undefined) return `Age up to ${job.ageMax} years`;
  return "Age criteria to be confirmed";
}

/** Treat the closing date as an inclusive calendar day in the agency's timezone. */
export function jobClosingState(closingDate: string, now = new Date()) {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Colombo", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  const days = Math.round((Date.parse(`${closingDate}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86400000);
  return { closed: days < 0, closingSoon: days >= 0 && days <= 7 };
}
