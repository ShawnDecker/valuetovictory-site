# Which folder is the live site?

**`frontend-app/` is the source of truth for valuetovictory.com.** It is the Vite/React source, and its own `vercel.json` has the routes, rewrites and redirects (including `/loav`).

- Deploy: `cd frontend-app && npx vercel --prod --yes` (project `valuetovictory-site`). Then check nested paths such as `/loav`, `/member` (308) and `/VTVScore`, not just `/`.
- Git-triggered deploys are **turned off** on the Vercel project as of 2026-11-27. Merging to `master` does not change the live site.
- `app/` (prebuilt `dist` + `public`) and the root `vercel.json` are the **older layout**. They're kept for history; don't deploy from them. On 2026-11-27 a Git auto-deploy from that layout replaced production and took `/loav` offline.
- Known issue: several files under `public/shawnedecker/` (`book-cover.png`, `book-cover-2.png`, `logo.png`, `shawn-portrait.jpg`, `shawn-tc.jpg`) are saved HTML pages, not images. They were like this before this sync.
