// ─── Country ──────────────────────────────────────────────────────────────────
export interface Country {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  flag: string; // emoji flag
  region: string;
  summary: string;
  popularCategories: string[];
  image: string;
  featured: boolean;
  active: boolean;
  status: "recruiting-market";
}

// ─── Job Category ─────────────────────────────────────────────────────────────
export interface JobCategory {
  id: string;
  slug: string;
  name: string;
  icon: string; // Lucide icon name
  description: string;
  agencyConfirmed: boolean;
  jobCount: number; // Active sample job listings, not vacancy headcount
  countries: string[]; // Destinations represented by active sample jobs
}

// ─── Employer ─────────────────────────────────────────────────────────────────
export interface Employer {
  id: string;
  name: string; // "International Employer – Saudi Arabia" format for demo
  country: string;
  industry: string;
  verified: boolean;
}

// ─── Job ──────────────────────────────────────────────────────────────────────
export type JobStatus = "active" | "closed" | "paused" | "draft";
export type ExperienceLevel = "no-experience" | "entry" | "mid" | "senior";
export type EmploymentType = "full-time" | "contract" | "temporary";

export interface Job {
  id: string;
  reference: string; // e.g. "A1-DEMO-001" in frontend demo data
  slug: string;
  title: string;
  country: string; // country slug
  countryName: string;
  countryFlag: string;
  city?: string;
  employer: string; // employer display name (no real names in demo)
  categorySlug: string;
  categoryName: string;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  salaryDisplay: string; // formatted display string
  vacancies: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  qualifications: string[];
  experience: ExperienceLevel;
  experienceDisplay: string;
  benefits: string[];
  accommodation: string;
  food: string;
  transportation: string;
  medical: string;
  insurance: string;
  workingHours: string;
  contractPeriod: string;
  interviewInfo?: string;
  otherConditions?: string;
  closingDate: string; // ISO date string
  publishedDate: string;
  featured: boolean;
  isNew: boolean;
  status: JobStatus;
  employmentType: EmploymentType;
  image?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

// ─── Application ──────────────────────────────────────────────────────────────
export type ApplicationStatus =
  | "APPLIED"
  | "REVIEWED"
  | "SHORTLISTED"
  | "INTERVIEW_SCHEDULED"
  | "INTERVIEWED"
  | "SELECTED"
  | "DOCUMENT_PROCESSING"
  | "MEDICAL"
  | "VISA_PROCESSING"
  | "READY_FOR_DEPARTURE"
  | "DEPARTED"
  | "REJECTED"
  | "WITHDRAWN";

export interface Application {
  id: string;
  reference: string; // e.g. "APP-240001"
  jobId: string;
  jobReference: string;
  // Personal
  fullName: string;
  nic: string;
  dateOfBirth: string;
  gender?: string;
  district: string;
  address: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  // Professional
  currentOccupation: string;
  yearsOfExperience: string;
  highestQualification: string;
  professionalQualifications?: string;
  relevantSkills?: string;
  drivingLicence?: boolean;
  overseasExperience?: string;
  // Documents
  cvFileName?: string;
  cvFileKey?: string; // private storage key
  // Consent
  privacyConsent: boolean;
  // Status
  status: ApplicationStatus;
  submittedAt: string;
  updatedAt: string;
}

// ─── Applicant ────────────────────────────────────────────────────────────────
export interface Applicant {
  id: string;
  fullName: string;
  nic: string;
  email?: string;
  phone: string;
  applications: string[]; // application IDs
  createdAt: string;
}

// ─── Testimonial ──────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g. "Electrician"
  country: string; // where they went
  content: string;
  rating: number; // 1-5
  isDemo: boolean; // clearly flag demo/placeholder testimonials
  avatar?: string;
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

// ─── Team Member ──────────────────────────────────────────────────────────────
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  isPlaceholder: boolean;
}

// ─── Contact Message ──────────────────────────────────────────────────────────
export interface ContactMessage {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  read: boolean;
}

// ─── Employer Request (Manpower) ──────────────────────────────────────────────
export interface EmployerRequest {
  id: string;
  companyName: string;
  country: string;
  website?: string;
  contactPerson: string;
  position: string;
  email: string;
  phone: string;
  industry: string;
  jobTitleRequired: string;
  numberOfWorkers: number;
  requiredExperience: string;
  qualifications?: string;
  salary?: string;
  benefits?: string;
  expectedJoiningDate?: string;
  additionalRequirements?: string;
  submittedAt: string;
  status: "pending" | "reviewed" | "inProgress" | "closed";
}

// ─── Forms ────────────────────────────────────────────────────────────────────
export interface JobSearchFilters {
  keyword?: string;
  country?: string;
  category?: string;
  currency?: string;
  salaryMin?: number;
  salaryMax?: number;
  experience?: ExperienceLevel;
  employer?: string;
  datePosted?: "7" | "30" | "90";
  featured?: boolean;
  closingSoon?: boolean;
  sortBy?: "latest" | "salary-high" | "salary-low" | "closing";
  page?: number;
}
