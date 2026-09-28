import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { jobs, countries, jobCategories } from "@/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Static routes
  const staticRoutes = [
    "",
    "/jobs",
    "/opportunities",
    "/countries",
    "/job-categories",
    "/about",
    "/how-it-works",
    "/employers",
    "/employers/request-manpower",
    "/faq",
    "/contact",
    "/privacy-policy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic job routes
  const jobRoutes = jobs.map((job) => ({
    url: `${baseUrl}/jobs/${job.slug}`,
    lastModified: new Date(job.updatedAt).toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Dynamic country routes
  const countryRoutes = countries.map((c) => ({
    url: `${baseUrl}/countries/${c.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic category routes
  const categoryRoutes = jobCategories.map((cat) => ({
    url: `${baseUrl}/job-categories/${cat.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...jobRoutes, ...countryRoutes, ...categoryRoutes];
}
