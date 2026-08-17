# Deployment

This repo has two apps:

- Frontend: Next.js app in the project root.
- Backend: Express API in `backend/`.

Deploy them as two separate services.

## 1. Deploy the backend first

Use a Node service host such as Render, Railway, Fly.io, or a VPS.

Backend settings:

```bash
Root directory: backend
Build command: npm install
Start command: npm start
```

Required backend environment variables:

```bash
NODE_ENV=production
PORT=5000
CLIENT_ORIGIN=https://your-frontend-domain.com
APP_BASE_URL=https://your-frontend-domain.com
JWT_SECRET=use-a-long-random-secret
MONGODB_URI=mongodb+srv://...
ADMIN_PANEL_EMAIL=admin@example.com
ADMIN_PANEL_PASSWORD=strong-password
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

Cloudinary is required for production uploads. The local upload fallback is only suitable for local development because most hosted Node services do not keep uploaded files permanently unless you add persistent disk storage.

For course plan PDFs, also enable public PDF delivery in Cloudinary:

```text
Cloudinary Console > Settings > Security > PDF and ZIP files delivery > Allow delivery
```

New/free Cloudinary accounts can upload PDFs but block public PDF delivery until this setting is enabled and confirmed.

After deploying, confirm:

```text
https://your-backend-domain.com/api/health
```

returns:

```json
{ "status": "ok", "service": "atisunya-edutech-backend" }
```

## 2. Deploy the frontend

Use Vercel for the project root.

Frontend settings:

```bash
Root directory: .
Install command: npm install
Build command: npm run build
```

Required frontend environment variables:

```bash
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

Redeploy after changing `NEXT_PUBLIC_API_URL`, because Next.js reads it during build for image host configuration.
