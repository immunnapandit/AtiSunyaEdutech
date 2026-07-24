# AtiSunya Edutech Backend

Express API for auth, courses, dashboard data, contact enquiries, corporate training quotes, and newsletter subscriptions.

## Run locally

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

The API runs on `http://localhost:5000` by default.

Set this in the Next.js app:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Main endpoints

- `GET /api/health`
- `GET /api/courses`
- `GET /api/courses/:slug`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `GET /api/dashboard`
- `POST /api/contact`
- `POST /api/quotes`
- `POST /api/newsletter`

This backend stores development data in `backend/data/db.json`.

## Microsoft Graph email

Create `backend/.env` or project-root `.env` with:

```bash
GRAPH_TENANT_ID=your-tenant-id
GRAPH_CLIENT_ID=your-client-id
GRAPH_CLIENT_SECRET=your-client-secret
GRAPH_FROM_EMAIL=sender@your-domain.com
ADMIN_NOTIFICATION_EMAIL=admin@your-domain.com
```

The backend also accepts these aliases: `TENANT_ID`, `CLIENT_ID`,
`CLIENT_SECRET`, and `EMAIL`.

Required Microsoft Graph application permission: `Mail.Send` with admin consent.
