/**
 * Central site configuration.
 * Replace all placeholder values with actual agency details before going live.
 */
export const siteConfig = {
  /** The public build intentionally uses demo jobs and placeholder business details. */
  contentMode: "demo",
  /** Full legal agency name */
  name: "A-One Foreign Employment Agency",
  /** Short display name */
  shortName: "A-One Foreign Employment Agency",
  /** One-line tagline */
  tagline: "Your Trusted Path to Global Career Opportunities",
  /** Brief description for SEO meta */
  description:
    "A Sri Lanka-focused international recruitment platform connecting skilled professionals with overseas career opportunities and manpower services.",
  /** Base URL – update for production */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  brand: {
    logoText: "A1",
    logo: "[LOGO ASSET TO BE PROVIDED]",
    primaryColor: "#0b1f3a",
    secondaryColor: "#1f5aa6",
    accentColor: "#0f8f83",
  },

  // ─── Contact Details ──────────────────────────────────────────────────────
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+94 XX XXX XXXX", // Replace with actual phone
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "", // Digits only
  whatsappDisplay: process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? "+94 XX XXX XXXX",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "agency-email@example.com", // Placeholder domain
  emailRecruitment:
    process.env.NEXT_PUBLIC_RECRUITMENT_EMAIL ?? "recruitment@example.com",
  emailEmployers:
    process.env.NEXT_PUBLIC_EMPLOYER_EMAIL ?? "employers@example.com",

  // ─── Office ───────────────────────────────────────────────────────────────
  address: {
    street: "[Street Address]", // Replace with actual address
    city: "[City]",
    province: "[Province]",
    postalCode: "[Postal Code]",
    country: "Sri Lanka",
  },
  officeHours: "Monday – Friday: 8:30 AM – 5:30 PM | Saturday: 9:00 AM – 1:00 PM",

  // ─── Licensing ────────────────────────────────────────────────────────────
  /** SLBFE = Sri Lanka Bureau of Foreign Employment */
  slbfeLicenseNumber: "[SLBFE LICENCE NUMBER TO BE PROVIDED]",
  credentialsConfirmed: false,
  credentialStatusLabel: "Agency credentials pending client confirmation",

  // ─── Social Media ─────────────────────────────────────────────────────────
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
  },

  // ─── Legal ────────────────────────────────────────────────────────────────
  legalName: "[REGISTERED AGENCY NAME TO BE PROVIDED]",
  registrationNumber: "[REGISTRATION NUMBER TO BE PROVIDED]",

  // ─── Analytics ────────────────────────────────────────────────────────────
  /** Google Analytics Measurement ID – set via environment variable */
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
} as const;

export type SiteConfig = typeof siteConfig;
