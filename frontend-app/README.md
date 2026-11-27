# Value to Victory – React frontend (from Kimi Creation Plan)

Vite + React + TypeScript frontend with Tailwind and shadcn/ui-style components.

## Local dev

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

Output is in `dist/`. To deploy to the VPS: copy the contents of `dist/` to `/var/www/valuetovictory/frontend/` (after running the deployment script so that directory exists). The backend serves the frontend and proxies `/api` to the Node app.

## Project structure

- `src/sections/` – Hero, Products, Pricing, Testimonials, CTA, etc.
- `src/components/ui/` – Reusable UI components
- `public/` – Images and static JSON (products, subscriptions)
- `dist/` – Built output (after `npm run build`)
