# Simple Sheet Sites

A minimal Next.js 14 (App Router) MVP for multi-page business websites driven by Google Sheets. Business owners edit a Google Sheet and the site refreshes automatically on a short cache window.

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Prisma + SQLite
- Zod
- Google Sheets API via a service account (server-side only)
- In-memory + DB snapshots with TTL caching

## Google Sheet format

Create a Google Sheet with **five tabs** and **exact headers**:

### 1) Settings

Headers: `key`, `value`

Required keys:

- `business_name`
- `phone`
- `email`
- `address`
- `city`
- `state`
- `zip`
- `hero_headline`
- `hero_subheadline`
- `primary_cta_text`
- `primary_cta_link`
- `accent_color`
- `logo_url`

Optional keys:

- `about_headline`
- `about_body`

### 2) Hours

Headers: `day`, `open`, `close`, `closed`

`closed` accepts `true/false`.

### 3) Services

Headers: `name`, `description`, `price`, `featured`

`featured` accepts `true/false`.

### 4) Pricing

Headers: `plan_name`, `price`, `billing_period`, `features`, `cta_text`, `cta_link`

`features` is pipe-delimited, e.g. `Feature one | Feature two | Feature three`.

### 5) FAQs

Headers: `question`, `answer`

## Setup

1. Create a Google Cloud project.
2. Enable the **Google Sheets API**.
3. Create a **service account**, then generate a JSON key.
4. Share your Google Sheet with the service account email (Viewer access is enough).
5. Copy the values into `.env.local` (use `.env.example` as a template). Ensure the private key keeps newlines:
   - If you paste the key in a single line, keep `\n` escaped so it can be converted at runtime.
6. Install dependencies:

```bash
npm install
```

7. Run migrations:

```bash
npx prisma migrate dev
```

8. Start the dev server:

```bash
npm run dev
```

## Admin API

### Create a site

```bash
curl -X POST http://localhost:3000/api/admin/sites \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"slug":"acme-plumbing","sheetId":"GOOGLE_SHEET_ID"}'
```

### Check site status

```bash
curl http://localhost:3000/api/admin/sites/acme-plumbing \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### Manually refresh a snapshot

```bash
curl -X POST http://localhost:3000/api/sites/acme-plumbing/refresh \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

## Notes

- Data is cached in-memory and persisted in `ContentSnapshot` rows with a default TTL of 5 minutes.
- The site shows a provisioning state if no snapshot exists or the sheet is unreachable.
- Service account credentials are never exposed to the client.