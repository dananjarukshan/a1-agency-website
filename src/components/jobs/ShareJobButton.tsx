"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareJobButtonProps {
  title: string;
  reference: string;
  className?: string;
}

export default function ShareJobButton({ title, reference, className }: ShareJobButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareJob = async () => {
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

    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={shareJob}
      className={cn("btn btn-secondary justify-center", className)}
      aria-label={`Share ${title}`}
    >
      {copied ? <Check size={16} aria-hidden="true" /> : <Share2 size={16} aria-hidden="true" />}
      {copied ? "Link copied" : "Share job"}
    </button>
  );
}
