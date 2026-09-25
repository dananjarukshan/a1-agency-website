/**
 * Central site configuration.
 * Replace all placeholder values with actual agency details before going live.
 */
export const siteConfig = {
  /** The public build intentionally uses demo jobs and placeholder business details. */
  contentMode: "demo",
  /** Confirmed public agency name */
  name: "A-One Foreign Employment Agency",
  /** Short display name */
  shortName: "A-One Agency",
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
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+94761550550",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+94 76 155 0550",
  phoneHref: process.env.NEXT_PUBLIC_PHONE_HREF ?? "tel:+94761550550",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "", // Digits only
  whatsappDisplay: process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? "",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "aonefea3785@gmail.com",
  emailHref:
    process.env.NEXT_PUBLIC_EMAIL_HREF ?? "mailto:aonefea3785@gmail.com",
  emailRecruitment:
    process.env.NEXT_PUBLIC_RECRUITMENT_EMAIL ?? "aonefea3785@gmail.com",
  emailEmployers:
    process.env.NEXT_PUBLIC_EMPLOYER_EMAIL ?? "aonefea3785@gmail.com",

  // ─── Office ───────────────────────────────────────────────────────────────
  address: {
    line1: "No. 31, 2nd Floor",
    line2: "Sirimavo Bandaranayaka Mawatha",
    city: "Kandy",
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
    facebook:
      process.env.NEXT_PUBLIC_FACEBOOK_URL ??
      "https://www.facebook.com/share/1BykCQvv6U/",
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
      "https://www.instagram.com/a_one_employment_agency?utm_source=qr&stkn=MXRnZHRkeWtlYnluNg==",
    tiktok:
      process.env.NEXT_PUBLIC_TIKTOK_URL ??
      "https://www.tiktok.com/@a.one.agency?_r=1&_t=ZS-99v29F9qh4X",
    youtube:
      process.env.NEXT_PUBLIC_YOUTUBE_URL ??
      "https://youtube.com/@aoneforeignemploymentagency?si=OoWx7V0GwA5_G5x2",
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL ??
      "https://www.linkedin.com/company/a-one-foreign-employment-agency/",
  },

  // ─── Legal ────────────────────────────────────────────────────────────────
  legalName: "[REGISTERED AGENCY NAME TO BE PROVIDED]",
  registrationNumber: "[REGISTRATION NUMBER TO BE PROVIDED]",

  // ─── Analytics ────────────────────────────────────────────────────────────
  /** Google Analytics Measurement ID – set via environment variable */
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
} as const;

export type SiteConfig = typeof siteConfig;
