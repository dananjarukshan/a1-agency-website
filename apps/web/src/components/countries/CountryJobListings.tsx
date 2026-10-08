"use client";

import { useSyncExternalStore } from "react";
import type { Job } from "@/types";
import DirectoryJobCard from "@/components/jobs/DirectoryJobCard";
import styles from "./Countries.module.css";

function subscribeToClock(notify: () => void) {
  const timer = window.setInterval(notify, 60_000);
  window.addEventListener("focus", notify);
  document.addEventListener("visibilitychange", notify);
  return () => {
    window.clearInterval(timer);
    window.removeEventListener("focus", notify);
    document.removeEventListener("visibilitychange", notify);
  };
}
const currentMinute = () => Math.floor(Date.now() / 60_000);
const serverMinute = () => null;

/** Keep country pages static without baking a stale Open/Closed label into the build. */
export default function CountryJobListings({ jobs }: { jobs: Job[] }) {
  const minute = useSyncExternalStore(subscribeToClock, currentMinute, serverMinute);
  const now = minute === null ? undefined : new Date(minute * 60_000);
  return <div className={styles.jobGrid}>{jobs.map((job) => <DirectoryJobCard key={job.id} job={job} now={now} />)}</div>;
}
