# Session 01: Setup & Infrastructure

**Date:** 2026-01-21
**Phase:** 00 - Scaffolding & Infra Base

## Objective

Establish the technical foundation of the **Your Shifts Manager** application, including Next.js setup, database connection with RBAC schema, authentication system, and observability tools.

## Completed Tasks

### 0.1 Repo & Scaffolding

- **Stack**: Initialized Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui.
- **Quality**: Configured ESLint, Prettier, Husky, and lint-staged for code quality enforcement.
- **Verification**: Confirmed clean build and linting capabilities.

### 0.2 Infra Base (DB + Prisma)

- **ORM**: Installed and configured Prisma with Neon Postgres.
- **Schema**: Defined a comprehensive multi-tenant RBAC schema including `Company`, `User`, `Role`, `Permission`, `Shift`, etc.
- **Seeding**: Created `prisma/seed.ts` to initialize system roles and permissions.
- **Deployment**: Added `postinstall` script (`prisma generate`) to support Vercel deployment.

### 0.3 Auth (Clerk)

- **Integration**: Installed `@clerk/nextjs` and configured `ClerkProvider`.
- **Security**: Implemented `middleware.ts` to protect application routes, leaving only landing and auth pages public.
- **UI**: created standard `/sign-in` and `/sign-up` pages.
- **Testing**: Verified authentication flow with `UserButton` on the home page.

### 0.4 Observability

- **Error Tracking**: integrated **Sentry** (frontend + backend). Configured `next.config.ts` to conditionally upload source maps.
- **Analytics**: Integrated **PostHog** via a client-side `PostHogProvider`.
- **Configuration**: Set up environment-based configuration for observability tools.

## Key Decisions & Notes

- **Prisma**: Explicitly handled `DATABASE_URL` in schema to resolve conflicts.
- **Vercel**: Added `prisma/` exclusion in `tsconfig` and `postinstall` script to ensure smooth builds.
- **Sentry**: Configured to stay silent/disabled during builds if `SENTRY_AUTH_TOKEN` is missing, preventing CI failures in dev environments.

## Outcome

The application infrastructure is fully ready. The "Walking Skeleton" is live, secured, and monitored.
We are ready to transition to **Phase 01: MVP Features**.
