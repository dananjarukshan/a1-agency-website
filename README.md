# A-One Foreign Employment Agency — Monorepo

Enterprise-grade monorepo for A-One Agency, separating the public recruitment portal from the internal administration dashboard while sharing canonical data models, UI design tokens, validation schemas, and database clients.

---

## 🏗️ Architecture Overview

Managed via **NPM Workspaces** and orchestrated with **Turborepo**:

```
a1-agency-monorepo/
├── apps/
│   ├── web/                    # Public Portal (Next.js 16, Port 3000)
│   │   └── src/app/            # /, /about, /jobs, /countries, /employers, etc.
│   │
│   └── admin/                  # Agency Management Dashboard (Next.js 16, Port 3001)
│       └── src/app/            # /dashboard, /jobs, /applicants, /reviews, etc.
│
├── packages/
│   ├── types/                  # @a1/types — Canonical TypeScript data models & DTOs
│   ├── ui/                     # @a1/ui — Shared UI primitives, breadcrumbs, cn()
│   ├── config/                 # @a1/config — Tailwind CSS v4 design tokens & theme
│   └── database/               # @a1/database — Supabase clients & Zod validation schemas
│
├── ecosystem.config.js         # PM2 process configuration for AWS EC2
├── turbo.json                  # Turborepo task pipeline
└── package.json                # Root workspaces definition
```

---

## 🚀 Quick Start (Local Development)

### 1. Install Workspace Dependencies
From the repository root:
```bash
npm install
```

### 2. Run Both Applications Concurrently
```bash
npm run dev
```
Turborepo will concurrently launch:
* 🌐 **Public Website:** [http://localhost:3000](http://localhost:3000)
* 🛡️ **Admin Dashboard:** [http://localhost:3001](http://localhost:3001) (redirects to `/dashboard`)
* 🔐 **Admin Login:** [http://localhost:3001/login](http://localhost:3001/login)

---

## 🛠️ Workspace Commands

You can run commands for specific apps or across the entire monorepo:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs both Web (`:3000`) and Admin (`:3001`) with Turbopack |
| `npm run dev:web` | Starts only the Public Web app on port `3000` |
| `npm run dev:admin` | Starts only the Admin Dashboard on port `3001` |
| `npm run build` | Builds both apps and packages in parallel |
| `npm run build:web` | Builds only `@a1/web` |
| `npm run build:admin` | Builds only `@a1/admin` |
| `npm run lint` | Runs linter across all workspaces |
| `npm run clean` | Cleans build caches (`.next`, `.turbo`) |

---

## 📦 Shared Packages Usage

### `@a1/types`
Import data models in any app or package:
```typescript
import type { Job, Applicant, EmployerRequest, Country } from "@a1/types";
```

### `@a1/ui`
Shared primitives and utilities:
```typescript
import { Breadcrumbs, EmptyState, SectionHeading, cn } from "@a1/ui";
```

### `@a1/config`
Both applications import the shared Tailwind CSS v4 design tokens in `globals.css`:
```css
@import "tailwindcss";
@import "@a1/config/tailwind/theme.css";
```

### `@a1/database`
Shared Zod schemas and validation rules:
```typescript
import { jobSchema, applicantSchema, contactMessageSchema } from "@a1/database";
```

---

## ☁️ Production Deployment (AWS EC2)

The monorepo is engineered to run on a single AWS EC2 instance (`t3.medium` recommended, or `t3.small` with 2GB swap):
* **Process Manager:** Managed via PM2 with `ecosystem.config.js`:
  * `a1-web`: Cluster mode on port `3000`
  * `a1-admin`: Fork mode on port `3001`
* **Reverse Proxy:** Nginx routes:
  * `www.a-oneagency.com` -> `127.0.0.1:3000`
  * `admin.a-oneagency.com` -> `127.0.0.1:3001` (supports IP whitelisting / VPN isolation)
* **SSL:** Automated Let's Encrypt multi-domain certificate (`certbot --nginx`).

Refer to **[MONOREPO_MIGRATION_PLAN.md](./MONOREPO_MIGRATION_PLAN.md)** for full Nginx, PM2, and `deploy.sh` configuration files.  
Refer to **[ADMIN_DASHBOARD_SPEC.md](./ADMIN_DASHBOARD_SPEC.md)** for administrative features and Supabase database schema specifications.
