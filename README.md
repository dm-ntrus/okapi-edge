# Okapi Edge

Corporate platform for Okapi Edge — enterprise SaaS & distributed infrastructure.

## Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **next-intl** (`/fr`, `/en`)

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/fr`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server (port 3000) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

## Structure

```
app/            # App Router routes + SEO (robots, sitemap)
components/     # UI (layout, pages, modals, home islands)
content/        # Typed static content
messages/       # next-intl dictionaries (fr / en)
lib/            # i18n, constants
types/          # Shared TypeScript types
```

## Locales

- French (default): `/fr/...`
- English: `/en/...`
