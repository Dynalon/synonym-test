# UserList from randomuser.me

My approach to the applicant test. This project was created using `shadcn init` and is a basic Next.js starter project.

### Setup

Install dependencies:

> npm install

Run the project locally:

> npm run dev

Run the tests:

> npm run test:run

or, for interactive mode:

> npm run test

### Offline caching

Pages are cached in IndexedDB via Dexie. A "Go Offline" button in the app simulates offline mode. Alternatively, use the browser's devtools offline mode. Any API error triggers offline mode; it's retried when the page changes.

### Limitations

Due to time constraints, following limitations apply:

- Favorites is not implemented
- `RESULTS_PER_PAGE` is fixed (default 12, in `constants.ts`), which lets us cache whole pages — but a fixed-size cache doesn't allow an adjustable page size. Search and filtering can't be cleanly implemented under a fixed-window cache, so they're not included.

### Further work

- Implement local-first favorites list
- Client-side paging, caching users by UUID instead of by page
- Search and sort
- E2E tests (Cypress or Playwright)
