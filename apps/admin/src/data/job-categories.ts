import type { JobCategory } from "@/types";

// One catalog for homepage fields, category routes, and existing job filters.
// Confirmed fields follow the agency's order. Keep established IDs/slugs stable.
export const jobCategoryDefinitions: Omit<JobCategory, "jobCount" | "countries">[] = [
  {
    id: "hospitality", slug: "hospitality", name: "Hospitality", icon: "Hotel",
    description: "Explore overseas hospitality opportunities in hotel and hospital settings.",
    agencyConfirmed: true,
  },
  {
    id: "barista", slug: "barista", name: "Barista", icon: "Coffee",
    description: "Explore overseas recruitment opportunities in coffee preparation and service.",
    agencyConfirmed: true,
  },
  {
    id: "construction", slug: "construction", name: "Construction", icon: "HardHat",
    description: "Explore overseas opportunities connected with construction and related site work.",
    agencyConfirmed: true,
  },
  {
    id: "domestic-services", slug: "domestic-services", name: "Domestic Services", icon: "House",
    description: "Explore overseas recruitment opportunities in household and domestic support.",
    agencyConfirmed: true,
  },
  {
    id: "cleaning-services", slug: "cleaning-services", name: "Cleaning Services", icon: "Sparkles",
    description: "Explore overseas recruitment opportunities in cleaning and facility care.",
    agencyConfirmed: true,
  },
  {
    id: "general-helpers", slug: "general-helpers", name: "General / Unskilled Helpers", icon: "Users",
    description: "Explore overseas opportunities in general assistance and unskilled support work.",
    agencyConfirmed: true,
  },
  {
    id: "engineering", slug: "engineering", name: "Engineering", icon: "Cog",
    description: "Explore overseas opportunities across engineering and related technical work.",
    agencyConfirmed: true,
  },
  {
    id: "drivers", slug: "drivers", name: "Driving", icon: "Car",
    description: "Explore overseas recruitment opportunities connected with driving and transport work.",
    agencyConfirmed: true,
  },
  {
    id: "healthcare", slug: "healthcare", name: "Nursing & Healthcare", icon: "HeartPulse",
    description: "Explore overseas recruitment opportunities in nursing and healthcare.",
    agencyConfirmed: true,
  },
  {
    id: "garment-industry", slug: "garment-industry", name: "Garment Industry", icon: "Shirt",
    description: "Explore overseas opportunities connected with garment production and related work.",
    agencyConfirmed: true,
  },
  {
    id: "beauty-personal-care", slug: "beauty-personal-care", name: "Beauty & Personal Care", icon: "Scissors",
    description: "Explore overseas recruitment opportunities in beauty and personal care.",
    agencyConfirmed: true,
  },
  {
    id: "agriculture", slug: "agriculture", name: "Agriculture", icon: "Sprout",
    description: "Explore recruitment opportunities connected with agriculture and related field work.",
    agencyConfirmed: true,
  },
  {
    id: "finance", slug: "finance", name: "Finance", icon: "Landmark",
    description: "Explore overseas opportunities across finance and related business-support roles.",
    agencyConfirmed: true,
  },
  // Legacy categories retain their routes and job relationships. They are not
  // presented as agency-confirmed recruitment fields on the homepage.
  {
    id: "security", slug: "security", name: "Security", icon: "Shield",
    description: "Security guard and officer roles for commercial, residential, and industrial premises.",
    agencyConfirmed: false,
  },
  {
    id: "electricians", slug: "electricians", name: "Electricians", icon: "Zap",
    description: "Qualified electricians and electrical technicians for industrial and commercial projects.",
    agencyConfirmed: false,
  },
  {
    id: "mechanics", slug: "mechanics", name: "Mechanics & Auto", icon: "Wrench",
    description: "Vehicle mechanics, auto technicians, and workshop support roles.",
    agencyConfirmed: false,
  },
  {
    id: "warehouse-logistics", slug: "warehouse-logistics", name: "Warehouse & Logistics", icon: "Package",
    description: "Warehouse operators, forklift drivers, inventory and logistics support roles.",
    agencyConfirmed: false,
  },
  {
    id: "technicians", slug: "technicians", name: "Technicians", icon: "Cpu",
    description: "HVAC, plumbing, welding, and general maintenance technician roles.",
    agencyConfirmed: false,
  },
];
