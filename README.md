# VELMIOR v8

Release-based premium tea storefront built with Next.js and Tailwind.

## Routes
- `/` — release-focused homepage
- `/releases` — current and archived public releases
- `/release/[slug]` — release page with story, tasting notes and purchase block
- `/circle` — private access / request access page
- `/wholesale` — B2B page
- `/about` — brand positioning
- `/cart` / `/checkout` — preserved checkout flow

## Run
```bash
npm install
npm run dev
```

## Notes
- Existing `/product/[slug]` URLs redirect to `/release/[slug]`
- Cart and checkout data remain in localStorage
- Auth, account, roles and private backend logic are intentionally left for the next backend phase
