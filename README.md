# Afar Regional State Innovation and Technology Development Bureau (ITDB) Website

A trilingual (Afar, Amharic, English) government website built with Next.js 16 (App Router), Prisma 7 + PostgreSQL (Neon), next-intl, and NextAuth (Auth.js) v5.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Database:** PostgreSQL (Neon) via Prisma ORM 7 with the `@prisma/adapter-pg` driver adapter
- **i18n:** `next-intl` — Afar (`af`, default), Amharic (`am`), English (`en`)
- **Auth:** NextAuth v5 (Credentials provider) for the admin panel
- **Styling:** Tailwind CSS v4, Lucide icons

## Project Structure

- `src/app/[locale]/...` — public, localized pages (Home, About, Sectors, Directorates, News, Events, Publications, Gallery, FAQ, Contact)
- `src/app/admin/...` — admin CMS (route group `(protected)` is guarded by NextAuth session; `login` is public)
- `src/app/api/...` — API routes: `auth`, `contact` (public message submission), `upload` (authenticated file upload)
- `prisma/schema.prisma` — data model. Content models (News, Event, Publication, Sector, Directorate, FaqItem, GalleryItem, SiteSetting) store `*Af`/`*Am`/`*En` fields per translatable field.
- `src/lib/localized.ts` — `tf(record, field, locale)` helper to read the correct localized field.
- `prisma/seed.ts` — creates the default admin user and sample site settings/sectors/directorates.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables** — create/edit `.env`:
   ```env
   DATABASE_URL="postgresql://<user>:<password>@<host>/<db>?sslmode=require"
   AUTH_SECRET="<random base64 string>"
   ```
   Generate a secret with: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`

3. **Push schema & generate client**
   ```bash
   npx prisma migrate dev
   ```

4. **Seed the database** (creates admin user + default content)
   ```bash
   npm run seed
   ```
   Default admin login: `admin@afaritdb.gov.et` / `Afar@ITDB2026` — **change this password after first login is implemented, or update it directly in the database.**

5. **Run the dev server**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) (redirects to `/af`). Admin panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

## Admin CMS

Manage all site content at `/admin`:

- **News**, **Events**, **Publications** — full create/edit/delete with trilingual fields and file/image upload.
- **Gallery** — image upload + delete.
- **Sectors**, **Directorates**, **FAQs** — trilingual create/edit/delete.
- **Messages** — view/mark-read/delete contact form submissions.
- **Site Settings** — mission/vision/values/history, bureau head message, contact info, social links.

Uploaded files are stored under `public/uploads/`.

## Notes

- `src/proxy.ts` replaces the deprecated `middleware.ts` convention (Next.js 16) and handles locale routing via `next-intl`.
- Pages under `/[locale]` are rendered dynamically (`export const dynamic = "force-dynamic"` in the locale layout) since content is admin-editable and stored in the database.
- Server Components must use `getTranslations` from `next-intl/server` (not the `useTranslations` client hook) when the component is `async`.

## Deployment

Any Node.js-capable host works (Vercel, etc.). Ensure `DATABASE_URL` and `AUTH_SECRET` are set in the deployment environment, and that `public/uploads` is either persisted or replaced with a cloud storage integration for production use.
