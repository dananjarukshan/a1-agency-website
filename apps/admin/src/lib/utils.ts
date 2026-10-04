import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format date string to readable format */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Check if a job closing date is within the next 7 days */
export function isClosingSoon(closingDate: string): boolean {
  const closing = new Date(closingDate);
  const now = new Date();
  const diffTime = closing.getTime() - now.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 7;
}

/** Check if published within last 7 days */
export function isNewJob(publishedDate: string): boolean {
  const published = new Date(publishedDate);
  const now = new Date();
  const diffTime = now.getTime() - published.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
}

/** Generate WhatsApp URL with pre-filled message */
export function whatsappUrl(
  phone: string,
  message: string = "Hello, I would like to inquire about overseas employment opportunities."
): string {
  const normalizedPhone = phone.replace(/\D/g, "");
  if (normalizedPhone.length < 10) {
    return `/contact?channel=whatsapp&message=${encodeURIComponent(message)}`;
  }
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${normalizedPhone}?text=${encoded}`;
}

/** Generate WhatsApp message for a specific job */
export function jobWhatsappMessage(jobTitle: string, reference: string): string {
  return `Hello, I would like to enquire about the *${jobTitle}* position (Ref: ${reference}). Please let me know how I can apply.`;
}

/** Truncate text to a given length */
export function truncate(text: string, length: number = 120): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "…";
}

/** Slugify text */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Format salary display with commas */
export function formatSalary(amount: number): string {
  return amount.toLocaleString("en-US");
}

/** Calculate days until closing */
export function daysUntilClosing(closingDate: string): number {
  const closing = new Date(closingDate);
  const now = new Date();
  const diffTime = closing.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
