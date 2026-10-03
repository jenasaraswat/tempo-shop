# Tempo Supply — demo store for test automation

A small React + React Router (Vite) shop built for practising UI automation and
trying ContextQA's PR Impact & Code Analysis. No backend, no real payments.

## Pages (routes)

| Route | What it does |
|---|---|
| `/` | Home with hero and featured products |
| `/products` | Listing with category filter, search, sort (`?category=&q=&sort=`) |
| `/products/:slug` | Product detail, size picker, add to bag, sold-out state |
| `/cart` | Bag with quantity, remove, promo code, delivery rules |
| `/checkout` | Form with validation and test card check |
| `/order/:orderId` | Order confirmation |
| `/login` | Login (demo account) |
| `/account` | Protected page — redirects to login if signed out |
| `*` | Not found |

The app uses HashRouter, so live URLs look like `https://<site>/#/products`.

## Test data

- Login: `demo@tempo.test` / `Tempo@123`
- Promo code: `TEMPO10` (10% off)
- Card: `4242 4242 4242 4242` (any other number is rejected)
- Delivery: £6, free when the total after discount is £75 or more
- `warmup-hoodie` is sold out; accessories are one size
- Every interactive element has a `data-testid`

## Run locally

```bash
npm install
npm run dev                  # http://localhost:5173
npx playwright install chromium
npm test                     # starts the dev server itself, runs 24 tests
npm run report               # open the HTML report
```

Run the same tests against a deployed copy:

```bash
BASE_URL=https://<your-site> npx playwright test
```

## CI

- `.github/workflows/playwright.yml` runs the tests on every push and PR to `main`.
- `.github/workflows/deploy.yml` publishes the site to GitHub Pages on every push to `main`
  (enable it once in Settings → Pages → Source: GitHub Actions).
