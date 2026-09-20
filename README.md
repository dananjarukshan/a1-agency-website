# A-One Foreign Employment Agency Website

A production-oriented public website foundation for a Sri Lankan foreign-employment and
international manpower agency. The current build is intentionally in demo mode: jobs,
testimonials, credentials, addresses, and contact details are placeholders until the client
confirms them.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Quality checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

On Windows PowerShell systems that block npm scripts, use `npm.cmd` and `npx.cmd`.

## Configure the agency

1. Replace the business placeholders in `src/config/site.ts`.
2. Copy `.env.example` to `.env.local` and enter the confirmed public values.
3. Replace the text-based logo once the agency supplies its identity assets.
4. Replace demo jobs in `src/data/index.ts` with API/database data.
5. Have the privacy policy and terms reviewed before accepting live submissions.
6. Change `contentMode` only after credentials, data handling, and production integrations
   are complete. Demo mode intentionally sends `noindex` directives.

Public `NEXT_PUBLIC_*` variables are embedded at build time. Never place database, auth,
email, storage, or API secrets in a public variable.

## Forms and private files

The application, contact, and manpower-request forms currently validate in the browser and do
not transmit or store data. Before launch, connect them to protected server endpoints with:

- server-side Zod validation and rate limiting;
- anti-automation controls and audit logging;
- MIME, extension, size, and malware checks for CVs;
- private S3-compatible object storage and authorized retrieval;
- database-backed references, notifications, and retention rules.

## Docker / VPS

The project uses Next.js standalone output. Build and run the container:

```bash
docker build -t a1-recruitment .
docker run --rm -p 3000:3000 --env-file .env.production a1-recruitment
```

Place Nginx in front of the container, terminate HTTPS at the proxy or Cloudflare, configure
request-size/rate limits, and disable proxy buffering if streaming routes are introduced.

## Main architecture

- Next.js 16 App Router, React 19, TypeScript strict mode
- Tailwind CSS 4
- React Hook Form + Zod
- Server Components by default; client boundaries only for interactive UI
- Central site configuration, typed mock data, reusable job/form/layout components
- Metadata, sitemap, robots, responsive navigation, accessible states, and security headers

PostgreSQL, Prisma, Auth.js, private storage, analytics, and the admin/applicant-tracking
system remain planned production integrations rather than simulated backend features.
