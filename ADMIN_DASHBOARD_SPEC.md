# A-One Agency — Admin Dashboard Specification

> **Document Version:** 1.0.0  
> **Last Updated:** 2026-10-03  
> **Status:** Draft — Awaiting Team Review  
> **Repository:** `a1-agency-website`

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Architecture & Security](#2-architecture--security)
3. [Data Models & Form Schemas](#3-data-models--form-schemas)
   - 3.1 [Job Vacancies](#31-job-vacancies)
   - 3.2 [Employer / Agent Requests](#32-employer--agent-requests)
   - 3.3 [Job Applicants](#33-job-applicants)
   - 3.4 [Destination Countries (Taxonomy)](#34-destination-countries-taxonomy)
   - 3.5 [Job Categories (Taxonomy)](#35-job-categories-taxonomy)
   - 3.6 [Reviews & Testimonials](#36-reviews--testimonials)
   - 3.7 [Media Gallery](#37-media-gallery)
   - 3.8 [Announcements / Notice Board](#38-announcements--notice-board)
   - 3.9 [Events Management](#39-events-management)
4. [UI/UX Strategy](#4-uiux-strategy)
5. [Implementation Checklist](#5-implementation-checklist)

---

## 1. Executive Summary

This document defines the architectural blueprint for a **secure, server-rendered administrative dashboard** for the A-One Foreign Employment Agency website. The dashboard is an internal-only tool that allows agency staff to manage all dynamic content powering the public-facing site — from job listings and applicant records to media galleries and announcements.

### Purpose

| Concern | Details |
|---|---|
| **Who uses it** | A-One agency administrators and authorised staff only |
| **What it controls** | Jobs, applicants, employer requests, taxonomy, reviews, media, notices, events |
| **Visibility** | Completely hidden from public crawlers and unauthenticated users |
| **Data flow** | Server Actions → Supabase (PostgreSQL) + Supabase Storage (object files) |

### Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js App Router | 16.3.3 |
| Language | TypeScript (strict) | ^5 |
| Styling | Tailwind CSS v4 + CSS Modules | ^4 |
| UI Primitives | Radix UI | various (see `package.json`) |
| Icons | `lucide-react` | ^1.34.0 |
| Forms | React Hook Form + `@hookform/resolvers` | ^7.86.0 + ^5.9.1 |
| Validation | Zod | ^4.4.3 |
| Class Utilities | `clsx` + `tailwind-merge` (via `cn()` in `src/lib/utils.ts`) | ^2.1.1 / ^3.6.0 |
| Backend | Supabase (PostgreSQL + Storage) | TBD |
| Auth | Supabase Auth (JWT sessions via `@supabase/ssr`) | TBD |

---

## 2. Architecture & Security

### 2.1 Route Group Structure

The admin dashboard is isolated in a **Next.js Route Group** that shares no layout with the public site. This prevents the public `Header`, `Footer`, and `WhatsAppButton` from rendering inside the dashboard.

```
src/app/
├── (public)/                      # Existing public site routes (implicit group)
│   ├── layout.tsx                 # Wraps Header + Footer + WhatsAppButton
│   ├── page.tsx                   # Homepage
│   ├── jobs/
│   ├── countries/
│   └── ...
│
└── (admin)/                       # NEW: Admin Route Group
    ├── layout.tsx                 # Admin shell layout (sidebar + topbar, NO public header/footer)
    ├── admin/
    │   ├── login/
    │   │   └── page.tsx           # Public login page: GET /admin/login
    │   ├── dashboard/
    │   │   └── page.tsx           # Overview stats: GET /admin/dashboard
    │   ├── jobs/
    │   │   ├── page.tsx           # Jobs list table: GET /admin/jobs
    │   │   ├── new/
    │   │   │   └── page.tsx       # Create job form: GET /admin/jobs/new
    │   │   └── [id]/
    │   │       └── page.tsx       # Edit job form: GET /admin/jobs/[id]
    │   ├── applicants/
    │   │   ├── page.tsx           # Applicant list + filters
    │   │   └── [id]/
    │   │       └── page.tsx       # Applicant detail & status management
    │   ├── employer-requests/
    │   │   ├── page.tsx
    │   │   └── [id]/
    │   │       └── page.tsx
    │   ├── taxonomy/
    │   │   ├── countries/
    │   │   │   ├── page.tsx
    │   │   │   └── [id]/page.tsx
    │   │   └── categories/
    │   │       ├── page.tsx
    │   │       └── [id]/page.tsx
    │   ├── reviews/
    │   │   ├── page.tsx
    │   │   └── [id]/page.tsx
    │   ├── media/
    │   │   └── page.tsx
    │   ├── announcements/
    │   │   ├── page.tsx
    │   │   └── [id]/page.tsx
    │   └── events/
    │       ├── page.tsx
    │       └── [id]/page.tsx
```

> **Note on existing public routes:** The existing `src/app/` routes (`/jobs`, `/countries`, etc.) should be moved into `src/app/(public)/` as part of Phase 1 to cleanly separate the two route groups. The `(admin)/layout.tsx` must **not** import the public `Header` or `Footer`.

### 2.2 Middleware — Protecting Admin Routes

A single `src/middleware.ts` file at the project root intercepts all requests to `/admin/*` and enforces authentication.

**Middleware Logic (pseudocode):**

```
matcher: ['/admin/:path*']  // applies only to admin routes

ON REQUEST to /admin/login:
  - If user session is VALID → redirect to /admin/dashboard
  - If user session is INVALID → allow through (render login page)

ON REQUEST to /admin/* (any other page):
  - Read session cookie via Supabase SSR client
  - If session is VALID and user role is 'admin' → allow through
  - If session is INVALID or role is not 'admin' → redirect to /admin/login?from={pathname}
```

**Key Middleware Rules:**
- The middleware must be **Edge-compatible** — use `@supabase/ssr`'s `createServerClient` with the `Request`/`Response` API, not Node.js APIs.
- Do **not** protect `/admin/login` itself (the matcher should exclude it or handle it with a conditional).
- The `from` query param enables post-login redirect to the originally requested page.
- Session cookies must be refreshed in the middleware response to prevent stale sessions.

### 2.3 Authentication Flow

```
[Login Page /admin/login]
        |
        | POST Server Action (email + password)
        v
[Supabase Auth signInWithPassword()]
        |
        | Sets secure HttpOnly session cookie
        v
[redirect('/admin/dashboard')]
        |
        | On every subsequent request to /admin/*
        v
[Edge Middleware] → validates cookie → allow or redirect to /admin/login
```

**Login Page Requirements:**
- Route: `/admin/login`
- Fields: `email` (text input) + `password` (password input)
- Zod validation: email format required, password min 8 chars
- Uses a **Server Action** — no client-side `fetch` to an API route
- On invalid credentials: display inline error message from Supabase
- On success: `redirect('/admin/dashboard')` from within the Server Action
- Must **not** expose any session tokens in the client-side JavaScript bundle

**Session Management:**
- Use `@supabase/ssr` for cookie-based session handling (compatible with Next.js App Router + Edge Middleware)
- Sessions are stored in a **secure, HttpOnly, SameSite=Lax** cookie
- Admin user records in Supabase must have `role: 'admin'` in their user metadata; the middleware verifies this claim
- Logout is a Server Action that calls `supabase.auth.signOut()` and clears the cookie

### 2.4 Admin Layout Shell (`(admin)/layout.tsx`)

The admin layout provides a persistent UI shell. It must:
- **Not** import `Header`, `Footer`, or `WhatsAppButton` from the public site
- Render a **collapsible sidebar navigation** and a **top bar** (breadcrumbs + user avatar + logout button)
- Be a **Server Component** — reads the session server-side; sidebar nav items are static
- Wrap content in a `<main>` with appropriate `id` and `tabIndex` for accessibility

### 2.5 Security Hardening Checklist

- [ ] All admin Server Actions must validate the session at the top of the function (do not rely solely on middleware)
- [ ] File upload Server Actions must validate MIME type and file size server-side, not only client-side
- [ ] All database queries use parameterised statements via Supabase client (no raw SQL string concatenation)
- [ ] Rate-limit login attempts (Supabase Auth handles this by default; verify it is not disabled)
- [ ] Add `noindex, nofollow` meta tag to all `(admin)` pages
- [ ] Ensure `/admin/*` routes are excluded from `sitemap.ts` (currently done; maintain this)

---

## 3. Data Models & Form Schemas

The following tables define the complete data model for each admin-managed entity. Each table includes:
- **Field Name** — camelCase TypeScript property
- **Data Type** — TypeScript/Zod primitive
- **DB Column** — snake_case PostgreSQL column name
- **UI Input Component** — the specific Radix UI or HTML element to use
- **Validation Rules** — Zod schema requirements

All forms use **React Hook Form** with `zodResolver`. All Server Actions re-validate with the same Zod schema server-side before writing to the database.

---

### 3.1 Job Vacancies

**Extends the existing `Job` type in `src/types/index.ts`** with mandatory SLBFE and demographic fields.

**TypeScript Type Extension:**
```typescript
// Additions to the existing Job interface — do NOT duplicate existing fields
interface JobAdminExtensions {
  slbfeApprovalNumber: string;
  ageMin: number;
  ageMax: number;
  genderPreference: 'male' | 'female' | 'any';
}
type AdminJob = Job & JobAdminExtensions;
```

#### 3.1.1 Form Schema Table

| Field Name | Data Type | DB Column | UI Input Component | Validation Rules |
|---|---|---|---|---|
| `title` | `string` | `title` | Text Input | Required, min 3 chars, max 120 chars |
| `slug` | `string` | `slug` | Text Input (auto-generated, editable) | Required, lowercase alphanumeric + hyphens only, unique in DB |
| `reference` | `string` | `reference` | Text Input (auto-generated) | Required, matches `/^A1-[A-Z0-9-]+$/` pattern |
| `country` | `string` (slug) | `country_slug` | Radix `Select` (populated from `countries` table) | Required |
| `city` | `string` | `city` | Text Input | Optional, max 80 chars |
| `employerName` | `string` | `employer_name` | Text Input | Required, min 2 chars, max 120 chars |
| `categorySlug` | `string` | `category_slug` | Radix `Select` (populated from `job_categories` table) | Required |
| `salaryMin` | `number` | `salary_min` | Number Input | Optional, min 0, must be ≤ `salaryMax` if both provided |
| `salaryMax` | `number` | `salary_max` | Number Input | Optional, min 0, must be ≥ `salaryMin` if both provided |
| `currency` | `string` | `currency` | Radix `Select` (SAR, AED, QAR, KWD, BHD, OMR, USD, LKR) | Required |
| `vacancies` | `number` | `vacancies` | Number Input | Required, integer, min 1, max 9999 |
| `description` | `string` | `description` | `<textarea>` (multiline, min-h: 120px) | Required, min 20 chars, max 5000 chars |
| `responsibilities` | `string[]` | `responsibilities` | Dynamic list input (add/remove text rows) | Required, at least 1 item, each item min 5 chars |
| `requirements` | `string[]` | `requirements` | Dynamic list input | Optional, each item min 5 chars |
| `qualifications` | `string[]` | `qualifications` | Dynamic list input | Optional |
| `benefits` | `string[]` | `benefits` | Dynamic list input (with preset suggestions) | Optional |
| `accommodation` | `string` | `accommodation` | Radix `Select` (Provided / Not Provided / Allowance) | Required |
| `food` | `string` | `food` | Radix `Select` (Provided / Not Provided / Allowance) | Required |
| `transportation` | `string` | `transportation` | Radix `Select` (Provided / Not Provided / Own) | Required |
| `medical` | `string` | `medical` | Radix `Select` (Provided / Not Provided) | Required |
| `insurance` | `string` | `insurance` | Radix `Select` (Provided / Not Provided) | Required |
| `workingHours` | `string` | `working_hours` | Text Input (e.g., "8 hours/day, 6 days/week") | Required, max 100 chars |
| `contractPeriod` | `string` | `contract_period` | Text Input (e.g., "2 years renewable") | Required, max 80 chars |
| `experience` | `ExperienceLevel` | `experience` | Radix `Select` (no-experience, entry, mid, senior) | Required |
| `employmentType` | `EmploymentType` | `employment_type` | Radix `Select` (full-time, contract, temporary) | Required |
| `closingDate` | `string` (ISO date) | `closing_date` | Date Picker (`<input type="date">` or Radix Dialog-based) | Required, must be a future date |
| `status` | `JobStatus` | `status` | Radix `Select` (draft, active, paused, closed) | Required, default: `'draft'` |
| `featured` | `boolean` | `featured` | Radix `Checkbox` | Optional, default: `false` |
| `interviewInfo` | `string` | `interview_info` | `<textarea>` | Optional, max 1000 chars |
| `otherConditions` | `string` | `other_conditions` | `<textarea>` | Optional, max 1000 chars |
| `image` | `string` (URL) | `image_url` | File Dropzone → Supabase Storage URL | Optional, JPEG/PNG/WebP only, max 2 MB |
| `tags` | `string[]` | `tags` | Multi-tag input (type and press Enter) | Optional, max 10 tags, each max 30 chars |
| **`slbfeApprovalNumber`** | `string` | `slbfe_approval_number` | Text Input | **Required**, matches agency-defined format (e.g., `SLBFE-XXXXXXXX`) |
| **`ageMin`** | `number` | `age_min` | Number Input | **Required**, integer, min 18, max 60, must be < `ageMax` |
| **`ageMax`** | `number` | `age_max` | Number Input | **Required**, integer, min 18, max 65, must be > `ageMin` |
| **`genderPreference`** | `'male' \| 'female' \| 'any'` | `gender_preference` | Radix `Select` | **Required**, default: `'any'` |

#### 3.1.2 Admin List View (Table Columns)

Displayed in a sortable/filterable data table at `/admin/jobs`:

| Column | Sortable | Filterable |
|---|---|---|
| Reference | ✓ | ✗ |
| Title | ✓ | Search box |
| Country | ✓ | Dropdown filter |
| Category | ✓ | Dropdown filter |
| Vacancies | ✓ | ✗ |
| Status | ✗ | Status filter chips |
| Closing Date | ✓ | ✗ |
| Featured | ✗ | Toggle filter |
| Actions (Edit / Delete) | ✗ | ✗ |

---

### 3.2 Employer / Agent Requests

**Extends the existing `EmployerRequest` type in `src/types/index.ts`** with mandatory business registration field.

**TypeScript Type Extension:**
```typescript
interface EmployerRequestAdminExtensions {
  businessRegistrationNumber: string;
  whatsapp?: string;
  contactDesignation: string;
}
type AdminEmployerRequest = EmployerRequest & EmployerRequestAdminExtensions;
```

#### 3.2.1 Form Schema Table

| Field Name | Data Type | DB Column | UI Input Component | Validation Rules |
|---|---|---|---|---|
| `companyName` | `string` | `company_name` | Text Input | Required, min 2 chars, max 150 chars |
| `country` | `string` | `country` | Radix `Select` (countries list) | Required |
| `industry` | `string` | `industry` | Radix `Select` (Construction, Hospitality, Healthcare, Domestic, Manufacturing, Other) | Required |
| `website` | `string` | `website` | Text Input (`url` type) | Optional, valid URL format (`z.string().url()`) |
| `contactPerson` | `string` | `contact_person` | Text Input | Required, min 2 chars, max 100 chars |
| **`contactDesignation`** | `string` | `contact_designation` | Text Input | **Required**, min 2 chars, max 80 chars (e.g., "HR Manager") |
| `email` | `string` | `email` | Text Input (`email` type) | Required, valid email format |
| `phone` | `string` | `phone` | Text Input (`tel` type) | Required, min 7 chars, max 20 chars |
| **`whatsapp`** | `string` | `whatsapp` | Text Input (`tel` type) | Optional, min 7 chars, max 20 chars |
| `jobTitleRequired` | `string` | `job_title_required` | Text Input | Required, min 2 chars, max 120 chars |
| `numberOfWorkers` | `number` | `number_of_workers` | Number Input | Required, integer, min 1, max 9999 |
| `requiredExperience` | `string` | `required_experience` | Radix `Select` (same experience levels as jobs) | Required |
| `qualifications` | `string` | `qualifications` | `<textarea>` | Optional, max 1000 chars |
| `salary` | `string` | `salary` | Text Input (free-text, e.g., "SAR 1,200/month") | Optional, max 100 chars |
| `benefits` | `string` | `benefits` | `<textarea>` | Optional, max 1000 chars |
| `expectedJoiningDate` | `string` (ISO date) | `expected_joining_date` | Date Picker | Optional, must be future date if provided |
| `additionalRequirements` | `string` | `additional_requirements` | `<textarea>` | Optional, max 2000 chars |
| **`businessRegistrationNumber`** | `string` | `business_registration_number` | Text Input | **Required**, min 4 chars, max 50 chars |
| `status` | `'pending' \| 'reviewed' \| 'inProgress' \| 'closed'` | `status` | Radix `Select` | Required (admin-managed), default: `'pending'` |
| `submittedAt` | `string` (ISO datetime) | `submitted_at` | Read-only display (auto-set server-side) | — |

#### 3.2.2 Admin List View

| Column | Sortable | Filterable |
|---|---|---|
| Company Name | ✓ | Search box |
| Country | ✓ | Dropdown filter |
| Industry | ✓ | Dropdown filter |
| Workers Required | ✓ | ✗ |
| Status | ✗ | Status chips |
| Submitted At | ✓ | Date range |
| Actions (View / Update Status) | ✗ | ✗ |

---

### 3.3 Job Applicants

**Extends the existing `Application` type in `src/types/index.ts`** with mandatory SLBFE-required passport fields.

**TypeScript Type Extension:**
```typescript
interface ApplicationAdminExtensions {
  passportNumber: string;
  passportExpiry: string; // ISO date
}
type AdminApplication = Application & ApplicationAdminExtensions;
```

#### 3.3.1 Form Schema Table — Personal Details

| Field Name | Data Type | DB Column | UI Input Component | Validation Rules |
|---|---|---|---|---|
| `fullName` | `string` | `full_name` | Text Input | Required, min 2 chars, max 120 chars |
| `nic` | `string` | `nic` | Text Input | Required, matches Sri Lankan NIC format: `/^\d{9}[VXvx]$\|^\d{12}$/` |
| `dateOfBirth` | `string` (ISO date) | `date_of_birth` | Date Picker | Required, applicant must be ≥ 18 years old at time of submission |
| `gender` | `string` | `gender` | Radix `Select` (Male / Female / Prefer not to say) | Optional |
| `district` | `string` | `district` | Radix `Select` (all 25 SL districts, matches existing `sriLankaDistricts` array in `ApplicationForm.tsx`) | Required |
| `address` | `string` | `address` | `<textarea>` (2 rows) | Required, min 5 chars, max 300 chars |
| `phone` | `string` | `phone` | Text Input (`tel` type) | Required, min 9 chars, max 15 chars |
| `whatsapp` | `string` | `whatsapp` | Text Input (`tel` type) | Optional, max 15 chars |
| `email` | `string` | `email` | Text Input (`email` type) | Optional, valid email if provided |
| **`passportNumber`** | `string` | `passport_number` | Text Input | **Required**, matches `/^[A-Z]{1,2}\d{7}$/` (Sri Lankan passport format) |
| **`passportExpiry`** | `string` (ISO date) | `passport_expiry` | Date Picker | **Required**, must be a future date AND have ≥ 6 months validity remaining |

#### 3.3.2 Form Schema Table — Professional Details

| Field Name | Data Type | DB Column | UI Input Component | Validation Rules |
|---|---|---|---|---|
| `currentOccupation` | `string` | `current_occupation` | Text Input | Required, min 2 chars, max 100 chars |
| `yearsOfExperience` | `string` | `years_of_experience` | Radix `Select` (matches existing `experienceLevels` array in `ApplicationForm.tsx`) | Required |
| `highestQualification` | `string` | `highest_qualification` | Radix `Select` (matches existing `qualifications` array in `ApplicationForm.tsx`) | Required |
| `professionalQualifications` | `string` | `professional_qualifications` | `<textarea>` | Optional, max 500 chars |
| `relevantSkills` | `string` | `relevant_skills` | `<textarea>` | Optional, max 500 chars |
| `hasDrivingLicence` | `boolean` | `has_driving_licence` | Radix `Checkbox` | Optional, default: `false` |
| `overseasExperience` | `string` | `overseas_experience` | `<textarea>` (previous countries/roles) | Optional, max 500 chars |

#### 3.3.3 Form Schema Table — Document Uploads

| Field Name | Data Type | DB Column | UI Input Component | Validation Rules |
|---|---|---|---|---|
| `cvFile` | `File` (upload) | `cv_file_key` (storage key) | File Dropzone | Optional for admin-created records; PDF/DOC/DOCX only; max 5 MB |
| `cvFileName` | `string` | `cv_file_name` | Read-only display after upload | Auto-set from uploaded file name |

**Upload Logic:**
1. Admin selects file in the Dropzone component
2. Client-side validation: MIME type + size
3. On form submit, the Server Action receives the `FormData` object
4. The Server Action uploads the file to **Supabase Storage** in the `applicant-documents` bucket (private bucket, not public)
5. The Storage `path` (key) is saved to the `cv_file_key` column
6. To generate a download link, a signed URL is created server-side via `supabase.storage.from('applicant-documents').createSignedUrl(key, 60)` — never expose the raw key to the client

#### 3.3.4 Form Schema Table — Status & Meta

| Field Name | Data Type | DB Column | UI Input Component | Validation Rules |
|---|---|---|---|---|
| `jobId` | `string` | `job_id` | Radix `Select` (searchable, lists active jobs) | Required |
| `status` | `ApplicationStatus` | `status` | Radix `Select` (full `ApplicationStatus` enum) | Required (admin-managed), default: `'APPLIED'` |
| `privacyConsent` | `boolean` | `privacy_consent` | Radix `Checkbox` (read-only for admin view) | Must be `true` to save |
| `submittedAt` | `string` (ISO datetime) | `submitted_at` | Read-only display | Auto-set server-side on creation |
| `updatedAt` | `string` (ISO datetime) | `updated_at` | Read-only display | Auto-set server-side on update |

#### 3.3.5 Application Status Flow

The `ApplicationStatus` type from `src/types/index.ts` defines the following valid states:

```
APPLIED → REVIEWED → SHORTLISTED → INTERVIEW_SCHEDULED → INTERVIEWED
       → SELECTED → DOCUMENT_PROCESSING → MEDICAL → VISA_PROCESSING
       → READY_FOR_DEPARTURE → DEPARTED
       (at any stage) → REJECTED | WITHDRAWN
```

Status changes must be logged with a timestamp for an audit trail (`application_status_history` table recommended).

---

### 3.4 Destination Countries (Taxonomy)

**Maps directly to the existing `Country` type in `src/types/index.ts`.**

| Field Name | Data Type | DB Column | UI Input Component | Validation Rules |
|---|---|---|---|---|
| `name` | `string` | `name` | Text Input | Required, min 2 chars, max 80 chars, unique |
| `slug` | `string` | `slug` | Text Input (auto-generated from name, editable) | Required, lowercase alphanumeric + hyphens, unique |
| `shortName` | `string` | `short_name` | Text Input | Optional, max 20 chars |
| `flag` | `string` (emoji) | `flag` | Text Input (emoji character, e.g., 🇸🇦) | Required, must be a 2-character regional indicator emoji sequence |
| `region` | `string` | `region` | Radix `Select` (Middle East, East Asia, Southeast Asia, Europe, Other) | Required |
| `summary` | `string` | `summary` | `<textarea>` | Required, min 20 chars, max 500 chars |
| `popularCategories` | `string[]` | `popular_categories` | Multi-select from job categories | Optional, max 6 items |
| `image` | `string` (URL) | `image_url` | File Dropzone → Supabase Storage URL | Required, JPEG/PNG/WebP, max 3 MB, recommended 1920×1080 |
| `featured` | `boolean` | `featured` | Radix `Checkbox` | Optional, default: `false` |
| `active` | `boolean` | `active` | Radix `Checkbox` | Required, default: `true` |
| `status` | `'recruiting-market'` | `status` | Read-only label (currently only one valid value) | Hardcoded to `'recruiting-market'` |

---

### 3.5 Job Categories (Taxonomy)

**Maps directly to the existing `JobCategory` type in `src/types/index.ts`.**

| Field Name | Data Type | DB Column | UI Input Component | Validation Rules |
|---|---|---|---|---|
| `name` | `string` | `name` | Text Input | Required, min 2 chars, max 80 chars, unique |
| `slug` | `string` | `slug` | Text Input (auto-generated, editable) | Required, lowercase alphanumeric + hyphens, unique |
| `icon` | `string` (Lucide icon name) | `icon` | Text Input with live icon preview (renders `<LucideIcon name={value} />`) | Required, must be a valid `lucide-react` icon name |
| `description` | `string` | `description` | `<textarea>` | Required, min 10 chars, max 300 chars |
| `agencyConfirmed` | `boolean` | `agency_confirmed` | Radix `Checkbox` | Required, default: `false` |

> **Note:** `jobCount` and `countries` on the existing `JobCategory` type are **computed/derived** at query time (COUNT of active jobs) and must **not** be stored or edited directly in this form.

---

### 3.6 Reviews & Testimonials

**Maps to the existing `RecruitmentExperience` discriminated union type in `src/types/index.ts`.**

The admin form must support both review `type` variants through a toggled conditional section.

| Field Name | Data Type | DB Column | UI Input Component | Validation Rules |
|---|---|---|---|---|
| `type` | `'candidate' \| 'employer'` | `type` | Radix `Select` | Required, triggers conditional field rendering |
| `review` | `string` | `review` | `<textarea>` | Required, min 20 chars, max 1000 chars |
| `verified` | `boolean` | `verified` | Radix `Checkbox` (admin approval toggle) | Required, default: `false` — only `verified: true` reviews appear publicly |
| `isDemo` | `boolean` | `is_demo` | Radix `Checkbox` | Required, default: `false` — demo content is clearly labelled in the UI |

**Conditional fields when `type === 'candidate'`:**

| Field Name | Data Type | DB Column | UI Input Component | Validation Rules |
|---|---|---|---|---|
| `name` | `string` | `candidate_name` | Text Input | Required for candidate type, min 2 chars |
| `role` | `string` | `candidate_role` | Text Input (e.g., "Driver", "Factory Worker") | Optional, max 80 chars |
| `destination` | `string` | `destination` | Radix `Select` (from countries list) | Optional |
| `rating` | `1\|2\|3\|4\|5\|undefined` | `rating` | Star rating input (5-star interactive widget) | Optional, only applicable for real (non-demo) reviews |
| `image` | `string` (URL) | `candidate_image_url` | File Dropzone → Supabase Storage (public bucket) | Optional, JPEG/PNG/WebP, max 1 MB, square crop recommended |

**Conditional fields when `type === 'employer'`:**

| Field Name | Data Type | DB Column | UI Input Component | Validation Rules |
|---|---|---|---|---|
| `company` | `string` | `employer_company` | Text Input | Required for employer type, min 2 chars |
| `country` | `string` | `employer_country` | Radix `Select` (from countries list) | Optional |
| `contactRole` | `string` | `contact_role` | Text Input (e.g., "HR Director") | Optional, max 80 chars |
| `logo` | `string` (URL) | `employer_logo_url` | File Dropzone → Supabase Storage (public bucket) | Optional, PNG/SVG/WebP, max 500 KB, transparent background recommended |

**Admin List View — Key Columns:**

| Column | Notes |
|---|---|
| Type | Candidate / Employer chip |
| Name / Company | |
| Rating | Stars or N/A |
| Verified | Green tick / Red X (clickable quick-toggle) |
| IsDemo | Badge |
| Actions | Edit / Delete |

---

### 3.7 Media Gallery

A new entity with no existing type. Manages photos and videos for public display.

**New TypeScript Type:**
```typescript
type MediaType = 'photo' | 'video';
type MediaCategory = 'deployment' | 'event' | 'office' | 'interview' | 'other';

interface MediaItem {
  id: string;
  type: MediaType;
  category: MediaCategory;
  title: string;
  description?: string;
  fileUrl: string;        // Supabase Storage public URL
  fileKey: string;        // Supabase Storage path (internal)
  thumbnailUrl?: string;  // For videos: separately uploaded thumbnail image
  thumbnailKey?: string;
  altText: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  uploadedAt: string;
  updatedAt: string;
}
```

| Field Name | Data Type | DB Column | UI Input Component | Validation Rules |
|---|---|---|---|---|
| `type` | `MediaType` | `type` | Radix `Select` (Photo / Video) | Required |
| `category` | `MediaCategory` | `category` | Radix `Select` (Deployment, Event, Office, Interview, Other) | Required |
| `title` | `string` | `title` | Text Input | Required, min 2 chars, max 120 chars |
| `description` | `string` | `description` | `<textarea>` | Optional, max 500 chars |
| `file` | `File` | `file_key` (storage) | File Dropzone | Required; **Photos:** JPEG/PNG/WebP, max 10 MB; **Videos:** MP4/WebM, max 200 MB |
| `thumbnail` | `File` | `thumbnail_key` (storage) | Secondary File Dropzone (shown only when `type === 'video'`) | Required for videos; JPEG/PNG/WebP, max 2 MB |
| `altText` | `string` | `alt_text` | Text Input | Required (accessibility), min 5 chars, max 200 chars |
| `featured` | `boolean` | `featured` | Radix `Checkbox` | Optional, default: `false` |
| `published` | `boolean` | `published` | Radix `Checkbox` (publish toggle) | Required, default: `false` |
| `sortOrder` | `number` | `sort_order` | Number Input | Optional, default: `0`, used for manual ordering on public gallery |

**Gallery Admin UI Notes:**
- The list view uses a **masonry/grid layout** for visual browsing rather than a plain table
- Drag-and-drop reordering (updates `sortOrder`) is a Phase 3+ stretch goal
- Bulk upload is a Phase 3+ stretch goal
- Videos are stored in Supabase Storage; the public site embeds them via `<video>` tag or a lightweight third-party player

---

### 3.8 Announcements / Notice Board

A new entity to broadcast time-sensitive alerts on the public site.

**New TypeScript Type:**
```typescript
type AnnouncementPriority = 'low' | 'normal' | 'high' | 'urgent';

interface Announcement {
  id: string;
  title: string;
  body: string;
  priority: AnnouncementPriority;
  targetAudience: 'candidates' | 'employers' | 'all';
  publishedAt: string | null;   // null = draft
  expiresAt: string | null;     // null = never expires
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
```

| Field Name | Data Type | DB Column | UI Input Component | Validation Rules |
|---|---|---|---|---|
| `title` | `string` | `title` | Text Input | Required, min 5 chars, max 150 chars |
| `body` | `string` | `body` | `<textarea>` | Required, min 10 chars, max 2000 chars |
| `priority` | `AnnouncementPriority` | `priority` | Radix `Select` (Low, Normal, High, Urgent) | Required, default: `'normal'` |
| `targetAudience` | `string` | `target_audience` | Radix `Select` (Candidates, Employers, All) | Required, default: `'all'` |
| `publishedAt` | `string \| null` (ISO datetime) | `published_at` | Date-time Picker (with "Publish Now" shortcut button) | Optional — `null` means saved as draft |
| `expiresAt` | `string \| null` (ISO datetime) | `expires_at` | Date-time Picker (with "Never expires" option) | Optional — must be after `publishedAt` if both are set |
| `active` | `boolean` | `active` | Radix `Checkbox` (master on/off toggle) | Required, default: `true` |

**Admin List View:**

| Column | Sortable | Notes |
|---|---|---|
| Title | ✓ | |
| Priority | ✗ | Color-coded chip (Urgent = red, High = amber, Normal = blue, Low = slate) |
| Audience | ✗ | |
| Published At | ✓ | "Draft" badge if `null` |
| Expires At | ✓ | "Never" if `null`, red text if already past |
| Active | ✗ | Quick-toggle Switch (`@radix-ui/react-switch`) |
| Actions | ✗ | Edit / Delete |

---

### 3.9 Events Management

A new entity for company events (recruitment drives, walk-in interview sessions, etc.).

**New TypeScript Type:**
```typescript
interface AgencyEvent {
  id: string;
  title: string;
  description: string;
  eventDate: string;        // ISO date (date only, not datetime)
  eventTime?: string;       // HH:MM 24-hour format, optional
  location: string;
  organiser?: string;
  featured: boolean;
  published: boolean;
  photos: EventMedia[];
  createdAt: string;
  updatedAt: string;
}

interface EventMedia {
  id: string;
  eventId: string;
  fileUrl: string;          // Supabase Storage public URL
  fileKey: string;          // Supabase Storage path (internal)
  altText: string;
  sortOrder: number;
}
```

| Field Name | Data Type | DB Column | UI Input Component | Validation Rules |
|---|---|---|---|---|
| `title` | `string` | `title` | Text Input | Required, min 5 chars, max 150 chars |
| `description` | `string` | `description` | `<textarea>` | Required, min 20 chars, max 3000 chars |
| `eventDate` | `string` (ISO date) | `event_date` | Date Picker | Required |
| `eventTime` | `string` | `event_time` | `<input type="time">` | Optional, HH:MM 24-hour format |
| `location` | `string` | `location` | Text Input (venue name / address) | Required, min 5 chars, max 200 chars |
| `organiser` | `string` | `organiser` | Text Input | Optional, max 100 chars |
| `featured` | `boolean` | `featured` | Radix `Checkbox` | Optional, default: `false` |
| `published` | `boolean` | `published` | Radix `Checkbox` | Required, default: `false` |
| `photos` | `File[]` | `event_media` table (join) | Multi-file Dropzone (photos only) | Optional; JPEG/PNG/WebP each max 5 MB; max 20 files per event |

**Photo Upload Logic for Events:**
1. Admin uploads multiple photos via the multi-file Dropzone component
2. Each file is uploaded to Supabase Storage at `events/{eventId}/{uuid}.{ext}` (public bucket)
3. Each upload creates a row in the `event_media` table referencing the parent `agency_events` row
4. Individual photos can be deleted or reordered within the event edit form
5. `altText` for each photo defaults to the event title and can be edited inline

---

## 4. UI/UX Strategy

### 4.1 Design System Alignment

The admin dashboard must use the **same design tokens** defined in `src/app/globals.css` (`@theme` block). This ensures visual brand consistency without duplicating CSS variables.

**Reuse these existing tokens:**

| Token Category | CSS Variable(s) | Admin Usage |
|---|---|---|
| Brand colors | `--color-brand-gold`, `--color-brand-black` | Sidebar accent, primary CTA buttons |
| Navy scale | `--color-navy-950` through `--color-navy-50` | Sidebar background (`navy-950`), form card borders |
| Slate scale | `--color-slate-900` through `--color-slate-50` | Body text, table row backgrounds, input fills |
| Typography | `--font-sans` (Inter) | All admin text — same font as public site |
| Radius | `--radius-md`, `--radius-lg` | Form inputs, cards, badges |
| Shadows | `--shadow-card`, `--shadow-card-hover`, `--shadow-modal` | Admin cards, modals |

### 4.2 Admin Shell Layout (CSS Grid)

Use **CSS Grid** for the overall admin shell to avoid complex Flexbox nesting:

```css
/* (admin)/admin.module.css */
.adminShell {
  display: grid;
  grid-template-columns: 260px 1fr;  /* sidebar | content */
  grid-template-rows: 56px 1fr;      /* topbar | main */
  min-height: 100vh;
}
/* Collapsed sidebar state (class toggled client-side) */
.adminShell.collapsed {
  grid-template-columns: 64px 1fr;
}
.sidebar  { grid-column: 1; grid-row: 1 / -1; background-color: var(--color-navy-950); }
.topbar   { grid-column: 2; grid-row: 1; border-bottom: 1px solid var(--color-slate-200); }
.content  { grid-column: 2; grid-row: 2; background-color: var(--color-slate-50); overflow-y: auto; padding: 2rem; }
```

### 4.3 Radix UI Component Mapping

These Radix primitives are **already installed** (`package.json`) and should be used as follows:

| Radix Package | Admin Usage |
|---|---|
| `@radix-ui/react-select` | All `<select>` dropdowns (status, country, category, currency, etc.) |
| `@radix-ui/react-checkbox` | All boolean toggles (featured, published, verified, privacy consent) |
| `@radix-ui/react-dialog` | Confirmation dialogs (delete confirmation, status change, CV preview) |
| `@radix-ui/react-toast` | Success/error notifications after Server Action responses |
| `@radix-ui/react-label` | Form field labels (paired with every input for accessibility) |
| `@radix-ui/react-accordion` | Collapsible form sections (e.g., Benefits & Conditions on Job form) |
| `@radix-ui/react-separator` | Visual dividers between form section groups |

### 4.4 Additional Radix Packages to Install

The following Radix primitives are **not yet installed** but are recommended for the admin dashboard:

| Package | Purpose |
|---|---|
| `@radix-ui/react-switch` | Toggle switches for `published`/`active` quick-toggles on list pages |
| `@radix-ui/react-dropdown-menu` | Actions menu (⋮ button) on table rows |
| `@radix-ui/react-popover` | Date picker trigger container |
| `@radix-ui/react-tabs` | Multi-section forms (e.g., Job form: Details / Benefits / Settings) |
| `@radix-ui/react-alert-dialog` | Destructive action confirmation (irreversible deletes) |

### 4.5 Form Component Architecture

All admin forms must follow this consistent pattern (aligned with `src/components/forms/ApplicationForm.tsx`):

```
AdminFormPage (Server Component — fetches initial data)
└── AdminJobForm (Client Component — "use client")
    ├── useForm({ resolver: zodResolver(schema) })
    ├── <FormSection title="Basic Information">
    │   ├── <Field id="title" label="Job Title" error={errors.title}>
    │   │   ├── <Label>
    │   │   ├── <Input type="text" {...register("title")} />
    │   │   └── <ErrorMessage />
    │   └── <Field id="country" label="Country">
    │       └── <Radix.Select {...controller} />
    ├── <FormSection title="Conditions & Benefits">  ← collapsible via Accordion
    └── <SubmitButton>                               ← Loader2 spinner during pending state
        └── useFormState() from react-dom
```

The `FormSection` and `Field` wrapper components from `ApplicationForm.tsx` must be **extracted to shared admin components** at `src/components/admin/ui/` rather than duplicated.

### 4.6 Data Table Component

No data table library is currently installed. Build a reusable `AdminTable` component:
- Column header click to sort (URL-based: `?sortBy=title&order=asc`)
- Row hover state using existing `--shadow-card-hover`
- Server-side pagination with URL params (`?page=1&perPage=25`)
- Status badges rendered with `cn()` for conditional coloring
- Avoid heavy libraries (e.g., TanStack Table) unless data volume in Phase 2+ demands it

### 4.7 Responsive Behaviour

The admin dashboard targets **desktop-first** usage (≥ 1024px). However:
- Sidebar must collapse to icon-only at `md` breakpoint (768px)
- Forms must reflow from 2-column grid to single column below 640px
- No dedicated mobile admin layout is required in Phase 1–2

---

## 5. Implementation Checklist

Development is phased to deliver value incrementally.

---

### Phase 1: Foundation — Auth, Layout & Database (Weeks 1–2)

**Goal:** A working, secure admin shell with login and navigation. No data forms yet.

- [ ] **P1.1** Install `@supabase/supabase-js` and `@supabase/ssr`
- [ ] **P1.2** Create `src/lib/supabase/client.ts` (browser client) and `src/lib/supabase/server.ts` (server client using cookies)
- [ ] **P1.3** Create `src/middleware.ts` with admin route protection logic (see §2.2)
- [ ] **P1.4** Refactor existing public routes into `src/app/(public)/` route group; add `(public)/layout.tsx` wrapping existing `Header` + `Footer` + `WhatsAppButton`
- [ ] **P1.5** Create `src/app/(admin)/layout.tsx` — admin shell (sidebar + topbar, Server Component, no public layout components)
- [ ] **P1.6** Create `src/app/(admin)/admin/login/page.tsx` — login page with email/password form
- [ ] **P1.7** Create login Server Action: `src/app/(admin)/admin/login/actions.ts`
- [ ] **P1.8** Create logout Server Action: `src/app/(admin)/admin/actions.ts`
- [ ] **P1.9** Create `src/app/(admin)/admin/dashboard/page.tsx` — placeholder stats overview (counts from DB)
- [ ] **P1.10** Write Supabase SQL migration files for all tables defined in §3 (see Appendix A)
- [ ] **P1.11** Configure Supabase Row Level Security (RLS) policies — all tables restricted to `auth.role() = 'admin'`
- [ ] **P1.12** Create `src/components/admin/layout/Sidebar.tsx` with navigation link list
- [ ] **P1.13** Create `src/components/admin/layout/Topbar.tsx` with breadcrumbs + user display + logout
- [ ] **P1.14** Extract `FormSection` and `Field` components to `src/components/admin/ui/`
- [ ] **P1.15** Add `<meta name="robots" content="noindex, nofollow" />` to `(admin)/layout.tsx`
- [ ] **P1.16** Verify `/admin/*` is excluded from `src/app/sitemap.ts` and `src/app/robots.ts`

---

### Phase 2: Core Data Forms — Jobs, Applicants & Employer Requests (Weeks 3–5)

**Goal:** Full CRUD for the three primary agency entities and taxonomy.

- [ ] **P2.1** Create reusable `AdminTable` component (`src/components/admin/ui/AdminTable.tsx`)
- [ ] **P2.2** Create Job list page (`/admin/jobs`) using `AdminTable` with all columns from §3.1.2
- [ ] **P2.3** Create Job create form (`/admin/jobs/new`) with all fields from §3.1.1, including SLBFE/age/gender additions
- [ ] **P2.4** Create Job edit form (`/admin/jobs/[id]`) pre-populated from DB query
- [ ] **P2.5** Create Job Server Actions: `createJob`, `updateJob`, `deleteJob` in `src/app/(admin)/admin/jobs/actions.ts`
- [ ] **P2.6** Implement job image upload to `job-images` Supabase Storage bucket
- [ ] **P2.7** Create Applicant list page (`/admin/applicants`) with status filter chips and search
- [ ] **P2.8** Create Applicant create form (`/admin/applicants/new`) with all fields from §3.3, including passport additions
- [ ] **P2.9** Create Applicant detail/edit page (`/admin/applicants/[id]`) with status update workflow and CV signed-URL download
- [ ] **P2.10** Create Applicant Server Actions: `createApplicant`, `updateApplicant`, `updateApplicationStatus`, `deleteApplicant`
- [ ] **P2.11** Implement CV upload to private `applicant-documents` Supabase Storage bucket with signed URL retrieval
- [ ] **P2.12** Create `application_status_history` table and log all status transitions
- [ ] **P2.13** Create Employer Request list page (`/admin/employer-requests`) with §3.2.2 columns
- [ ] **P2.14** Create Employer Request edit/detail page (`/admin/employer-requests/[id]`)
- [ ] **P2.15** Create Employer Request Server Actions: `updateEmployerRequest`, `deleteEmployerRequest`
- [ ] **P2.16** Create Countries taxonomy list and create/edit pages (`/admin/taxonomy/countries`)
- [ ] **P2.17** Create Job Categories taxonomy list and create/edit pages (`/admin/taxonomy/categories`)
- [ ] **P2.18** Implement country image upload to `country-images` Supabase Storage bucket

---

### Phase 3: Content Modules — Reviews, Media, Notices & Events (Weeks 6–8)

**Goal:** Full CMS capability for content editors.

- [ ] **P3.1** Create Reviews list page (`/admin/reviews`) with verified quick-toggle
- [ ] **P3.2** Create Review create/edit form with discriminated union conditional rendering (candidate vs employer fields)
- [ ] **P3.3** Create Review Server Actions: `createReview`, `updateReview`, `deleteReview`, `toggleVerified`
- [ ] **P3.4** Implement review asset upload (candidate photo / employer logo) to `review-assets` public bucket
- [ ] **P3.5** Create Media Gallery page (`/admin/media`) with grid/masonry preview layout
- [ ] **P3.6** Create Media upload form with photo/video type toggle and separate video thumbnail upload
- [ ] **P3.7** Create Media Server Actions: `uploadMedia`, `updateMedia`, `deleteMedia` (including Supabase Storage cleanup on delete)
- [ ] **P3.8** Create Announcements list page (`/admin/announcements`) with priority colour-coded chips
- [ ] **P3.9** Create Announcement create/edit form with publish-at scheduling
- [ ] **P3.10** Create Announcement Server Actions: `createAnnouncement`, `updateAnnouncement`, `deleteAnnouncement`, `toggleActive`
- [ ] **P3.11** Create Events list page (`/admin/events`)
- [ ] **P3.12** Create Event create/edit form with multi-photo upload using `EventMedia` dropzone
- [ ] **P3.13** Create Event Server Actions: `createEvent`, `updateEvent`, `deleteEvent` (cascade delete `event_media` rows and Storage files)
- [ ] **P3.14** Migrate public-facing pages from static `src/data/` files to live Supabase DB queries using Server Components

---

### Phase 4: Polish, Hardening & Handover (Weeks 9–10)

**Goal:** Production-ready security, accessible UX, and team documentation.

- [ ] **P4.1** Audit all Server Actions — confirm Zod schema re-validation runs server-side before every DB write
- [ ] **P4.2** Audit all Server Actions — confirm session check at the top of every action (not just middleware)
- [ ] **P4.3** Add `@radix-ui/react-toast` success/error notifications for all CRUD operations
- [ ] **P4.4** Add `@radix-ui/react-alert-dialog` delete confirmation for all destructive actions
- [ ] **P4.5** Implement real dashboard stats: live DB counts (active jobs, pending applicants, pending employer requests, unverified reviews)
- [ ] **P4.6** Create Contact Message inbox (`/admin/contact-messages`) from existing `ContactMessage` type in `src/types/index.ts`
- [ ] **P4.7** Accessibility audit: all admin forms have `aria-label`, `aria-describedby`, proper `<Label>` associations, and keyboard navigation
- [ ] **P4.8** Add `loading.tsx` Suspense wrappers to all admin list and detail pages
- [ ] **P4.9** Final Supabase RLS audit: confirm all tables and Storage buckets enforce admin-only access
- [ ] **P4.10** Confirm `applicant-documents` bucket has NO public access policy; all access via signed URLs
- [ ] **P4.11** Write developer documentation at `src/app/(admin)/README.md`
- [ ] **P4.12** End-to-end smoke test: login → create job → create applicant → update status → logout

---

## Appendix A: Supabase Table Name Reference

| Entity | Supabase Table Name |
|---|---|
| Jobs | `jobs` |
| Job Categories | `job_categories` |
| Destination Countries | `countries` |
| Applications / Applicants | `applications` |
| Application Status History | `application_status_history` |
| Employer Requests | `employer_requests` |
| Reviews / Testimonials | `recruitment_experiences` |
| Media Gallery Items | `media_items` |
| Announcements | `announcements` |
| Agency Events | `agency_events` |
| Event Media (join) | `event_media` |
| Contact Messages | `contact_messages` |
| Admin Users | Supabase `auth.users` (with `role: 'admin'` in `user_metadata`) |

---

## Appendix B: Supabase Storage Bucket Reference

| Bucket Name | Visibility | Contents |
|---|---|---|
| `job-images` | **Public** | Job vacancy cover images |
| `country-images` | **Public** | Country banner/hero images |
| `media-gallery` | **Public** | Gallery photos and videos |
| `event-photos` | **Public** | Event-specific photo albums |
| `review-assets` | **Public** | Candidate photos, employer company logos |
| `applicant-documents` | **PRIVATE** | CV files, identity documents — accessed via signed URLs ONLY |

> **Critical Security Note:** The `applicant-documents` bucket must have **zero public access**. All file retrieval must go through `supabase.storage.from('applicant-documents').createSignedUrl(key, expirySeconds)` called exclusively from a Server Action or Server Component that has first verified the admin session. This protects personally identifiable information (PII) under data protection obligations.

---

*End of Specification — `ADMIN_DASHBOARD_SPEC.md` v1.0.0*
