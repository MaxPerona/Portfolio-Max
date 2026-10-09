# Max Perona · Portfolio

Personal portfolio and interactive resume of Max Perona, back-end software engineer.

Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4 and Motion.

## Features

- English, Italian and Spanish (`/en`, `/it`, `/es`), with language detection and a language switch that keeps your place on the page
- Case-study pages for each project
- Dark and light themes, respects `prefers-reduced-motion`, with a pause control for animated content
- Contact form via a Server Action and [Resend](https://resend.com), with direct links when email isn't configured
- Statically generated pages, SEO metadata, sitemap, robots and Open Graph images

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # optional: site URL and contact form settings
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run lint`, `npm run build`, `npm start`.

## Configuration

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for metadata, sitemap and robots |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contact form delivery. Without the first two, the form is replaced by direct contact links |

## Editing content

All copy and data live in `content/`; components only render it.

- `content/dictionaries/{en,it,es}.ts`: translated text (hero, about, projects, experience, UI labels)
- `content/shared.ts`: language-independent data (project stacks, skills, roles, education)
- `content/site.ts`: name, links, section order, and the optional `photo` and `cv` paths (files go in `public/`)
- `content/recommendations.ts`: quotes from colleagues; the section stays hidden while the list is empty

## Project structure

```
app/[lang]/        localized pages (home, case studies, not-found, OG image)
app/actions/       contact form Server Action
components/        UI and motion components
content/           site copy and data
lib/               motion tokens and helpers
proxy.ts           locale detection and redirects
```

## License

© Max Perona. All rights reserved. Fonts in `app/fonts/` are licensed under the SIL Open Font License (see the files alongside them).
