# Golobe

Golobe is a flight & hostel booking web app — search flights or hostels, drill
into a detail page, and walk through a full booking flow (login → payment plan
→ card → confirmation), with a profile/account area and booking history.

Built with Next.js (App Router), React, TypeScript, and Tailwind CSS.

## Features

- **Flights** — search, filterable results list, flight detail page, booking flow
- **Hostels/Hotels** — search, filterable results (category tabs, amenities), hotel
  detail page (gallery, rooms, reviews), booking flow
- **Auth** — Google OAuth login/register (see [Backend](#backend) below for the
  planned move to Supabase Auth, which adds Facebook and Apple login)
- **Profile** — account settings, booking/ticket history

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4, [shadcn/ui](https://ui.shadcn.com) components on top of Radix UI
- [next-auth](https://next-auth.js.org) for authentication (currently JWT sessions, no DB)
- `react-hook-form` for forms, `embla-carousel` / `swiper` / `motion` for carousels and animation

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts: `pnpm build`, `pnpm start`, `pnpm lint`.

## Project structure

```
src/app/(auth)/          login, register, forgotten password
src/app/dashboard/flight/    flight results, detail, booking
src/app/dashboard/hostel/    hostel results, detail, booking
src/app/dashboard/profile/   account settings, booking history
src/components/page/         page-specific components, grouped by feature
src/components/layout/       shared layout (navbar, etc.)
src/components/shadcn-ui/    shadcn/ui primitives
src/static-data/             mock data standing in for the database for now
```

## Backend

The app currently runs on static mock data (`src/static-data/*`) — nothing is
wired up to a real database yet. The plan is Supabase (Postgres + Supabase Auth
for Google/Facebook/Apple login) with Next.js route handlers on the server side.

See [`docs/database-schema.md`](./docs/database-schema.md) for the schema draft
and open questions (ORM choice, room availability, reviews auth).
