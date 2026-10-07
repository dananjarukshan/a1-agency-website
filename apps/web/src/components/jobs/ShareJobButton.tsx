"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./JobDetail.module.css";

interface ShareJobButtonProps {
  title: string;
  reference: string;
  className?: string;
}

export default function ShareJobButton({ title, reference, className }: ShareJobButtonProps) {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const shareJob = async () => {
    setMessage("");
    setCopied(false);
    if (timer.current) clearTimeout(timer.current);
    const url = window.location.href;
    const shareData = {
      title,
      text: `${title} — Job Ref: ${reference}`,
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setMessage("Job link copied to clipboard.");
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setMessage("Unable to copy automatically. Copy the page address from your browser to share this job.");
    }
  };

  return (
    <div>
      <button
      type="button"
      onClick={shareJob}
      className={cn(styles.secondary, className)}
      aria-label={`Share ${title}`}
    >
      {copied ? <Check size={16} aria-hidden="true" /> : <Share2 size={16} aria-hidden="true" />}
      {copied ? "Link copied" : "Share job"}
      </button>
      <p className={message ? styles.shareMessage : "sr-only"} role="status">{message}</p>
    </div>
  );
}
