# Ani Hambardzumian Studios

Full‑stack studio booking app built with:

- Next.js App Router (React + Node.js)
- PostgreSQL (classic)
- Tailwind CSS
- `pg` for database access

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and fill in values:

```bash
cp .env.example .env
```

3. Initialize database (this will DROP and recreate tables defined in `db/schema.sql` and seed with demo data):

```bash
npm run db:init
```

4. Run dev server:

```bash
npm run dev
```

App will be available at http://localhost:3000.
